#!/usr/bin/env node
const fs = require('fs');
const https = require('https');

const component = process.argv[2];
if (!component) { console.error('Usage: node scripts/generate-component.js <name>'); process.exit(1); }

const token = process.env.CLAUDE_CODE_OAUTH_TOKEN;
if (!token) { console.error('CLAUDE_CODE_OAUTH_TOKEN not set'); process.exit(1); }

const claudeMd = fs.existsSync('CLAUDE.md') ? fs.readFileSync('CLAUDE.md', 'utf8') : '';
const tokenFile = `tokens/ps-tokens/component/${component}.json`;
const tokenJson = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8') : '{}';

const prompt = `${claudeMd}\n\n---\n\nGenerate the ${component} React component.\nToken file (${tokenFile}):\n${tokenJson}\n\nOutput ONLY raw TypeScript starting with: import React from 'react';`;

const body = JSON.stringify({
  model: 'claude-sonnet-4-6', max_tokens: 8192,
  system: "Output ONLY valid TypeScript/TSX code. No markdown. No explanation. No backticks. First line must be: import React from 'react';",
  messages: [{ role: 'user', content: prompt }]
});

const req = https.request({
  hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
  headers: {
# Copy the generation script to the repo
cat > scripts/generate-component.js << 'SCRIPTEOF'
#!/usr/bin/env node
const fs = require('fs');
const https = require('https');

const component = process.argv[2];
if (!component) { console.error('Usage: node scripts/generate-component.js <name>'); process.exit(1); }

const token = process.env.CLAUDE_CODE_OAUTH_TOKEN;
if (!token) { console.error('CLAUDE_CODE_OAUTH_TOKEN not set'); process.exit(1); }

const claudeMd = fs.existsSync('CLAUDE.md') ? fs.readFileSync('CLAUDE.md', 'utf8') : '';
const tokenFile = `tokens/ps-tokens/component/${component}.json`;
const tokenJson = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8') : '{}';

const prompt = `${claudeMd}\n\n---\n\nGenerate the ${component} React component.\nToken file (${tokenFile}):\n${tokenJson}\n\nOutput ONLY raw TypeScript starting with: import React from 'react';`;

const body = JSON.stringify({
  model: 'claude-sonnet-4-6', max_tokens: 8192,
  system: "Output ONLY valid TypeScript/TSX code. No markdown. No explanation. No backticks. First line must be: import React from 'react';",
  messages: [{ role: 'user', content: prompt }]
});

const req = https.request({
  hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body),
    'Authorization': `Bearer ${token}`, 'anthropic-version': '2023-06-01' }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    if (res.statusCode !== 200) { console.error(`API error ${res.statusCode}:`, data); process.exit(1); }
    const code = JSON.parse(data)?.content?.[0]?.text?.replace(/^```(?:tsx?)?\n?/m,'').replace(/\n?```\s*$/m,'').trim();
    if (!code?.match(/^import|^\/\//)) { console.error('Output not TypeScript:', code?.substring(0,100)); process.exit(1); }
    const dir = `src/components/${component}`;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/${component}.tsx`, code + '\n');
    console.log(`✅ ${dir}/${component}.tsx (${code.split('\n').length} lines)`);
  });
});
req.on('error', e => { console.error(e.message); process.exit(1); });
req.write(body); req.end();
