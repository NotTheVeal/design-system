#!/usr/bin/env node
/**
 * generate-component.js
 * Calls GitHub Models API (GPT-4o) to generate a React component from design tokens.
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

// ─── Prompt ──────────────────────────────────────────────────────────────────
const claudeMd  = fs.existsSync('CLAUDE.md')
  ? fs.readFileSync('CLAUDE.md', 'utf8')
  : '';

const tokenFile = `tokens/ps-tokens/component/${component}.json`;
const tokenJson = fs.existsSync(tokenFile)
  ? fs.readFileSync(tokenFile, 'utf8')
  : '{}';

const userPrompt = `${claudeMd}

---

## Component to Generate: ${component}

Token file (${tokenFile}):
\`\`\`json
${tokenJson}
\`\`\`

Generate the complete ${component} React component now.
Output ONLY valid TypeScript/TSX source code.
No markdown fences, no explanations, no commentary.
First line MUST be: import React from 'react';
`;

// ─── API Request ─────────────────────────────────────────────────────────────
// TO-SWAP (Claude): hostname = 'api.anthropic.com', path = '/v1/messages'
//   body format changes to Anthropic Messages API format
const body = JSON.stringify({
  model:      'gpt-4o',   // TO-SWAP: 'claude-sonnet-4-6'
  max_tokens: 8192,
  messages: [
    {
      role:    'system',
      content: 'You are a TypeScript/React code generator. Your responses contain ONLY valid TypeScript/TSX source code — no markdown, no explanation, no code fences. Your first line of output must be: import React from \'react\';',
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

console.log(`Generating ${component} component via GitHub Models (GPT-4o)...`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`API error ${res.statusCode}: ${data}`);
      process.exit(1);
    }

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse API response:', e.message);
      process.exit(1);
    }

    // TO-SWAP (Claude): parsed?.content?.[0]?.text
    const code = parsed?.choices?.[0]?.message?.content;
    if (!code) {
      console.error('No content in API response:', JSON.stringify(parsed).slice(0, 500));
      process.exit(1);
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
      console.error('Output does not look like TypeScript.');
      console.error('First line:', cleaned.split('\n')[0]);
      console.error('Full output (first 500 chars):', cleaned.slice(0, 500));
      process.exit(1);
    }

    // Write the file
    const outDir  = `src/components/${component}`;
    const outFile = `${outDir}/${component}.tsx`;
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, cleaned + '\n');
    console.log(`✅ Written: ${outFile} (${cleaned.split('\n').length} lines)`);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
  process.exit(1);
});

req.write(body);
req.end();
