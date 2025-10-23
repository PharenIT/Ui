import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import path from "path"
import { promises as fs } from "fs"

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: path.resolve(__dirname, "src"),
      outDir: path.resolve(__dirname, "dist"),
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
    }),
   {
  name: "copy-styles",
  async buildEnd() {
    const src = path.resolve(__dirname, "src/styles/index.css")
    const dest = path.resolve(__dirname, "dist/ui.css")
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
    console.log("✅ Copied ui.css to dist/")
  },
}

  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PharenUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // bundle @vueuse/core into the library so consumers don't hit export-mismatch
      external: ["vue", "@iconify/vue"],
      output: {
        exports: "named",
        globals: { vue: "Vue" },
      },
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
})
