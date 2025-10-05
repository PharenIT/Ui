import { createApp } from 'vue'
import App from './App.vue'

// Importiere deine UI Library
import '@pharen/ui/styles.css'

import PharenUI from '@pharen/ui'

const app = createApp(App)
app.use(PharenUI)
app.mount('#app')
