import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    // Note: @storybook/addon-a11y and @storybook/addon-interactions are not
    // installed in this repo. Add them with: npm install @storybook/addon-a11y
    // @storybook/addon-interactions requires storybook/test peer dep.
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
};

export default config;
