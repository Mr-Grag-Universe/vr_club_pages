<script setup lang="ts">
import BaseLayout from '@/components/base/BaseLayout.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FAQ from '@/components/home/FAQ.vue'
import GamesGrid from '@/components/home/GamesGrid.vue'
import StatsCounter from '@/components/home/StatsCounter.vue'
import Location from '@/components/home/Location.vue'
import SmartGallary from '@/components/common/SmartGallary.vue'
import GiftCards from '@/components/home/GiftCards.vue'
import Events from '@/components/home/Events.vue'
import ArenaVideos from '@/components/home/ArenaVideos.vue'

import { ref, computed } from 'vue'

  const arenaImages = computed(() => 
    Array.from({ length: 9 }, (_, i) => ({
      src: `/src/assets/images/arena/${i + 1}.jpg`,
      alt: `Фото арены ${i + 1}`
    }))
  )
  const zonesImages = computed(() => 
    Array.from({ length: 6 }, (_, i) => ({
      src: `/src/assets/images/arena/${i + 1}.jpg`,
      alt: `Фото VR зоны ${i + 1}`
    }))
  )
  const arenaGamesImages = computed(() => 
    Array.from({ length: 8 }, (_, i) => ({
      src: `/src/assets/images/games/arena/${i + 1}.jpg`,
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