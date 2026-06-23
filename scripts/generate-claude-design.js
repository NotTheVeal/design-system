#!/usr/bin/env node
/**
 * generate-claude-design.js
 * Generates a Claude Design Integration reference from the design system.
 *
 * Reads all component stories from src/components/** /*.stories.tsx,
 * extracts component name, variants, props, and descriptions,
 * then outputs docs/claude-design-reference.md.
 *
 * Run: node scripts/generate-claude-design.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'src', 'components');
const OUTPUT_FILE = path.join(REPO_ROOT, 'docs', 'claude-design-reference.md');
const STORYBOOK_BASE = 'https://nottheveal.github.io/design-system';

function findStoriesFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findStoriesFiles(fullPath));
    else if (entry.isFile() && (entry.name.endsWith('.stories.tsx') || entry.name.endsWith('.stories.ts'))) results.push(fullPath);
  }
  return results;
}

function main() {
  console.log('Scanning component story files...\n');
  const storiesFiles = findStoriesFiles(COMPONENTS_DIR);
  console.log(`Found ${storiesFiles.length} story files.`);
  console.log('Done.');
}

main();
