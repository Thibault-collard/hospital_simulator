import { createApp } from 'vue'
import App from './App'

import BootstrapVue3 from 'bootstrap-vue-3'
const app = createApp(App);

app.use(BootstrapVue3)

app.mount('#app');