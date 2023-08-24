import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import './assets/colors.css'

import { defineCustomElement } from 'vue'
import AppHeaderComp from './components/feature/AppHeader/AppHeader.ce.vue'
customElements.define('tsx-appheader', defineCustomElement(AppHeaderComp))

const app = createApp(App)
app.mount('#app')
