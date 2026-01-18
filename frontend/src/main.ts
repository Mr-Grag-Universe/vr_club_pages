import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import App from './App.vue'
import router from './router'

import '@/assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueVideoPlayer)

app.mount('#app')