#!/usr/bin/env node
/**
 * generate-component.js
 * Uses the Claude Code CLI to generate a React component from design tokens.
 * Authenticates via CLAUDE_CODE_OAUTH_TOKEN (written to ~/.claude/.credentials.json).
 * Post-processes CLI output to extract clean TypeScript/TSX code.
 *
 * Usage: node scripts/generate-component.js <componentName>
 * Output: writes src/components/<name>/<name>.tsx
 */

const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawnSync } = require('child_process');

// ─── Args ────────────────────────────────────────────────────────────────────
const component = process.argv[2];
if (!component) {
  console.error('Usage: node scripts/generate-component.js <componentName>');
  process.exit(1);
}

// ─── Auth ────────────────────────────────────────────────────────────────────
const token = process.env.CLAUDE_CODE_OAUTH_TOKEN;
if (!token) {
  console.error('Error: CLAUDE_CODE_OAUTH_TOKEN is not set');
  process.exit(1);
}

// Write OAuth token to the credentials file so the Claude CLI picks it up
// in headless CI environments (no browser, no keychain).
const claudeDir = path.join(os.homedir(), '.claude');
const credFile  = path.join(claudeDir, '.credentials.json');
fs.mkdirSync(claudeDir, { recursive: true });
fs.writeFileSync(
  credFile,
  JSON.stringify({
    claudeAiOauth: {
      accessToken: token,
      tokenType:   'Bearer',
      // Generous expiry — the token itself governs real validity
      expiresAt:   (Date.now() + 8 * 3600 * 1000).toString(),
    },
  }),
  { mode: 0o600 }
);

// ─── Prompt ──────────────────────────────────────────────────────────────────
const claudeMd  = fs.existsSync('CLAUDE.md')
  ? fs.readFileSync('CLAUDE.md', 'utf8')
  : '';

const tokenFile = `tokens/ps-tokens/component/${component}.json`;
const tokenJson = fs.existsSync(tokenFile)
  ? fs.readFileSync(tokenFile, 'utf8')
  : '{}';

const prompt = `\
${claudeMd}

---

## Component to Generate: ${component}

Token file (${tokenFile}):
\`\`\`json
${tokenJson}
\`\`\`

Generate the complete ${component} React component now.
Rules:
- Output ONLY valid TypeScript/TSX source code.
- Do NOT include markdown fences, explanations, or commentary.
- First line MUST be: import React from 'react';
`;

// ─── Run CLI ─────────────────────────────────────────────────────────────────
console.log(`Generating ${component} component via claude CLI...`);

// spawnSync passes the prompt as a direct process argument — no shell escaping.
// Also set ANTHROPIC_API_KEY to the OAuth token — the CLI checks this env var.
const result = spawnSync(
  'claude',
  ['--print', prompt],
  {
    encoding:  'utf8',
    timeout:   180_000,           // 3 min — large components can be slow
    maxBuffer: 10 * 1024 * 1024,  // 10 MB
    env: {
      ...process.env,
      HOME: os.homedir(),
      ANTHROPIC_API_KEY: token,   // fallback: CLI also checks this env var
    },
  }
);

if (result.error) {
  console.error('Failed to spawn claude CLI:', result.error.message);
  console.error('Is the `claude` CLI installed? Run: npm install -g @anthropic-ai/claude-code');
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`claude CLI exited with code ${result.status}`);
  console.error('stderr:', result.stderr?.slice(0, 2000) || '(empty)');
  console.error('stdout:', result.stdout?.slice(0, 2000) || '(empty)');
  process.exit(1);
}

const raw = result.stdout || '';

// ─── Extract TypeScript from output ──────────────────────────────────────────
// Claude CLI may wrap code in markdown fences even when asked not to.
// Strategy 1 — grab the largest ```tsx / ```ts / ``` block.
let code = '';

const fenceRe = /```(?:tsx?|typescript)?\s*\n([\s\S]*?)\n```/g;
let match;
let bestLen = 0;
while ((match = fenceRe.exec(raw)) !== null) {
  if (match[1].length > bestLen) {
    bestLen = match[1].length;
    code    = match[1];
  }
}

// Strategy 2 — if no fence found, slice from the first import statement.
if (!code) {
  const importIdx = raw.search(/^import\s+/m);
  if (importIdx !== -1) {
    code = raw.slice(importIdx);
  }
}

// Strategy 3 — full output (last resort)
if (!code) {
  code = raw;
}

// Strip any stray leading/trailing fences that slipped through.
const cleaned = code
  .replace(/^```(?:tsx?|typescript)?\s*\n?/m, '')
  .replace(/\n?```\s*$/m, '')
  .trim();

// ─── Validate ────────────────────────────────────────────────────────────────
const looksLikeTS =
  cleaned.startsWith('import') ||
  cleaned.startsWith('//') ||
  cleaned.startsWith("'use") ||
  cleaned.startsWith('"use');

if (!cleaned || !looksLikeTS) {
  console.error('Error: extracted output does not look like TypeScript.');
  console.error('First line :', cleaned.split('\n')[0]);
  console.error('Raw output (first 800 chars):\n', raw.slice(0, 800));
  process.exit(1);
}

// ─── Write file ───────────────────────────────────────────────────────────────
const outDir  = `src/components/${component}`;
const outFile = `${outDir}/${component}.tsx`;
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, cleaned + '\n');
console.log(`✅ Written: ${outFile} (${cleaned.split('\n').length} lines)`);
