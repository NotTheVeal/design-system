import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PSReactUICore',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
      output: { globals: { react: 'React', 'react-dom': 'ReactDOM', 'lucide-react': 'LucideReact' } },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
