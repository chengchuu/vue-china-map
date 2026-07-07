import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1200
  },
  server: {
    host: '127.0.0.1',
    port: 8080
  }
})
