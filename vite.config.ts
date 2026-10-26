import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // No manualChunks on purpose: forcing three / R3F / Spline into one vendor chunk made the
  // 1.6 MB 3D bundle part of every route's graph. Routes are React.lazy() chunks now, so
  // Rollup splits shared vendor code per route and 3D code only loads where it is imported.
})
