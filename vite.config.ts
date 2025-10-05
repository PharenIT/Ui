import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: path.resolve(__dirname, 'src'),
      outDir: path.resolve(__dirname, 'dist'),
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PharenUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
    output: {
      exports: 'named', 
      globals: { vue: 'Vue' },
    },
    external: ['vue', 'tailwindcss', '@vueuse/core', '@iconify/vue'],
  },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
})
