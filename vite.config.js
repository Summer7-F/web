import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    watch: {
      ignored: ['**/assets_raw/**', '**/screenshots/**', '**/scripts/**', '**/dist/**']
    }
  },
  build: {
    target: 'es2018'
  }
})
