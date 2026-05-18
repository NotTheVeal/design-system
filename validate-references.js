#!/usr/bin/env node
/**
 * validate-references.js
 * Checks that every {token.reference} in token JSON files resolves to a defined token.
 * Exits 1 if any broken references found — blocks CI build.
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, 'tokens');
const REF_REGEX = /\{([^}]+)\}/g;

function loadAllTokens(dir) {
  const flat = {};
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!entry.name.endsWith('.json') || entry.name.startsWith('$')) continue;
      try {
        const obj = JSON.parse(fs.readFileSync(full, 'utf8'));
        collectLeaves(obj, [], flat, full);
      } catch (e) {
        console.error(`  ✗ Could not parse ${full}: ${e.message}`);
      }
    }
  }
  walk(dir);
  return flat;
}

function collectLeaves(node, path, flat, file) {
  if (typeof node !== 'object' || node === null) return;
  if ('$value' in node) {
    flat[path.join('.')] = { value: node.$value, file };
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    collectLeaves(v, [...path, k], flat, file);
  }
}

function main() {
  console.log('Validating token references...\n');
  const tokens = loadAllTokens(TOKENS_DIR);
  const keys = new Set(Object.keys(tokens));

  let errors = 0;
  for (const [key, { value, file }] of Object.entries(tokens)) {
    if (typeof value !== 'string') continue;
    for (const match of value.matchAll(REF_REGEX)) {
      const ref = match[1];
      if (!keys.has(ref)) {
        console.error(`  ✗ ${key}\n    references {${ref}} — NOT FOUND\n    in ${file}\n`);
        errors++;
      }
    }
  }

  if (errors === 0) {
    console.log(`  ✓ All ${keys.size} tokens validated — no broken references.\n`);
    process.exit(0);
  } else {
    console.error(`\n  ${errors} broken reference(s) found. Fix before building.\n`);
    process.exit(1);
  }
}

main();
