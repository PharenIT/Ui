// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  plugins: [
    // @ts-expect-error
    vue(),
    // @ts-expect-error
    tailwindcss(), 
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})