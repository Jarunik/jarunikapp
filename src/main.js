import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import linkify from 'vue-linkify'

const app = createApp(App)

app.use(router).mount('#app')
app.use(VueAxios, axios)
app.directive('linkified', linkify)

