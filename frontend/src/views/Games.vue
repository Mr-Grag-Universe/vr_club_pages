<!-- src/components/games/GameCatalog.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { glitchText } from '@/src/composables/glitchEffects'
import { arenaGames } from '@/src/composables/configs/arenaGames'
import { zonesGames } from '@/src/composables/configs/zonesGames'
import type { ArenaGame, ZoneGame } from '@/src/composables/configs/types'

type TabType = 'arena' | 'zones'

// Табы
const activeTab = ref<TabType>('arena')
const displayTitle = ref('GAME CATALOG')
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

// Пагинация для Zones
const itemsPerPage = 8
const currentPage = ref(1)

// ARENA - используем импортированный конфиг
const selectedArenaGame = ref<string | null>(null)
const hoveredArenaGame = ref<string | null>(null)

// ZONES - используем импортированный конфиг
// Можно добавить фильтрацию если нужно
const filteredZonesGames = computed(() => zonesGames) // Заглушка для будущих фильтров

const totalPages = computed(() => Math.ceil(filteredZonesGames.value.length / itemsPerPage))
const paginatedZonesGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredZonesGames.value.slice(start, end)
})

// Сброс страницы при смене таба
const switchTab = (tab: TabType) => {
  activeTab.value = tab
  currentPage.value = 1
  selectedArenaGame.value = null
  
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
  <section class="catalog-section" id="games-catalog">
    <!-- Глитч-заголовок -->
    <h2 ref="titleRef" class="section-title glitch-title" :class="{ 'glitching': isAnimating }">
      :: {{ displayTitle }} ::
    </h2>

    <!-- Табы переключения -->
    <div class="tabs-container">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'arena' }"
        @click="switchTab('arena')"
      >
        <span class="tab-icon">◈</span>
        <span class="tab-text">Arena</span>
        <span class="tab-badge">4 games</span>
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'zones' }"
        @click="switchTab('zones')"
      >
        <span class="tab-icon">◉</span>
        <span class="tab-text">Zones</span>
        <span class="tab-badge">40+ games</span>
      </button>
    </div>

    <!-- ARENA CONTENT -->
    <div v-if="activeTab === 'arena'" class="arena-content">
      <p class="section-description">
        Игры собственной разработки со свободным перемещением для компаний до 10 человек
      </p>

      <div class="arena-grid">
        <div 
          v-for="game in arenaGames" 
          :key="game.id"
          class="arena-card"
          :class="{ 'expanded': selectedArenaGame === game.id }"
          @mouseenter="hoveredArenaGame = game.id"
          @mouseleave="hoveredArenaGame = null"
          @click="selectedArenaGame = selectedArenaGame === game.id ? null : game.id"
          :style="{ '--game-color': game.color }"
        >
          <!-- Видео фон -->
          <div class="arena-media">
            <video 
              v-if="hoveredArenaGame === game.id || selectedArenaGame === game.id"
              autoplay muted loop playsinline
              class="game-video"
            >
              <source :src="game.videoUrl" type="video/mp4">
            </video>
            <div v-else class="video-placeholder" :style="{ background: game.color }">
              <span class="play-icon">▶</span>
            </div>
            
            <!-- Градиент оверлей -->
            <div class="media-overlay"></div>
          </div>

          <!-- Контент карточки -->
          <div class="arena-card-content">
            <div class="game-header">
              <h3 class="game-name">{{ game.name }}</h3>
              <span class="game-genre">{{ game.genre }}</span>
            </div>
            
            <p class="game-description">{{ game.description }}</p>
            
            <!-- Раскрывающийся контент -->
            <div class="expandable-content" :class="{ 'show': selectedArenaGame === game.id }">
              <div class="features-list">
                <span v-for="feature in game.features" :key="feature" class="feature-tag">
                  {{ feature }}
                </span>
              </div>
              
              <div class="screenshots-preview">
                <div 
                  v-for="(screenshot, idx) in game.screenshots" 
                  :key="idx"
                  class="screenshot-thumb"
                  :style="{ backgroundImage: `url(${screenshot})` }"
                ></div>
              </div>
            </div>

            <button class="details-button">
              {{ selectedArenaGame === game.id ? 'Свернуть ↑' : 'Подробнее ↓' }}
            </button>
          </div>

          <!-- Декоративные элементы -->
          <div class="corner-decoration top-left"></div>
          <div class="corner-decoration top-right"></div>
          <div class="corner-decoration bottom-left"></div>
          <div class="corner-decoration bottom-right"></div>
        </div>
      </div>
    </div>

    <!-- ZONES CONTENT -->
    <div v-else class="zones-content">
      <p class="section-description">
        VR-хиты и новинки с ограниченным перемещением для одного или компаний до 3-х игроков
      </p>

      <!-- Фильтры (заглушка для будущего функционала) -->
      <div class="filters-bar">
        <button class="filter-chip active">Все</button>
        <button class="filter-chip">Action</button>
        <button class="filter-chip">Shooter</button>
        <button class="filter-chip">Horror</button>
        <button class="filter-chip">Rhythm</button>
        <button class="filter-chip">Puzzle</button>
      </div>

      <!-- Сетка игр -->
      <div class="zones-grid">
        <a 
          v-for="game in paginatedZonesGames" 
          :key="game.id"
          :href="game.steamUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="zone-card"
        >
          <div class="card-image-wrapper">
            <img :src="game.image" :alt="game.name" class="game-image" />
            <div class="image-overlay">
              <span class="steam-link">Открыть в Steam ↗</span>
            </div>
          </div>
          
          <div class="card-info">
            <h4 class="zone-game-title">{{ game.name }}</h4>
            <span class="zone-genre">{{ game.genre }}</span>
          </div>

          <!-- Hover эффект -->
          <div class="card-glow"></div>
        </a>
      </div>

      <!-- Пагинация -->
      <div class="pagination">
        <button 
          class="page-button" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          ← Назад
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="page-number"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          class="page-button" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Вперед →
        </button>
      </div>

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
    </div>
  </section>
