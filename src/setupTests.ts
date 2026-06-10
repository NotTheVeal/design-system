import '@testing-library/jest-dom';
import { configureAxe } from 'jest-axe';

// Disable color-contrast rule â requires real CSS rendering unavailable in jsdom
configureAxe({
  rules: {
    'color-contrast': { enabled: false },
  },
});
