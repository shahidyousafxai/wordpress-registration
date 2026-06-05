import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@network': path.resolve(__dirname, 'src/network'),
      '@validations': path.resolve(__dirname, 'src/validations'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  server: {
    host: true,
  },
})
