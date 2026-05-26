import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: {
      origin: ['http://localhost:5173'], // Vite dev server
    },
  },
})

