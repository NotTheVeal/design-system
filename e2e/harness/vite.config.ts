import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow reading files from the project root and node_modules
      allow: ['../..'],
    },
  },
});
