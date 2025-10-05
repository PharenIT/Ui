import { createApp } from 'vue'
import App from './App.vue'

// Importiere deine UI-Library
import '@pharen/ui/styles.css'
import { UiButton } from '@pharen/ui'

const app = createApp(App)
app.component('UiButton', UiButton)
app.mount('#app')
