#!/usr/bin/env node
/**
 * generate-component.js
 * ─────────────────────────────────────────────────────────────────────────────
 * AI-powered component generator for the PartsSource Design System.
 *
 * Usage:
 *   node scripts/generate-component.js ComponentName
 *   node scripts/generate-component.js Button
 *
 * What it generates:
 *   src/components/Button/Button.tsx        — React component (TypeScript)
 *   src/components/Button/Button.test.tsx   — Unit + accessibility tests
 *   src/components/Button/index.ts          — Re-export barrel
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY   — Required for Claude generation (preferred)
 *   GITHUB_TOKEN        — Fallback: uses GitHub Models (gpt-4o-mini)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── Config ───────────────────────────────────────────────────────────────────

const COMPONENT_NAME = process.argv[2];

if (!COMPONENT_NAME) {
  console.error('❌ Usage: node scripts/generate-component.js <ComponentName>');
  process.exit(1);
}

if (!/^[A-Z][a-zA-Z0-9]+$/.test(COMPONENT_NAME)) {
  console.error(`❌ Component name must be PascalCase. Got: "${COMPONENT_NAME}"`);
  process.exit(1);
}

const OUT_DIR = path.join('src', 'components', COMPONENT_NAME);
const TSX_FILE = path.join(OUT_DIR, `${COMPONENT_NAME}.tsx`);
const TEST_FILE = path.join(OUT_DIR, `${COMPONENT_NAME}.test.tsx`);
const INDEX_FILE = path.join(OUT_DIR, 'index.ts');

// ─── Read token context ───────────────────────────────────────────────────────

function readTokenContext() {
  const tokenPath = path.join('tokens', 'ps-tokens', 'component', `${COMPONENT_NAME.toLowerCase()}.json`);
  if (fs.existsSync(tokenPath)) {
    try {
      return JSON.stringify(JSON.parse(fs.readFileSync(tokenPath, 'utf8')), null, 2).slice(0, 2000);
    } catch {
      return 'Token file exists but could not be parsed.';
    }
  }
  return 'No specific token file found for this component. Use general PS Design System tokens.';
}

// ─── Read CLAUDE.md rules ─────────────────────────────────────────────────────

function readClaudeRules() {
  const claudePath = 'CLAUDE.md';
  if (fs.existsSync(claudePath)) {
    const content = fs.readFileSync(claudePath, 'utf8');
    const lines = content.split('\n');
    const start = lines.findIndex(l => l.includes('Component Generation'));
    if (start > -1) return lines.slice(start, start + 100).join('\n');
    return content.slice(0, 3000);
  }
  return '';
}

// ─── Prompts ──────────────────────────────────────────────────────────────────

function buildComponentPrompt(tokenContext, claudeRules) {
  return `You are generating a production-quality React TypeScript component for the PartsSource Design System.

## Component: ${COMPONENT_NAME}

## PartsSource Design System Rules
${claudeRules}

## Token Context
${tokenContext}

## Requirements

Generate a complete, production-ready React TypeScript component file for ${COMPONENT_NAME}.

Requirements:
1. Use TypeScript with explicit prop interfaces (export Props interface)
2. Use CSS custom properties from the PS design system (--ps-* tokens)
3. Include ALL required states: default, hover, focus, disabled, loading (where applicable)
4. Full WCAG AA accessibility: aria-* attributes, keyboard navigation, focus rings
5. Use Lucide React icons (stroke: 1.75px) where appropriate
6. Export as named export AND default export
7. Include JSDoc comments on the Props interface
8. Do NOT use any external CSS framework — inline styles using CSS variables only
9. Follow PartsSource brand: blue primary (#005BA6), Source Sans Pro font, 4px grid spacing

Output ONLY the TypeScript file content. No explanations, no markdown fences.`;
}

function buildTestPrompt() {
  return `You are generating comprehensive test files for the PartsSource Design System component: ${COMPONENT_NAME}

Generate a complete test file for src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.tsx

Requirements — include ALL of these test types:

1. **Unit test (render)** — component renders without crashing
2. **Accessibility test** — jest-axe: toHaveNoViolations
3. **Snapshot test** — toMatchSnapshot
4. **State tests** — test all key states (disabled, loading, error, checked, etc.)
5. **Interaction tests** — click handlers fire when enabled; NOT when disabled
6. **Keyboard test** — Tab focuses the element; Enter/Space activates where appropriate
7. **ARIA attribute tests** — aria-disabled, aria-busy, aria-label, role correct

Import structure:
\`\`\`
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';

expect.extend(toHaveNoViolations);
\`\`\`

Output ONLY the TypeScript test file content. No explanations, no markdown fences.`;
}

// ─── HTTP request helper ──────────────────────────────────────────────────────

function httpsPost(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

// ─── Generate via Anthropic Claude ───────────────────────────────────────────

async function generateWithClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const result = await httpsPost({
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
  }, {
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  if (result.status !== 200) {
    throw new Error(`Claude API error ${result.status}: ${JSON.stringify(result.body)}`);
  }
  return result.body.content[0].text;
}

// ─── Generate via GitHub Models (fallback) ────────────────────────────────────

async function generateWithGithubModels(prompt) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not set');

  const result = await httpsPost({
    hostname: 'models.inference.ai.azure.com',
    path: '/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }, {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 4096,
    temperature: 0.2,
  });

  if (result.status !== 200) {
    throw new Error(`GitHub Models error ${result.status}: ${JSON.stringify(result.body)}`);
  }
  return result.body.choices[0].message.content;
}

// ─── Generate text using best available API ──────────────────────────────────

async function generateText(prompt, label) {
  console.log(`  🤖 Generating ${label}...`);

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const text = await generateWithClaude(prompt);
      console.log(`  ✅ ${label} generated via Claude`);
      return text;
    } catch (err) {
      console.warn(`  ⚠️ Claude failed: ${err.message} — trying GitHub Models...`);
    }
  }

  if (process.env.GITHUB_TOKEN) {
    try {
      const text = await generateWithGithubModels(prompt);
      console.log(`  ✅ ${label} generated via GitHub Models`);
      return text;
    } catch (err) {
      console.error(`  ❌ GitHub Models failed: ${err.message}`);
      throw err;
    }
  }

  throw new Error('No AI API available. Set ANTHROPIC_API_KEY or GITHUB_TOKEN.');
}

// ─── Clean AI output (strip markdown fences if present) ──────────────────────

function cleanOutput(text) {
  return text
    .replace(/^```(?:typescript|tsx|ts|javascript|jsx)?\n?/m, '')
    .replace(/\n?```\s*$/m, '')
    .trim();
}

// ─── Write file helper ────────────────────────────────────────────────────────

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  📝 Written: ${filePath} (${content.length} bytes)`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🎨 Generating component: ${COMPONENT_NAME}`);
  console.log(`   Output: ${OUT_DIR}/\n`);

  const tokenContext = readTokenContext();
  const claudeRules = readClaudeRules();

  // 1. Generate the component TSX
  const componentPrompt = buildComponentPrompt(tokenContext, claudeRules);
  let componentCode;
  try {
    componentCode = cleanOutput(await generateText(componentPrompt, `${COMPONENT_NAME}.tsx`));
  } catch (err) {
    console.error(`❌ Component generation failed: ${err.message}`);
    process.exit(1);
  }

  writeFile(TSX_FILE, componentCode);

  // 2. Generate the test file
  const testPrompt = buildTestPrompt();
  let testCode;
  try {
    testCode = cleanOutput(await generateText(testPrompt, `${COMPONENT_NAME}.test.tsx`));
    writeFile(TEST_FILE, testCode);
  } catch (err) {
    console.warn(`⚠️ Test generation failed (non-fatal): ${err.message}`);
    const fallbackTest = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';

expect.extend(toHaveNoViolations);

describe('${COMPONENT_NAME}', () => {
  it('renders without crashing', () => {
    render(<${COMPONENT_NAME} />);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<${COMPONENT_NAME} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
`;
    writeFile(TEST_FILE, fallbackTest);
  }

  // 3. Write barrel index
  const indexContent = `export { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';\nexport type { Props as ${COMPONENT_NAME}Props } from './${COMPONENT_NAME}';\n`;
  writeFile(INDEX_FILE, indexContent);

  console.log(`\n✅ Done! Generated ${COMPONENT_NAME}:`);
  console.log(`   • ${TSX_FILE}`);
  console.log(`   • ${TEST_FILE}`);
  console.log(`   • ${INDEX_FILE}`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