</template>

<style scoped>
.catalog-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
}

/* Табы */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0 3rem;
  position: relative;
  z-index: 10;
}

.tab-button {
  position: relative;
  padding: 1rem 2.5rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: 12px;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  overflow: hidden;
}

.tab-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.tab-button:hover {
  border-color: var(--accent);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.tab-button:hover::before {
  opacity: 1;
}

.tab-button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
  box-shadow: 0 0 30px var(--glow);
}

.tab-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

.tab-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-weight: 400;
}

.tab-button.active .tab-badge {
  background: rgba(255, 255, 255, 0.2);
}

.section-description {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ARENA GRID - 2x2 Masonry */
.arena-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  perspective: 1000px;
}

.arena-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--bg-accent);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.arena-card:hover {
  transform: translateY(-8px) rotateX(2deg);
  border-color: var(--game-color);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 40px rgba(var(--game-color), 0.3);
}

.arena-card.expanded {
  grid-column: span 2;
  transform: none;
}

/* Медиа секция */
.arena-media {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: var(--bg-primary);
}

.game-video,
.video-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--game-color), var(--bg-accent));
}

.play-icon {
  font-size: 4rem;
  opacity: 0.8;
  transition: all 0.3s;
  filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));
}

.arena-card:hover .play-icon {
  transform: scale(1.1);
  opacity: 1;
}

.arena-card:hover .game-video {
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, var(--bg-secondary) 100%);
  pointer-events: none;
}

/* Контент карточки */
.arena-card-content {
  padding: 1.5rem;
  position: relative;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.game-name {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.game-genre {
  padding: 0.4rem 1rem;
  background: var(--game-color);
  color: var(--bg-primary);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.game-description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Раскрывающийся контент */
.expandable-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s,
              margin 0.3s;
  opacity: 0;
}

.expandable-content.show {
  max-height: 300px;
  opacity: 1;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.feature-tag {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--bg-accent);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
}

.screenshots-preview {
  display: flex;
  gap: 0.75rem;
}

.screenshot-thumb {
  flex: 1;
  height: 100px;
  background: var(--bg-accent);
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  border: 1px solid var(--bg-accent);
  transition: all 0.3s;
}

.screenshot-thumb:hover {
  border-color: var(--accent);
  transform: scale(1.05);
}

.details-button {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 2px solid var(--bg-accent);
  border-radius: 8px;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
}

.details-button:hover {
  border-color: var(--game-color);
  color: var(--game-color);
  background: rgba(255, 255, 255, 0.02);
}

/* Угловые декорации */
.corner-decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--game-color);
  opacity: 0;
  transition: all 0.3s;
}

.top-left { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.top-right { top: 10px; right: 10px; border-left: none; border-bottom: none; }
.bottom-left { bottom: 10px; left: 10px; border-right: none; border-top: none; }
.bottom-right { bottom: 10px; right: 10px; border-left: none; border-top: none; }

.arena-card:hover .corner-decoration {
  opacity: 0.5;
}

/* ZONES CONTENT */
.filters-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.filter-chip {
  padding: 0.6rem 1.2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-chip:hover {
  border-color: var(--accent);
  color: var(--text-primary);
  transform: translateY(-2px);
}

.filter-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
  font-weight: 600;
}

/* Zones Grid */
.zones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.zone-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--bg-accent);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.zone-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: var(--accent);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px var(--glow);
}

.card-image-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.zone-card:hover .game-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  backdrop-filter: blur(4px);
}

.zone-card:hover .image-overlay {
  opacity: 1;
}

.steam-link {
  color: var(--accent);
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--accent);
  border-radius: 6px;
  transition: all 0.3s;
}

.steam-link:hover {
  background: var(--accent);
  color: var(--bg-primary);
}

.card-info {
  padding: 1.25rem;
}

.zone-game-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.zone-genre {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, var(--accent), transparent, var(--accent-hover));
  border-radius: 12px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
  filter: blur(10px);
}

.zone-card:hover .card-glow {
  opacity: 0.5;
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0;
}

.page-button {
  padding: 0.75rem 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.page-button:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.page-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.page-number.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
  box-shadow: 0 0 15px var(--glow);
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

/* Адаптивность */
@media (max-width: 1024px) {
  .arena-grid {
    grid-template-columns: 1fr;
  }
  
  .arena-card.expanded {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .tabs-container {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .arena-media {
    height: 200px;
  }
  
  .zones-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 480px) {
  .catalog-section {
    padding: 2rem 1rem;
  }
  
  .game-name {
    font-size: 1.25rem;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .page-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}
</style>