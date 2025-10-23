import { createApp } from 'vue'
import App from './App.vue'
// Import the public stylesheet export rather than a private dist path.
// package.json exports expose this as "./styles.css" => import '@pharen/ui/styles.css'
import './styles.css'
import PharenUI from '@pharen/ui'

const app = createApp(App)
app.use(PharenUI)
app.mount('#app')
