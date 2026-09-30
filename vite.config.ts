import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // CI sets VITE_BASE_PATH=/aatma-site/ for GitHub Pages subpath deploys.
  // Locally it stays './' so the dist folder works from any location.
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    allowedHosts: [
      'stephan-terpeneless-decrepitly.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
  },
})
