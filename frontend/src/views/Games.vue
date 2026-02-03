<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseLayout from '@/src/components/base/BaseLayout.vue'
import { glitchText } from '@/src/composables/glitchEffects'
import GamesTabs from '@/src/components/games/GamesTabs.vue'
import ArenaGames from '@/src/components/games/ArenaGames.vue'
import ZonesGames from '@/src/components/games/ZonesGames.vue'

type TabType = 'arena' | 'zones'

const activeTab = ref<TabType>('arena')
const displayTitle = ref('GAME CATALOG')
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

const switchTab = (tab: TabType) => {
  activeTab.value = tab
  const title = tab === 'arena' ? 'ARENA GAMES' : 'ZONES LIBRARY'
  glitchText(title, isAnimating, displayTitle, 800)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          glitchText('ARENA GAMES', isAnimating, displayTitle, 1000)
        }, 500)
      }
    })
  }, { threshold: 0.3 })
  
  if (titleRef.value) {
    observer.observe(titleRef.value)
  }
})
</script>

<template>
  <BaseLayout title="Игры - VR Arena">
    <section class="catalog-section" id="games-catalog">
      <!-- Глитч-заголовок -->
      <h2 ref="titleRef" class="section-title glitch-title" :class="{ 'glitching': isAnimating }">
        :: {{ displayTitle }} ::
      </h2>

      <!-- Табы -->
      <GamesTabs :active-tab="activeTab" @switch="switchTab" />

      <!-- Контент -->
      <Transition name="fade" mode="out-in">
        <ArenaGames v-if="activeTab === 'arena'" key="arena" />
        <ZonesGames v-else key="zones" />
      </Transition>
    </section>
  </BaseLayout>
</template>

<style scoped>
.catalog-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .catalog-section {
    padding: 2rem 1rem;
  }
}
</style>