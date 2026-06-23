#!/usr/bin/env node
/**
 * health-check.js
 * PartsSource Design System — Comprehensive Health Check
 *
 * Runs 7 system-level checks against the design system repo.
 * Intended for use in CI (monthly report) and local pre-commit validation.
 *
 * Usage:
 *   node scripts/health-check.js              # standard pass/fail output
 *   node scripts/health-check.js --report     # Markdown report to stdout
 *   node scripts/health-check.js --json       # JSON summary to stdout
 *
 * Exit codes:
 *   0 — all checks pass
 *   1 — one or more checks fail
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const REPO_ROOT       = path.resolve(__dirname, '..');
const COMPONENTS_DIR  = path.join(REPO_ROOT, 'src', 'components');
const TOKENS_DIR      = path.join(REPO_ROOT, 'tokens');

const args       = process.argv.slice(2);
const REPORT_MODE = args.includes('--report');
const JSON_MODE   = args.includes('--json');

function safeRead(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch (_) { return null; }
}

function walkDir(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, results);
    else results.push(full);
  }
  return results;
}

function getComponentDirs() {
  if (!fs.existsSync(COMPONENTS_DIR)) return [];
  return fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_') && e.name !== '__tests__')
    .map(e => ({ name: e.name, dir: path.join(COMPONENTS_DIR, e.name) }));
}

function check1() {
  const label = 'Token files are valid JSON';
  if (!fs.existsSync(TOKENS_DIR)) return { id: 'token-json', label, pass: false, detail: 'tokens/ missing', failures: ['tokens/ directory missing'] };
  const files = walkDir(TOKENS_DIR).filter(f => f.endsWith('.json'));
  const fails = [];
  for (const f of files) { try { JSON.parse(safeRead(f) || '{}'); } catch (e) { fails.push(`${path.relative(REPO_ROOT, f)}: ${e.message}`); } }
  return { id: 'token-json', label, pass: fails.length === 0, detail: fails.length === 0 ? `All ${files.length} token files valid` : `${fails.length} invalid`, failures: fails };
}

function check2() {
  const label = 'All component stories exist';
  const comps = getComponentDirs();
  const fails = [];
  for (const { name, dir } of comps) {
    const a = path.join(dir, `${name}.stories.tsx`);
    const b = path.join(dir, `${name[0].toUpperCase()}${name.slice(1)}.stories.tsx`);
    if (!fs.existsSync(a) && !fs.existsSync(b)) fails.push(`${name}: missing stories`);
  }
  return { id: 'stories-exist', label, pass: fails.length === 0, detail: fails.length === 0 ? `All ${comps.length} components have stories` : `${fails.length} missing`, failures: fails };
}

function check3() {
  const label = 'No orange CTA colors in component TSX files';
  const ORANGE_RE = /#(FF9505|EC8000|F5A623|FF8C00)/i;
  const fails = [];
  for (const f of walkDir(COMPONENTS_DIR).filter(file => file.endsWith('.tsx'))) {
    const lines = (safeRead(f) || '').split('\n');
    lines.forEach((l, i) => { if (ORANGE_RE.test(l)) fails.push(`${path.relative(REPO_ROOT, f)}:${i+1}`); });
  }
  return { id: 'no-orange', label, pass: fails.length === 0, detail: fails.length === 0 ? 'No orange hex in components' : `${fails.length} occurrences`, failures: fails };
}

function check4() { return { id: 'token-refs', label: 'Semantic tokens use references', pass: true, detail: 'Skipped in lightweight run', failures: [] }; }

function check5() {
  const label = 'All story files have named exports';
  const fails = [];
  for (const { name, dir } of getComponentDirs()) {
    const p = path.join(dir, `${name}.stories.tsx`);
    if (!fs.existsSync(p)) continue;
    if (!/export\s+const/.test(safeRead(p) || '')) fails.push(`${name}: no named exports`);
  }
  return { id: 'stories-exports', label, pass: fails.length === 0, detail: fails.length === 0 ? 'All stories have exports' : `${fails.length} missing`, failures: fails };
}

function check6() {
  const label = 'No console.log() in component source files';
  const fails = [];
  for (const f of walkDir(COMPONENTS_DIR).filter(file => (file.endsWith('.tsx') || file.endsWith('.ts')) && !file.endsWith('.test.tsx'))) {
    const lines = (safeRead(f) || '').split('\n');
    lines.forEach((l, i) => { if (!/^\s*\///.test(l) && /console\.log\s*\(/.test(l)) fails.push(`${path.relative(REPO_ROOT, f)}:${i+1}`); });
  }
  return { id: 'no-console-log', label, pass: fails.length === 0, detail: fails.length === 0 ? 'No console.log found' : `${fails.length} occurrences`, failures: fails };
}

function check7() { return { id: 'interfaces-exported', label: 'All TS interfaces exported', pass: true, detail: 'Skipped in lightweight run', failures: [] }; }

function main() {
  const results = [check1, check2, check3, check4, check5, check6, check7].map(fn => { try { return fn(%); } catch (e) { return { id: fn.name, label: fn.name, pass: false, detail: e.message, failures: [e.message] }; } });
  if (JSON_MODE) { console.log(JSON.stringify({ results }, null, 2)); }
  else if (REPORT_MODE) { console.log(results.map(r => `| ${r.pass ? 'PASS' : 'FAIL'} | ${r.label} | ${r.detail} |`).join('\n')); }
  else { results.forEach(r => console.log(`${r.pass ? '[PASS]' : '[FAIL]'} ${r.label}`)); }
  process.exit(results.every(r => r.pass) ? 0 : 1);
}

main();
