import { build } from "esbuild"
import { chmod } from "fs/promises"

await build({
  entryPoints: ["scripts/cli.ts"],
  outfile: "dist/cli.js",
  platform: "node",
  format: "esm",
  banner: { js: "#!/usr/bin/env node" },
  target: ["node18"],
  bundle: true,
  minify: false,
})

await chmod("dist/cli.js", 0o755)

