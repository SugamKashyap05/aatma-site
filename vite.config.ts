import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Base must be ABSOLUTE for SPA deep routes to resolve. A relative base ('./')
  // makes index.html emit "./assets/...", which a deep route like /news/:slug
  // resolves against /news/ -> /news/assets/... -> 404 (blank page).
  // Default '/' works for root-served static hosts and `vite preview`.
  // CI overrides with VITE_BASE_PATH=/aatma-site/ for GitHub Pages subpath deploys.
  base: process.env.VITE_BASE_PATH || '/',
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
