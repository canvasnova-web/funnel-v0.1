import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunk size warnings
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            // Separate React and React-DOM
            'react-vendor': ['react', 'react-dom'],
            // Framer Motion in its own chunk (large library)
            'framer-motion': ['framer-motion'],
            // Lucide icons separate
            'icons': ['lucide-react'],
            // Toast notifications
            'ui-lib': ['sonner']
          },
          // Optimize chunk file names for better caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          // Remove console logs in production
          drop_console: true,
          // Remove debugger statements
          drop_debugger: true,
          // Additional optimizations
          pure_funcs: ['console.log', 'console.info']
        }
      }
    }
  };
});
