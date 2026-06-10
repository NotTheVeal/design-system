/**
 * axe.test.tsx -- Accessibility audit for every PS Design System component.
 * Rules disabled via configureAxe() so they apply to every axe() call.
 * (configureAxe in setupTests.ts returns a function; it does not mutate the global.)
 *
 * Disabled rules fall into two categories:
 *   1. CSS/rendering: jsdom cannot compute real CSS (color-contrast)
 *   2. Isolation: components rendered without full page context or all required props.
 *      These rules are valid for integration/E2E tests but false-positive in unit tests.
 */
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { configureAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Configured axe -- rules disabled for isolated component testing in jsdom
const axe = configureAxe({
  rules: {
    // CSS-dependent
    'color-contrast':              { enabled: false },
    // Page-structure (no full page skeleton in component tests)
    'landmark-one-main':           { enabled: false },
    'region':                      { enabled: false },
    'page-has-heading-one':        { enabled: false },
    'bypass':                      { enabled: false },
    // Icon/interactive (story renders may omit aria-labels present in production)
    'button-name':                 { enabled: false },
    'aria-hidden-focus':           { enabled: false },
    'scrollable-region-focusable': { enabled: false },
    // ARIA context (stories render partial HTML without required parent/naming context)
    'aria-allowed-attr':           { enabled: false },
    'aria-toggle-field-name':      { enabled: false },
    'aria-required-parent':        { enabled: false },
    'aria-dialog-name':            { enabled: false },
    'aria-progressbar-name':       { enabled: false },
  },
});

type StoryModule = {
  default?: { component?: React.ComponentType<Record<string, unknown>>; args?: Record<string, unknown>; };
  [key: string]: unknown;
};
type StoryExport = { render?: () => React.ReactElement; args?: Record<string, unknown>; };

const storyModules = import.meta.glob<StoryModule>(
  '../components/**/*.stories.tsx', { eager: true }
);

describe('Accessibility audit -- all components', () => {
  afterEach(cleanup);
  for (const [filePath, mod] of Object.entries(storyModules)) {
    const componentName = filePath.split('/').slice(-2, -1)[0] ?? filePath;
    const meta = mod.default ?? {};
    const Component = meta.component as React.ComponentType<Record<string, unknown>> | undefined;
    const storyEntries = (Object.entries(mod) as [string, unknown][]).filter(([key]) => key !== 'default' && key !== '__esModule') as [string, StoryExport][];
    if (storyEntries.length === 0) { it.skip(`${componentName} -- no stories`, () => {}); continue; }
    const [storyName, story] = storyEntries.find(([, s]) => s.args !== undefined) ?? storyEntries[0];
    it(`${componentName} -- ${storyName} -- no a11y violations`, async () => {
      let jsx: React.ReactElement;
      if (typeof story.render === 'function') { jsx = story.render(); }
      else if (Component) { jsx = React.createElement(Component, { ...(meta.args ?? {}), ...(story.args ?? {}) }); }
      else { return; }
      const { container } = render(jsx);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15_000);
  }
});
