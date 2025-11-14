import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    // 圖片代理配置 - 開發時從 Manus 或原網站載入圖片
    proxy: {
      '/images': {
        target: 'https://yijiebao-djcf4hqc.manus.space',
        changeOrigin: true,
        secure: false,
        // 如果 Manus 無法訪問，可以改為原網站：
        // target: 'https://www.178mat.com',
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['wouter'],
          'animation': ['framer-motion'],
          'maps': ['leaflet'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter', 'framer-motion', 'leaflet'],
  },
});
