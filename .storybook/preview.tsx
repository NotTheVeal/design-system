import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

// Load Source Sans 3 + Source Code Pro from Google Fonts
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href =
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Source+Code+Pro:wght@400;500;700&display=swap';
document.head.appendChild(link);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
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
  decorators: [
    (Story) => {
      document.body.style.fontFamily =
        "'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif";
      document.body.style.color = '#4A4A4A';
      return Story();
    },
  ],
};

export default preview;
