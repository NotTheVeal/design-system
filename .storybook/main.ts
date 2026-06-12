import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        interactions: false,
      },
    },
  ],
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: false,
  },
  viteFinal: async (config) => {
    // Stub storybook/test and @storybook/test so they never appear as
    // unresolvable bare-specifier externals in the browser bundle.
    // rollupOptions.external with bare module specifiers causes a
    // TypeError: Failed to resolve module specifier at runtime,
    // which silently prevents #storybook-root from rendering stories.
    const stubStorybookTest = {
      name: 'stub-storybook-test',
      resolveId(id) {
        if (id === 'storybook/test' || id === '@storybook/test') {
          return '\0storybook-test-stub';
        }
      },
      load(id) {
        if (id === '\0storybook-test-stub') {
          return [
            'export default {};',
            'export const fn = () => () => {};',
            'export const expect = () => ({});',
            'export const userEvent = { setup: () => ({}) };',
            'export const within = () => ({});',
          ].join('\n');
        }
      },
    };

    return {
      ...config,
      plugins: [
        ...(config.plugins ?? []),
        stubStorybookTest,
      ],
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [
          ...(config.optimizeDeps?.exclude ?? []),
          'storybook/test',
          '@storybook/test',
        ],
      },
    };
  },
};

export default config;
