import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home, meta: { title: "Арена виртуальной реальности во Владимире" } },
  ],
})

router.afterEach((to) => {
  // Проверяем, что мы в браузере
  if (typeof document !== 'undefined') {
    const title = to.meta.title || 'VR Arena'
    document.title = title
  }
})

export default router
