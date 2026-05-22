#!/usr/bin/env node
/**
 * generate-component.js
 * Calls GitHub Models API (gpt-4o-mini) to generate a React component from design tokens.
 * Uses GITHUB_TOKEN — automatically available in GitHub Actions, no extra secrets needed.
 *
 * To switch back to Claude once an Anthropic API key is available:
 *   Change MODEL, HOSTNAME, PATH, and auth header below (marked with TO-SWAP comments).
 *
 * Usage: node scripts/generate-component.js <componentName>
 * Output: writes src/components/<name>/<name>.tsx
 */

const fs    = require('fs');
const path  = require('path');
const https = require('https');

// ─── Args ────────────────────────────────────────────────────────────────────
const component = process.argv[2];
if (!component) {
  console.error('Usage: node scripts/generate-component.js <componentName>');
  process.exit(1);
}

// ─── Auth ────────────────────────────────────────────────────────────────────
// TO-SWAP (Claude): const token = process.env.ANTHROPIC_API_KEY;
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Error: GITHUB_TOKEN is not set');
  process.exit(1);
}

// ─── Token file → compact summary ────────────────────────────────────────────
const tokenFile = `tokens/ps-tokens/component/${component}.json`;

/**
 * Flatten DTCG token JSON into compact "key: value" lines.
 * Skips metadata ($type, $description, $extensions) and only emits $value entries.
 * Limits total output to ~1500 chars to stay under the GitHub Models 8k token cap.
 */
function flattenTokens(obj, prefix) {
  const lines = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object') {
      if ('$value' in v) {
        lines.push(`${key}: ${v.$value}`);
      } else {
        lines.push(...flattenTokens(v, key));
      }
    }
  }
  return lines;
}

let tokenSummary = '(no component-specific tokens)';
if (fs.existsSync(tokenFile)) {
  try {
    const raw = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
    const lines = flattenTokens(raw, '');
    // Keep up to 80 lines; trim long values
    const trimmed = lines.slice(0, 80).map(l => l.length > 80 ? l.slice(0, 80) : l);
    tokenSummary = trimmed.join('\n');
    if (lines.length > 80) tokenSummary += `\n... (${lines.length - 80} more tokens omitted)`;
  } catch (e) {
    tokenSummary = '(could not parse token file)';
  }
}

// ─── Prompt ──────────────────────────────────────────────────────────────────
const userPrompt = `Generate a complete React/TypeScript component called "${component}" for the PartsSource design system.

Design system rules:
- Font: Source Sans Pro. Primary color: #005BA6 (PS Blue). Midnight: #002F48.
- Spacing: multiples of 4px (4,8,12,16,20,24,32,40,48,64px).
- Border radius: 4px default; 8px modals/panels; pill=100px.
- Use CSS custom properties (--ps-*) for all token values. Include a :root block.
- Export as default. Include TypeScript interfaces for all props.
- Support className prop for style overrides.
- WCAG AA: proper aria labels and keyboard navigation.
- Buttons: Primary has #005BA6 border+text on white bg, fills blue on hover.
- Inputs: 48px height, floating label, 1px #DCDCDC border, turns #005BA6 on focus.
- Shadows: card hover = 0 4px 12px rgba(0,0,0,0.1); focus ring = 0 0 0 3px rgba(0,147,244,0.3).

Component design tokens (${tokenFile}):
${tokenSummary}

Output ONLY valid TypeScript/TSX source code.
No markdown fences, no explanations, no commentary.
First line MUST be: import React from 'react';
`;

// ─── API Request ─────────────────────────────────────────────────────────────
// TO-SWAP (Claude): hostname = 'api.anthropic.com', path = '/v1/messages'
//   body format changes to Anthropic Messages API format
const body = JSON.stringify({
  model:      'gpt-4o-mini',   // TO-SWAP: 'claude-sonnet-4-6'
  max_tokens: 4096,
  messages: [
    {
      role:    'system',
      content: "You are a TypeScript/React code generator. Your responses contain ONLY valid TypeScript/TSX source code — no markdown, no explanation, no code fences. Your first line of output must be: import React from 'react';",
    },
    {
      role:    'user',
      content: userPrompt,
    },
  ],
});

