<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { zonesGames, gameGenres } from '@/src/composables/configs/zonesGames'

const itemsPerPage = 8
const currentPage = ref(1)

// Используем жанры из конфига
const activeFilter = ref<string>('Все')

// Проверка доступности игры
const isAvailable = (game: typeof zonesGames[0]) => {
  return game.available === true
}

// Фильтрация и сортировка игр (доступные первыми)
const filteredGames = computed(() => {
  let games = [...zonesGames]
  
  if (activeFilter.value !== 'Все') {
    games = games.filter(game => game.genre.includes(activeFilter.value))
  }
  
  return games.sort((a, b) => {
    const aAvailable = a.available === true ? 1 : 0
    const bAvailable = b.available === true ? 1 : 0
    return bAvailable - aAvailable
  })
})

const totalPages = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage))

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredGames.value.slice(start, start + itemsPerPage)
})

// Сброс страницы при смене фильтра
watch(activeFilter, () => {
  currentPage.value = 1
})

// Прокрутка наверх при смене страницы
watch(currentPage, () => {
  scrollToTop()
})

const scrollToTop = () => {
  const section = document.getElementById('games-catalog')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Навигация с прокруткой
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div class="zones-content">
    <p class="section-description">
      VR-хиты и новинки с ограниченным перемещением для одного или компаний до 3-х игроков
    </p>

    <!-- Фильтры -->
    <div class="filters-bar">
      <button 
        v-for="genre in gameGenres" 
        :key="genre"
        class="filter-chip"
        :class="{ active: activeFilter === genre }"
        @click="activeFilter = genre"
      >
        {{ genre }}
      </button>
    </div>

    <!-- Сетка игр -->
    <div class="zones-grid">
      <a 
        v-for="game in paginatedGames" 
        :key="game.id"
        :href="isAvailable(game) ? game.steamUrl : undefined"
        target="_blank"
        rel="noopener noreferrer"
        class="zone-card"
        :class="{ 'unavailable': !isAvailable(game) }"
      >
        <div class="card-image-wrapper">
          <img :src="game.image" :alt="game.name" class="game-image" />
          
          <!-- Надпись UNAVAILABLE для недоступных игр (видна всегда, кроме hover) -->
          <div v-if="!isAvailable(game)" class="unavailable-badge">
            <span>UNAVAILABLE</span>
          </div>
          
          <div class="image-overlay">
            <span class="steam-link">Открыть в Steam ↗</span>
          </div>
        </div>
        
        <div class="card-info">
          <h4 class="zone-game-title">{{ game.name }}</h4>
          <span class="zone-genre">{{ game.genre.join(', ') }}</span>
        </div>

        <div class="card-glow"></div>
      </a>
    </div>

    <!-- Пагинация -->
    <div class="pagination">
      <button 
        class="page-button" 
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        ← Назад
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in totalPages" 
          :key="page"
          class="page-number"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="page-button" 
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Вперед →
      </button>
    </div>
  </div>
</template>

<style scoped>
.section-description {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.filters-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
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
  white-space: nowrap;
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

/* Стили для недоступных игр */
.zone-card.unavailable {
  cursor: not-allowed;
}

.zone-card.unavailable:hover {
  border-color: #ef4444;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(239, 68, 68, 0.3);
}

.zone-card.unavailable .card-glow {
  background: linear-gradient(135deg, #ef4444, transparent, #f87171);
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

/* Бейдж UNAVAILABLE */
.unavailable-badge {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.5);
  backdrop-filter: blur(2px);
  z-index: 2;
  transition: opacity 0.3s;
}

.unavailable-badge span {
  color: rgb(177, 7, 7);
  font-weight: 900;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Courier New', monospace;
  text-shadow: 0 5px 20px rgba(0,0,0,0.9);
}

/* При hover на карточку бейдж исчезает */
.zone-card.unavailable:hover .unavailable-badge {
  opacity: 0;
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
  z-index: 3;
}

.zone-card:hover .image-overlay {
  opacity: 1;
}

/* Для недоступных игр overlay красный */
.zone-card.unavailable:hover .image-overlay {
  background: rgba(239, 68, 68, 0.4);
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

.zone-card:hover .steam-link:hover {
  background: var(--accent);
  color: var(--bg-primary);
}

/* Для недоступных игр Steam link неактивен */
.zone-card.unavailable .steam-link {
  color: #ef4444;
  border-color: #ef4444;
  opacity: 0.5;
  pointer-events: none;
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

/* Для недоступных игр название серое */
.zone-card.unavailable .zone-game-title {
  color: var(--text-secondary);
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

@media (max-width: 768px) {
  .zones-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 480px) {
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