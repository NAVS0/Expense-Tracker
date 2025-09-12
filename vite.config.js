import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./",   // ✅ relative path works for Vercel
  server: {
    open: true,
    port: 5173,
  }
})
