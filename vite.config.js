import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

// React Router's framework plugin handles React (Fast Refresh, JSX) itself,
// so we no longer add @vitejs/plugin-react-swc separately. Code-splitting and
// SSR/prerender bundling are managed by the plugin too — hence no manualChunks.
// https://reactrouter.com/start/framework/installation
export default defineConfig({
  plugins: [reactRouter()],
  server: {
    port: 5180,
    strictPort: false,
  },
});
