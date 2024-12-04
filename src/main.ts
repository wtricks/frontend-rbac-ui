import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  position: POSITION.TOP_LEFT,
  timeout: 3000
})
app.mount('#app')
