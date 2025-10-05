#!/usr/bin/env node
import { promises as fs } from "fs"
import path from "path"
import kleur from "kleur"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = process.cwd()
const [command, name] = process.argv.slice(2)

function logStep(msg: string) {
  console.log(kleur.cyan(`\n▶ ${msg}`))
}

function logSuccess(msg: string) {
  console.log(kleur.green(`✅ ${msg}`))
}

function logWarn(msg: string) {
  console.log(kleur.yellow(`⚠️  ${msg}`))
}

function logError(msg: string) {
  console.log(kleur.red(`❌ ${msg}`))
}

async function installDependencies() {
  logStep("Installing Pharen UI dependencies...")

  const packageJsonPath = path.join(__dirname, "../package.json")
  const pkg = JSON.parse(await fs.readFile(packageJsonPath, "utf8"))

  const deps = Object.keys(pkg.dependencies || {})
  const peerDeps = Object.keys(pkg.peerDependencies || {})
  const allDeps = [...deps, ...peerDeps]

  if (allDeps.length === 0) {
    logWarn("No dependencies found to install.")
    return
  }

  console.log(kleur.gray(`→ Installing: ${allDeps.join(", ")}\n`))

  try {
    execSync(`pnpm add -D ${allDeps.join(" ")}`, { stdio: "inherit" })
    logSuccess("Dependencies installed successfully.")
  } catch (err) {
    logError("Failed to install dependencies.")
  }
}

async function init() {
  console.log(kleur.bold().cyan("\n🚀 Initializing Pharen UI (Tailwind v4)..."))

  // === Warn if Tailwind not detected ===
  try {
    const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"))
    if (
      !(
        pkg.dependencies?.tailwindcss ||
        pkg.devDependencies?.tailwindcss ||
        pkg.dependencies?.["@nuxtjs/tailwindcss"]
      )
    ) {
      logWarn("TailwindCSS not detected.")
      console.log(
        kleur.gray("Please ensure Tailwind is installed and configured before using Pharen UI.\n")
      )
    }
  } catch {
    logWarn("Could not verify Tailwind installation.")
  }

  // === Copy styles ===
  logStep("Setting up styles...")
  const libStyles = path.join(__dirname, "../src/styles/index.css")
  const targetDir = path.join(root, "src", "styles")
  const targetFile = path.join(targetDir, "styles.css")
  await fs.mkdir(targetDir, { recursive: true })

  try {
    await fs.copyFile(libStyles, targetFile)
    logSuccess("Created src/styles/styles.css")
  } catch (e) {
    logError("Could not copy styles/index.css")
  }

  // === Copy utils ===
  logStep("Copying utils...")
  const libUtilsDir = path.join(__dirname, "../src/utils")
  const targetUtilsDir = path.join(root, "src/utils")
  await fs.mkdir(targetUtilsDir, { recursive: true })

  try {
    const utils = await fs.readdir(libUtilsDir)
    for (const file of utils) {
      await fs.copyFile(path.join(libUtilsDir, file), path.join(targetUtilsDir, file))
    }
    logSuccess("Copied utils.")
  } catch (e) {
    logError("Could not copy utils.")
  }

  // === Install deps (optional) ===
  await installDependencies()

  console.log(kleur.bold().cyan("\n✨ Pharen UI initialized successfully!"))
  console.log(
    kleur.gray(`
Next steps:
  1️⃣  Import styles in your app entry:
      ${kleur.white("import '@/styles/styles.css'")}
  2️⃣  Start building with Pharen UI 🚀
`)
  )
}

async function addComponent(componentName: string) {
  logStep(`Adding component "${componentName}"...`)

  const registryFile = path.join(__dirname, "../registry/components", `${componentName}.json`)
  try {
    const config = JSON.parse(await fs.readFile(registryFile, "utf8"))
    const from = path.join(__dirname, "../", config.from)
    const to = path.join(root, config.to)
    await fs.mkdir(to, { recursive: true })

    for (const file of config.files) {
      await fs.copyFile(path.join(from, file), path.join(to, file))
      console.log(kleur.gray(`  ↳ ${file}`))
    }

    logSuccess(`Added component "${componentName}"`)
  } catch {
    logError(`Component "${componentName}" not found or invalid config.`)
  }
}

async function run() {
  switch (command) {
    case "init":
      await init()
      break
    case "add":
      if (!name) {
        logWarn("Usage: npx pharen-ui add <component>")
        process.exit(1)
      }
      await addComponent(name)
      break
    default:
      console.log(
        kleur.yellow("Usage: ") + kleur.white("npx pharen-ui <init|add> [component]\n")
      )
      console.log(kleur.gray("Examples:"))
      console.log("  " + kleur.white("npx pharen-ui init"))
      console.log("  " + kleur.white("npx pharen-ui add button"))
  }
}

run()
