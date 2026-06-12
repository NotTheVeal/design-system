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
    // Stub storybook/test and @storybook/test.
    // Must use enforce:'pre' so this resolveId runs BEFORE the
    // commonjs--resolver plugin, which otherwise throws
    // "Missing './test' specifier in 'storybook' package".
    const stubStorybookTest = {
      name: 'stub-storybook-test',
      enforce: 'pre' as const,
      resolveId(id: string) {
        if (id === 'storybook/test' || id === '@storybook/test') {
          return '\0storybook-test-stub';
        }
        return undefined;
      },
      load(id: string) {
        if (id === '\0storybook-test-stub') {
          return [
            'export default {};',
            'export const fn = () => () => {};',
            'export const expect = () => ({});',
            'export const userEvent = { setup: () => ({}) };',
            'export const within = () => ({});',
          ].join('\n');
        }
        return undefined;
      },
    };

    return {
      ...config,
      plugins: [
        stubStorybookTest,
        ...(config.plugins ?? []),
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
