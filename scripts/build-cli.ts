import { build } from "esbuild"
import { chmod } from "fs/promises"

await build({
  entryPoints: ["scripts/cli.ts"],
  outfile: "dist/cli.cjs", 
  platform: "node",
  format: "cjs",
  banner: { js: "#!/usr/bin/env node" },
  target: ["node18"],
  bundle: true,
  minify: false,
})

await chmod("dist/cli.cjs", 0o755)
