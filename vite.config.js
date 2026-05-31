import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5180,
    strictPort: false,
  },

  build: {
    // Split heavy vendor deps into separate async chunks.
    // The landing page ships only ~vendor-react; Three.js / Sandpack / TipTap
    // are downloaded only when the route that needs them is first visited.
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':     ['react', 'react-dom', 'react-router-dom'],
          'vendor-three':     ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-tiptap':    ['@tiptap/react', '@tiptap/starter-kit'],
          'vendor-sandpack':  ['@codesandbox/sandpack-react'],
          'vendor-highlight': ['highlight.js', 'lowlight'],
        },
      },
    },
    // Three.js is legitimately large; raise the warning threshold to avoid
    // noise in CI/CD logs without hiding real bloat in our own code.
    chunkSizeWarningLimit: 900,
  },
});
