import type { Preview } from '@storybook/react';
import '../src/tokens/tokens.css';

// Load Source Sans Pro from Google Fonts
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap';
document.head.appendChild(link);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'surface', value: '#FAFAFA' },
        { name: 'dark', value: '#002F48' },
      ],
    },
    layout: 'centered',
  },
  globalTypes: {},
  decorators: [
    (Story) => {
      document.body.style.fontFamily =
        "'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif";
      document.body.style.color = '#4A4A4A';
      return Story();
    },
  ],
};

export default preview;
