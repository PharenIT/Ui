import type { App } from "vue"
import "../styles/index.css"

export interface PharenUIOptions {
  prefix?: string
}

export default {
  install(app: App, options: PharenUIOptions = {}) {
    const prefix = options.prefix ?? "Ui" // Default prefix: Ui

    const modules = import.meta.glob(["../components/**/*.{vue,ts,tsx}"], {
      eager: true,
    })

    for (const [path, module] of Object.entries(modules)) {
      const match = path.match(/\/([^/]+)\.(vue|ts|tsx)$/)
      if (!match) continue

      const rawName = match[1]
      const componentName = `${prefix}${rawName.charAt(0).toUpperCase()}${rawName.slice(1)}`
      const component = (module as any).default

      if (component && typeof component === "object") {
        app.component(componentName, component)
      }
    }

    console.log(
      `✅ Pharen UI: ${Object.keys(modules).length} components registered with prefix "${prefix}".`
    )
  },
}
