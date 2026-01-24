import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Prices from '@/views/Prices.vue'
import Booking from '@/views/Booking.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: Home, 
      meta: { 
        title: "Арена виртуальной реальности во Владимире",
        icon: '/src/assets/icons/icon_dark.ico',
      } 
    },
    { 
      path: '/prices', 
      name: 'prices', 
      component: Prices, 
      meta: { 
        title: "Тарифы",
        icon: '/src/assets/icons/icon_dark.ico',
      } 
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking,
      meta: {
        title: "Бронирование",
        icon: '/src/assets/icons/icon_dark.ico',
      }
    }
  ],
})

router.afterEach((to) => {
  // Проверяем, что мы в браузере
  if (typeof document !== 'undefined') {
    const title = to.meta.title || 'VR Arena'
    document.title = title

    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {  // Check if favicon is not null
      if (to.name === 'home') {
        favicon.href = '/src/assets/icons/icon_dark.ico'; // Favicon for home route
      } else {
        favicon.href = '/src/assets/icons/icon_dark.ico'; // Default favicon
      }
    } else {
      console.warn("Favicon element not found");
    }
  }
})

export default router
