#!/usr/bin/env node
/**
 * generate-component.js
 * Phase 4: Claude auto-generates React/TypeScript components from PS Design System tokens.
 * Called by the GitHub Actions design-system.yml workflow.
 *
 * Usage: node scripts/generate-component.js <componentName>
 * Env: GITHUB_TOKEN (GitHub Models) -OR- ANTHROPIC_API_KEY
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const component = process.argv[2];
if (!component) {
  console.error('Usage: node scripts/generate-component.js <componentName>');
  process.exit(1);
}

// ── Token context ────────────────────────────────────────────────────────────
const tokenFile = `tokens/ps-tokens/components/${component}.json`;
let tokenSummary = '(no component token file found)' ;
try {
  const raw = fs.readFileSync(tokenFile, 'utf8');
  const json = JSON.parse(raw);
  const lines = JSON.stringify(json, null, 2).split('\n');
  tokenSummary = lines.length > 80
    ? lines.slice(0, 80).join('\n') + `\n... (${lines.length - 80} more tokens omitted)`
    : lines.join('\n');
} catch (e) {
  tokenSummary = '(could not parse token file)';
}

// ── CLAUDE.md system prompt ───────────────────────────────────────────────────
let systemPrompt = 'You are an expert React/TypeScript developer for the PartsSource design system.';
try {
  systemPrompt = fs.readFileSync('CLAUDE.md', 'utf8').slice(0, 8000);
} catch (_) {}

// ── User prompt ───────────────────────────────────────────────────────────────
const userPrompt = `Generate a complete React/TypeScript component called "${component}" for the PartsSource design system.

Design system rules:
- Font: Source Sans Pro. Primary color: #005BA6 (PS Blue). Midnight: #002F48.
- Spacing: multiples of 4px (4,8,12,16,20,24,32,40,48,64px).
- Border radius: 4px default; 8px modals/panels; pill=100px.
- Use CSS custom properties (--ps-*) for ALL token values. Include a :root block.
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

// ── API configuration ─────────────────────────────────────────────────────────
// Prefer ANTHROPIC_API_KEY; fall back to GITHUB_TOKEN (GitHub Models)
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!ANTHROPIC_KEY && !GITHUB_TOKEN) {
  console.error('ERROR: Set ANTHROPIC_API_KEY or GITHUB_TOKEN');
  process.exit(1);
}

const useAnthropic = !!ANTHROPIC_KEY;

const options = useAnthropic ? {
  hostname: 'api.anthropic.com',
  path: '/v1/messages',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-api-key': ANTHROPIC_KEY,
    'anthropic-version': '2023-06-01',
  },
} : {
  hostname: 'models.inference.ai.azure.com',
  path: '/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
  },
};

const body = useAnthropic
  ? JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })
  : JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 4096,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt   },
      ],
    });

console.log(`Generating ${component} via ${useAnthropic ? 'Anthropic Claude Sonnet 4.6' : 'GitHub Models'}...`);
console.log(`Prompt size: ${Buffer.byteLength(body)} bytes`);

// ── Retry config ──────────────────────────────────────────────────────────────
const MAX_ATTEMPTS = 4;
const RETRY_DELAYS = [15, 30, 60]; // seconds between attempts 1-2, 2-3, 3-4

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
          reject({ retryable: true, message: `Rate limited (429): ${data.slice(0, 200)}` });
          return;
        }
        if (res.statusCode >= 500) {
          reject({ retryable: true, message: `Server error (${res.statusCode}): ${data.slice(0, 200)}` });
          return;
        }
        if (res.statusCode >= 400) {
          reject({ retryable: false, message: `Client error (${res.statusCode}): ${data.slice(0, 400)}` });
          return;
        }
        try {
          const json = JSON.parse(data);
          // Handle both Anthropic and OpenAI response shapes
          const text = useAnthropic
            ? json.content?.[0]?.text
            : json.choices?.[0]?.message?.content;
          if (!text) {
            reject({ retryable: false, message: `Unexpected response shape: ${data.slice(0, 300)}` });
            return;
          }
          resolve(text);
        } catch (e) {
          reject({ retryable: false, message: `JSON parse error: ${e.message}` });
        }
      });
    });
    req.on('error', (e) => reject({ retryable: true, message: e.message }));
    req.write(body);
    req.end();
  });
}

async function run() {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (attempt > 1) {
      const delay = RETRY_DELAYS[attempt - 2];
      console.log(`Retrying in ${delay}s (attempt ${attempt}/${MAX_ATTEMPTS})...`);
      await sleep(delay);
    }

    try {
      const text = await makeRequest();

      // Strip any accidental markdown fences
      const cleaned = text
        .replace(/^```[\w]*\n?/m, '').replace(/```$/m, '').trim();

      // Validate it looks like TypeScript/React
      const looksLikeTS =
        cleaned.startsWith('import') ||
        cleaned.includes('//') ||
        cleaned.startsWith('const') ||
        cleaned.startsWith('export') ||
        cleaned.startsWith('use');

      if (!cleaned || !looksLikeTS) {
        lastError = { retryable: true, message: `Output does not look like TypeScript. First line: ${cleaned.split('\n')[0]}` };
        console.error(lastError.message);
        continue;
      }

      // Write the component file
      const outDir = `src/components/${component}`;
      const outFile = `${outDir}/${component}.tsx`;
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, cleaned + '\n');
      console.log(`✅ Written: ${outFile} (${cleaned.split('\n').length} lines)`);

      // ── Phase 9: Generate companion test file ──────────────────────────────
      const testFile = `${outDir}/${component}.test.tsx`;
      if (!fs.existsSync(testFile)) {
        const testContent = [
          `import React from 'react';`,
          `import { render } from '@testing-library/react';`,
          `import { axe, toHaveNoViolations } from 'jest-axe';`,
          `import ${component} from './${component}';`,
          ``,
          `expect.extend(toHaveNoViolations);`,
          ``,
          `describe('${component}', () => {`,
          `  it('renders without crashing', () => {`,
          `    const { container } = render(<${component} />);`,
          `    expect(container).toBeTruthy();`,
          `  });`,
          ``,
          `  it('has no accessibility violations', async () => {`,
          `    const { container } = render(<${component} />);`,
          `    const results = await axe(container);`,
          `    expect(results).toHaveNoViolations();`,
          `  });`,
          ``,
          `  it('matches snapshot', () => {`,
          `    const { container } = render(<${component} />);`,
          `    expect(container.firstChild).toMatchSnapshot();`,
          `  });`,
          `});`,
          ``,
        ].join('\n');
        fs.writeFileSync(testFile, testContent);
        console.log(`✅ Written: ${testFile}`);
      } else {
        console.log(`ℹ️  Test file already exists, skipping: ${testFile}`);
      }

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
