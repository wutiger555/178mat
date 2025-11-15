import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/178mat/', // GitHub Pages 部署路徑
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    // 圖片代理配置已停用 - 現在使用本地 public/images 資料夾中的圖片
    // proxy: {
    //   '/images': {
    //     target: 'https://yijiebao-djcf4hqc.manus.space',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
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
