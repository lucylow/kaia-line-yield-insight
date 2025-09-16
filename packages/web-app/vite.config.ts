import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../shared/src'),
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.VITE_APP_MODE': JSON.stringify('web'),
    'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wallet: ['ethers', '@web3-react/core'],
        },
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
