/**
 * axe.test.tsx
 * Accessibility audit for every component in the PartsSource Design System.
 *
 * Strategy:
 *   - Uses import.meta.glob to dynamically find all *.stories.tsx files.
 *   - For each story file, picks the first usable story export.
 *   - If the story has a `render()` function, calls it directly.
 *   - If the story has `args`, renders <Component {...metaArgs, ...storyArgs} />.
 *   - Runs jest-axe on the resulting DOM node.
 *
 * color-contrast rule is disabled globally in setupTests.ts because jsdom
 * does not compute real CSS, making contrast checks always fail.
 */

import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// ââ Dynamic story import ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
type StoryMeta = {
  component?: React.ComponentType<Record<string, unknown>>;
  args?: Record<string, unknown>;
};

type StoryExport = {
  render?: () => React.ReactElement;
  args?: Record<string, unknown>;
};

type StoryModule = { default?: StoryMeta } & Record<string, unknown>;

const storyModules = import.meta.glob<StoryModule>(
  '../components/**/*.stories.tsx',
  { eager: true }
);

// ââ Test suite ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
describe('Accessibility audit â all components', () => {
  afterEach(cleanup);

  for (const [filePath, mod] of Object.entries(storyModules)) {
    // Derive readable name from directory: ".../components/button/Button.stories.tsx" â "button"
    const componentName = filePath.split('/').slice(-2, -1)[0] ?? filePath;

    const meta: StoryMeta = (mod.default ?? {}) as StoryMeta;
    const Component = meta.component;

    // Collect story entries (everything that is not the default export)
    const storyEntries = (Object.entries(mod) as [string, unknown][]).filter(
      ([key]) => key !== 'default' && key !== '__esModule'
    ) as [string, StoryExport][];

    if (storyEntries.length === 0) {
      it.skip(`${componentName} â no story exports found`, () => {});
      continue;
    }

    // Prefer a story that has args (simpler to render) over render functions;
    // fall back to the first story available.
    const [storyName, story] =
      storyEntries.find(([, s]) => s.args !== undefined) ?? storyEntries[0];

    it(
      `${componentName}/${storyName} â no a11y violations`,
      async () => {
        let jsx: React.ReactElement;

        if (typeof story.render === 'function') {
          jsx = story.render();
        } else if (Component) {
          const mergedArgs: Record<string, unknown> = {
            ...(meta.args ?? {}),
            ...(story.args ?? {}),
          };
          jsx = React.createElement(Component, mergedArgs);
        } else {
          // No component and no render fn â skip rather than fail
          return;
        }

        const { container } = render(jsx);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      },
      15_000
    );
  }
});
