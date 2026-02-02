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

import { ref, computed } from 'vue'

const arenaImagesGlob = import.meta.glob('@/assets/images/arena/*.jpg', { 
  eager: true,
  import: 'default'
})
const arenaGamesImagesGlob = import.meta.glob('@/assets/images/games/arena/*.jpg', { 
  eager: true,
  import: 'default'
})

const arenaImages = computed(() => 
  Object.entries(arenaImagesGlob).map(([path, src], i) => ({
    src: src as string,  // URL с хешем
    alt: `Фото арены ${i + 1}`
  }))
)
console.log(arenaImages)
const arenaGamesImages = computed(() => 
  Object.entries(arenaGamesImagesGlob).map(([path, src], i) => ({
    src: src as string,  // URL с хешем
    alt: `Скрин VR Arena ${i + 1}`
  }))
)
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

    <!-- <SmartGallary 
      :images="zonesImages" 
      :title="{ en: 'VR Zones Gallary', ru: 'Фото VR-зон' }"
    /> -->
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