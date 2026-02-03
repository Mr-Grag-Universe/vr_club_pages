<script setup lang="ts">
import { ref, computed } from 'vue'
import { zonesGames } from '@/src/composables/configs/zonesGames'

const itemsPerPage = 8
const currentPage = ref(1)

// Заглушка для фильтров (в будущем можно добавить реальную логику)
const activeFilter = ref('Все')
const filters = ['Все', 'Action', 'Shooter', 'Horror', 'Rhythm', 'Puzzle']

const filteredGames = computed(() => zonesGames)

const totalPages = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage))
const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredGames.value.slice(start, start + itemsPerPage)
})
</script>

<template>
  <div class="zones-content">
    <p class="section-description">
      VR-хиты и новинки с ограниченным перемещением для одного или компаний до 3-х игроков
    </p>

    <!-- Фильтры -->
    <div class="filters-bar">
      <button 
        v-for="filter in filters" 
        :key="filter"
        class="filter-chip"
        :class="{ active: activeFilter === filter }"
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Сетка игр -->
    <div class="zones-grid">
      <a 
        v-for="game in paginatedGames" 
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

.zone-card:hover .steam-link:hover {
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