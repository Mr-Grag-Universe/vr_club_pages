import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/src/views/Home.vue'
import iconImg from '@/assets/icons/icon_dark.ico'
import Prices from '@/src/views/Prices.vue'
import Booking from '@/src/views/Booking.vue'
import Games from '@/src/views/Games.vue'

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
        title: "VR Arena Metaforce | VR клуб во Владимире - VR арена",
        icon: iconImg,
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
    },
    {
      path: '/games',
      name: 'games',
      component: Games,
      meta: {
        title: "VR Arena Metaforce | Игры",
        icon: iconImg
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
        favicon.href = iconImg; // Favicon for home route
      } else {
        favicon.href = iconImg; // Default favicon
      }
    } else {
      console.warn("Favicon element not found");
    }
  }
})

export default router
