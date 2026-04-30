import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Performance optimizations
  build: {
    minify: 'esbuild',
    cssMinify: true,
    // Aggressive code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion': ['motion/react'],
          'lucide': ['lucide-react'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-slot'],
        },
        // Ensure small chunks for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || ''
          if (/\.css$/.test(info)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (/\.png$|\.jpg$|\.jpeg$|\.gif$|\.webp$|\.svg$/.test(info)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    // Generate source maps for debugging (disable in production if needed)
    sourcemap: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'motion/react', 'lucide-react'],
    exclude: [],
  },

  // Development optimizations
  server: {
    hmr: true,
  },
})
