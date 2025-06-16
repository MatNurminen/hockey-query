import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        // target: 'https://top-api-aws.onrender.com',
        // target:
        //   'https://jj33cff2yo3egib3owyy43l77q0ifyzr.lambda-url.eu-north-1.on.aws',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
});
