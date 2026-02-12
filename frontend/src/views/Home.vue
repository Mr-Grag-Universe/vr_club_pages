<script setup lang="ts">
import BaseLayout from '@/src/components/base/BaseLayout.vue'
import HeroSection from '@/src/components/home/HeroSection.vue'
import FAQ from '@/src/components/home/FAQ.vue'
import GamesGrid from '@/src/components/home/GamesGrid.vue'
import StatsCounter from '@/src/components/home/StatsCounter.vue'
import Location from '@/src/components/home/Location.vue'
import SmartGallary from '@/src/components/common/SmartGallary.vue'
import GiftCards from '@/src/components/home/GiftCards.vue'
import Events from '@/src/components/home/Events.vue'
import ArenaVideos from '@/src/components/home/ArenaVideos.vue'
import { import_files } from '../scripts/utils'

import { ref, computed } from 'vue'

const arenaImagesGlobJpg = import.meta.glob('@/assets/images/arena/jpg/*.jpg', { 
    eager: true,
    import: 'default'
})
const arenaImagesGlobWebp = import.meta.glob('@/assets/images/arena/webp/*.webp', { 
    eager: true,
    import: 'default'
})
const arenaGamesImagesGlobJpg = import.meta.glob('@/assets/images/games/arena/jpg/*.jpg', { 
    eager: true,
    import: 'default'
})
const arenaGamesImagesGlobWebp = import.meta.glob('@/assets/images/games/arena/webp/*.webp', { 
    eager: true,
    import: 'default'
})

const getFileName = (path: string): string => {
  return path
    .split('/')
    .pop()
    ?.replace(/\.(jpg|jpeg|webp|avif)$/i, '') 
    ?? ''
}


const arenaImages = computed(() => {
  // Создаём карты для быстрого поиска по имени файла
  const webpMap = new Map(
    Object.entries(arenaImagesGlobWebp).map(([path, src]) => [
      getFileName(path),
      src as string
    ])
  )

  console.log(webpMap)

  // Собираем финальный массив на основе JPG (fallback)
  return Object.entries(arenaImagesGlobJpg).map(([path, src], i) => {
    const fileName = getFileName(path)
    console.log(fileName)
    console.log(webpMap.get(fileName))

    return {
      src: src as string,           // JPG fallback
      webpSrc: webpMap.get(fileName) || '',  // WEBP если есть
      alt: `Фото арены ${i + 1}`
    }
  })
})
console.log(arenaImages)

const arenaGamesImages = computed(() => {
  // Создаём карты для быстрого поиска по имени файла
  const webpMap = new Map(
    Object.entries(arenaGamesImagesGlobWebp).map(([path, src]) => [
      getFileName(path),
      src as string
    ])
  )

  console.log(webpMap)

  return Object.entries(arenaGamesImagesGlobJpg).map(([path, src], i) => {
    const fileName = getFileName(path)
    console.log(fileName)
    console.log(webpMap.get(fileName))

    return {
      src: src as string,           // JPG fallback
      webpSrc: webpMap.get(fileName) || '',  // WEBP если есть
      alt: `Фото арены ${i + 1}`
    }
  })
})
console.log(arenaImages)
</script>

<template>
  <BaseLayout title="VR Arena - Погрузись в виртуальную реальность">
    <HeroSection />
    <SmartGallary 
      :images="arenaImages" 
      :title="{ en: 'VR Arena Gallery', ru: 'Фото VR-арены' }"
    />
    <SmartGallary 
      :images="arenaGamesImages" 
      :title="{ en: 'VR Arena Games', ru: 'Игры на VR-арене' }"
    />
    <Events />
    <GiftCards :title="{en: 'GIFT CARDS', ru: 'ПОДАРОЧНЫЕ КАРТЫ'}" />
    <ArenaVideos />
    <GamesGrid />
    <StatsCounter />
    <Location />
    <FAQ />
  </BaseLayout>

</template>

<script lang="ts">
</script>

<style scoped>
.bukza-section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.bukza-section h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}
</style>