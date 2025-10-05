import { createApp } from 'vue'
import App from './App.vue'

// Importiere Pharen UI
import '@pharen/ui/styles.css'
import PharenUI from '@pharen/ui' // oder { UiButton } für gezielte Imports

const app = createApp(App)
app.use(PharenUI) // registriert alle Komponenten automatisch
app.mount('#app')
