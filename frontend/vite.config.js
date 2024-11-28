import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // Ensure this points to the directory containing index.html
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the build files
  },
});
