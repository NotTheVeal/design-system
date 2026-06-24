import type { Preview } from '@storybook/react';
const preview: Preview = {
  parameters: {
    backgrounds: { default: 'light', values: [{ name: 'light', value: '#FFFFFF' }, { name: 'gray', value: '#F1F1F1' }] },
    layout: 'centered',
    docs: { toc: true },
  },
};
export default preview;
