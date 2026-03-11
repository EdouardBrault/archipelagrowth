import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom']
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    },
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
  },
  // Configuration pour ignorer les warnings et erreurs
  esbuild: {
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'unsupported-dynamic-import': 'silent'
    },
    target: 'es2020',
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  // Désactiver toute injection automatique de balises HTML
  define: {
    __DISABLE_AUTO_CANONICAL__: true,
    'process.env.NODE_ENV': JSON.stringify(mode || 'production'),
  }
}));