import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Soporte para alias
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Mejor optimización
    exclude: ['lucide-react']
  },
  build: {
    chunkSizeWarningLimit: 1600, // Aumentar límite de chunks
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['date-fns', 'lucide-react']
        }
      }
    }
  }

