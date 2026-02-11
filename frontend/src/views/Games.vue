<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import BaseLayout from '@/src/components/base/BaseLayout.vue'
import { glitchText } from '@/src/scripts/glitchEffects'
import GamesTabs from '@/src/components/games/GamesTabs.vue'
import ArenaGames from '@/src/components/games/ArenaGames.vue'
import ZonesGames from '@/src/components/games/ZonesGames.vue'

type TabType = 'arena' | 'zones'

const activeTab = ref<TabType>('arena')
const displayTitle = ref('GAME CATALOG')
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
const hasAnimated = ref(false) // Флаг, чтобы анимация сработала только один раз

const switchTab = (tab: TabType) => {
  activeTab.value = tab
  const title = tab === 'arena' ? 'ИГРЫ НА VR-АРЕНЕ' : 'ИГРЫ В VR-ЗОНАХ'
  glitchText(title, isAnimating, displayTitle, 800)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Срабатывает только при первом появлении в viewport
      if (entry.isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        setTimeout(() => {
          glitchText('ИГРЫ НА АРЕНЕ', isAnimating, displayTitle, 1000)
        }, 500)
        // Отключаем observer после первого срабатывания
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })
  
  if (titleRef.value) {
    observer.observe(titleRef.value)
  }
//   setTimeout(() => {
//     console.log("> scroll up!!!")
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }, 1000)
  nextTick(() => {
    console.log("> scroll up!!!")
    // const scrollingElement = document.documentElement || document.body; 
    // document.body.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo(0, 600);
  });
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

      
        <div class="view-all-link">
        <a 
            href="https://metaforce.ru/vladimir/games" 
            target="_blank" 
            rel="noopener noreferrer"
            class="external-link"
        >
            Полный каталог на metaforce.ru ↗
        </a>
        </div>
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

.view-all-link {
  text-align: center;
  margin-top: 2rem;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-family: 'Courier New', monospace;
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  transition: all 0.3s;
}

.external-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(99, 102, 241, 0.05);
}
</style>