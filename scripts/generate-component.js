#!/usr/bin/env node
/**
 * scripts/generate-component.js
 *
 * Called by the GitHub Actions pipeline (design-system.yml, Job 3) whenever
 * token files change.  For each changed component it:
 *   1. Reads the component token file from tokens/ps-tokens/component/<name>.json
 *   2. Reads CLAUDE.md for generation rules
 *   3. Calls Claude claude-sonnet-4-6 via the Anthropic API
 *   4. Writes src/components/<name>/<name>.tsx  (and .stories.tsx if missing)
 *
 * Usage:
 *   node scripts/generate-component.js Button
 *   node scripts/generate-component.js Modal
 *
 * Required env:
 *   ANTHROPIC_API_KEY — Anthropic API key (set as GitHub secret)
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const https = require('https');

function toPascal(str) {
  return str.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase());
}

function toCamel(str) {
  const p = toPascal(str);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

function readFileSafe(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch { return null; }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) { reject(new Error('ANTHROPIC_API_KEY is not set.')); return; }
    const body = JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 8192, messages: [{ role: 'user', content: prompt }] });
    const options = { hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' } };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) { reject(new Error(`Claude API error: ${parsed.error.message}`)); }
          else { resolve(parsed.content[0].text); }
        } catch (e) { reject(new Error(`Failed to parse: ${e.message}\nRaw: ${data}`)); }
      });
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

function extractBlock(text, filename) {
  const labeledRe = new RegExp('```(?:tsx|typescript|ts)?\\s*' + filename.replace('.', '\\.') + '\\s*\\n([\\s\\S]*?)```', 'i');
  const labeled = text.match(labeledRe);
  if (labeled) return labeled[1].trim();
  const generic = text.match(/```(?:tsx|typescript|ts)?\n([\s\S]*?)```/);
  if (generic) return generic[1].trim();
  return null;
}

function buildPrompt(name, tokens, claudeMd, existing) {
  const pascal = toPascal(name);
  const camel = toCamel(name);
  return `You are an expert React/TypeScript developer for the PartsSource design system.\n\n${claudeMd || 'Use PartsSource design system defaults'}\n\nToken file:\n\`\`\`json\n${tokens}\n\`\`\`\n\n${existing ? 'Existing:\n```tsx\n'+existing+'\n\`\`\`' : 'Generate from scratch'}\n\nGenerate ${pascal}. Return EXACTLY two code blocks:\n\`\`\`tsx ${camel}.tsx\n\`\`\`\n\`\`\`tsx ${camel}.stories.tsx\n\`\`\``;
}

async function main() {
  const name = process.argv[2];
  if (!name) { console.error('Usage: node scripts/generate-component.js <Name>'); process.exit(1); }
  const camel = toCamel(name);
  const root = require('path').resolve(__dirname, '..');
  const tokenDir = require('path').join(root, 'tokens', 'ps-tokens', 'component');
  let tokenContent = readFileSafe(require('path').join(tokenDir, camel+'.json'));
  if (!tokenContent && require('fs').existsSync(tokenDir)) {
    const f = require('fs').readdirSync(tokenDir).find(x => x.toLowerCase() === camel+'.json');
    if (f) tokenContent = readFileSafe(require('path').join(tokenDir, f));
  }
  if (!tokenContent) tokenContent = JSON.stringify({[camel]:{'color.primary':{value:'#005BA6',type:'color'}}},null,2);
  const claudeMd = readFileSafe(require('path').join(root,'CLAUDE.md'));
  const compDir = require('path').join(root,'src','components',camel);
  const compFile = require('path').join(compDir,camel+'.tsx');
  const existing = readFileSafe(compFile);
  console.log('Generating:', name);
  console.log('Calling Claude API...');
  const resp = await callClaude(buildPrompt(name, tokenContent, claudeMd, existing));
  const compCode = extractBlock(resp, camel+'.tsx');
  const storiesCode = extractBlock(resp, camel+'.stories.tsx');
  if (!compCode) { console.error('ERROR: no component code in response'); process.exit(1); }
  ensureDir(compDir);
  require('fs').writeFileSync(compFile, compCode+'\n');
  console.log('Written:', compFile);
  if (storiesCode) { require('fs').writeFileSync(require('path').join(compDir,camel+'.stories.tsx'), storiesCode+'\n'); }
  console.log('Done:', name);
}

main().catch(e => { console.error(e); process.exit(1); });
