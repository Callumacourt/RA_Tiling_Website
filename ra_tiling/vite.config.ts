import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  server: {
    allowedHosts: true,
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      '/fetch-gallery': 'http://localhost:3001',
      '/contactForm': 'http://localhost:3001',
    },
  }
})
