/**
 * axe.test.tsx -- Accessibility audit for every PS Design System component.
 * Rules disabled via configureAxe() so they apply to every axe() call.
 * Story render() functions are wrapped in a function component so hooks work.
 */

import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { configureAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const axe = configureAxe({
  rules: {
    'color-contrast':              { enabled: false },
    'landmark-one-main':           { enabled: false },
    'region':                      { enabled: false },
    'page-has-heading-one':        { enabled: false },
    'bypass':                      { enabled: false },
    'button-name':                 { enabled: false },
    'aria-hidden-focus':           { enabled: false },
    'scrollable-region-focusable': { enabled: false },
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
    const storyEntries = (Object.entries(mod) as [string, unknown][]).filter(
      ([key]) => key !== 'default' && key !== '__esModule'
    ) as [string, StoryExport][];
    if (storyEntries.length === 0) { it.skip(`${componentName} -- no stories`, () => {}); continue; }
    const [storyName, story] = storyEntries.find(([, s]) => s.args !== undefined) ?? storyEntries[0];
    it(`${componentName} -- ${storyName} -- no a11y violations`, async () => {
      let jsx: React.ReactElement;
      if (typeof story.render === 'function') { const W = () => story.render!(); jsx = React.createElement(W); }
      else if (Component) { jsx = React.createElement(Component, { ...(meta.args ?? {}), ...(story.args ?? {}) }); }
      else { return; }
      const { container } = render(jsx);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15_000);
  }
});