const options = {
  hostname: 'models.inference.ai.azure.com', // TO-SWAP: 'api.anthropic.com'
  path:     '/chat/completions',             // TO-SWAP: '/v1/messages'
  method:   'POST',
  headers: {
    'Content-Type':   'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Authorization':  `Bearer ${token}`,     // TO-SWAP: 'x-api-key': token
  },
};

console.log(`Generating ${component} component via GitHub Models (gpt-4o-mini)...`);
console.log(`Prompt size: ${Buffer.byteLength(body)} bytes`);

// ─── Retry config ─────────────────────────────────────────────────────────────
const MAX_ATTEMPTS  = 4;
const RETRY_DELAYS  = [15, 30, 60]; // seconds between attempts 1→2, 2→3, 3→4

function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 429) {
          // Rate limited — caller will retry
          reject({ retryable: true, message: `Rate limited (429): ${data.slice(0, 200)}` });
          return;
        }
        if (res.statusCode >= 500) {
          // Server error — caller will retry
          reject({ retryable: true, message: `Server error (${res.statusCode}): ${data.slice(0, 200)}` });
          return;
        }
        if (res.statusCode !== 200) {
          // Client error (4xx except 429) — do not retry
          reject({ retryable: false, message: `API error ${res.statusCode}: ${data}` });
          return;
        }
        resolve(data);
      });
    });

    req.on('error', (e) => {
      // Network error — caller will retry
      reject({ retryable: true, message: `Network error: ${e.message}` });
    });

    req.write(body);
    req.end();
  });
}

async function run() {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (attempt > 1) {
      const delaySec = RETRY_DELAYS[attempt - 2];
      console.log(`⏳ Retry ${attempt}/${MAX_ATTEMPTS} in ${delaySec}s...`);
      await sleep(delaySec);
    }

    try {
      const data = await makeRequest();

      let parsed;
      try {
        parsed = JSON.parse(data);
      } catch (e) {
        // Malformed JSON — retry in case it was a partial response
        lastError = { retryable: true, message: `Failed to parse API response: ${e.message}` };
        console.error(lastError.message);
        continue;
      }

      // TO-SWAP (Claude): parsed?.content?.[0]?.text
      const code = parsed?.choices?.[0]?.message?.content;
      if (!code) {
        lastError = { retryable: true, message: `No content in API response: ${JSON.stringify(parsed).slice(0, 500)}` };
        console.error(lastError.message);
        continue;
      }

      // Strip any accidental markdown fences
      const cleaned = code
        .replace(/^```(?:tsx?|typescript)?\s*\n?/m, '')
        .replace(/\n?```\s*$/m, '')
        .trim();

      // Validate it looks like TypeScript
      const looksLikeTS =
        cleaned.startsWith('import') ||
        cleaned.startsWith('//') ||
        cleaned.startsWith("'use") ||
        cleaned.startsWith('"use');

      if (!cleaned || !looksLikeTS) {
        lastError = { retryable: true, message: `Output does not look like TypeScript. First line: ${cleaned.split('\n')[0]}` };
        console.error(lastError.message);
        continue;
      }

      // Write the file
      const outDir  = `src/components/${component}`;
      const outFile = `${outDir}/${component}.tsx`;
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, cleaned + '\n');
      console.log(`✅ Written: ${outFile} (${cleaned.split('\n').length} lines)`);
      return; // success

    } catch (err) {
      lastError = err;
      console.error(`Attempt ${attempt} failed: ${err.message}`);
      if (!err.retryable) break; // don't retry client errors
    }
  }

  // All attempts exhausted
  console.error(`❌ Failed to generate ${component} after ${MAX_ATTEMPTS} attempts: ${lastError?.message}`);
  process.exit(1);
}

run();
