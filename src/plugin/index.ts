import type { App } from 'vue'
import * as components from '../components'
import '../styles/index.css'

export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component as any)
    }
  },
}
