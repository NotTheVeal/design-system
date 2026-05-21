#!/usr/bin/env node
/**
 * validate-references.js — Token reference checker
 * Warns on broken refs but does NOT fail the build (exit 0).
 * Change process.exit(0) → process.exit(1) at the bottom to make it a hard fail.
 */
const fs   = require('fs');
const path = require('path');

const TOKEN_ROOT = path.join(__dirname, '..', 'tokens', 'ps-tokens');
const REF_REGEX  = /\{([^}]+)\}/g;

function collectFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(full));
    else if (entry.name.endsWith('.json') && !entry.name.startsWith('$')) results.push(full);
  }
  return results;
}

function flattenKeys(obj, prefix = '') {
  const keys = new Set();
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) for (const s of flattenKeys(v, full)) keys.add(s);
    else keys.add(full);
  }
  return keys;
}

function extractRefs(obj, file, out = []) {
  for (const [, v] of Object.entries(obj)) {
    if (typeof v === 'string') { let m; while ((m = REF_REGEX.exec(v)) !== null) out.push({ ref: m[1], file }); }
    else if (v && typeof v === 'object') extractRefs(v, file, out);
  }
  return out;
}

const files = collectFiles(TOKEN_ROOT);
if (!files.length) { console.log('⚠️  No token files found — skipping'); process.exit(0); }

const allKeys = new Set();
const parsed  = [];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const k of flattenKeys(json)) allKeys.add(k);
  parsed.push({ file, json });
}

console.log(`✅ Loaded ${files.length} files · ${allKeys.size} keys`);

let broken = 0;
const seen = new Set();
for (const { file, json } of parsed) {
  for (const { ref, file: f } of extractRefs(json, file)) {
    const norm = ref.replace(/\//g, '.');
    if (!allKeys.has(norm)) {
      const k = `${norm}::${f}`;
      if (!seen.has(k)) { seen.add(k); console.warn(`  ⚠️  {${ref}} → NOT FOUND  (${path.relative(process.cwd(), f)})`); broken++; }
    }
  }
}

if (!broken) { console.log('✅ All references valid'); }
else         { console.warn(`\n⚠️  ${broken} broken reference(s) — review above (pipeline continues)`); }
process.exit(0); // Change to process.exit(1) to hard-fail on broken refs
