import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // WICHTIG: './' sorgt dafür, dass Pfade relativ sind.
  // Damit funktioniert die App egal ob unter maximilianboy.de/ oder maximilianboy.de/mystaging02/
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    host: true
  }
});