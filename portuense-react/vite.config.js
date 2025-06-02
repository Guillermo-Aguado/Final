// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',    // ← Permite acceso externo (necesario en Docker)
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // ← Importante en entornos con Docker + bind mount
    },
  },
})
