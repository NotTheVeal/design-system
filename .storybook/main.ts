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
    const existingExternal = config.build?.rollupOptions?.external;
    const externalArray = Array.isArray(existingExternal)
      ? existingExternal
      : existingExternal
      ? [existingExternal]
      : [];

    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [
          ...(config.optimizeDeps?.exclude ?? []),
          'storybook/test',
          '@storybook/test',
        ],
      },
      build: {
        ...config.build,
        rollupOptions: {
          ...config.build?.rollupOptions,
          external: [
            ...externalArray,
            'storybook/test',
            '@storybook/test',
          ],
        },
      },
    };
  },
};

export default config;
