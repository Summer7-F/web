import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'
import parallax from './directives/parallax'
import './styles/main.css'

const app = createApp(App)
app.directive('reveal', reveal)
app.directive('parallax', parallax)
app.use(router)
app.mount('#app')
