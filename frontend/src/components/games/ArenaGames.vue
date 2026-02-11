<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { arenaGames } from '@/src/scripts/games/arenaGames'
import ArenaGameModal from './ArenaGameModal.vue'

const hoveredGame = ref<string | null>(null)
const selectedGameId = ref<string | null>(null)

const selectedGame = computed(() => {
  if (!selectedGameId.value) return null
  return arenaGames.find(g => g.id === selectedGameId.value) || null
})

const openGame = (id: string) => {
  selectedGameId.value = id
}

const closeGame = () => {
  selectedGameId.value = null
}

// Управление скроллом здесь
watch(selectedGameId, (id) => {
  if (id) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="arena-content">
    <p class="section-description">
      Игры собственной разработки со свободным перемещением для компаний до 10 человек
    </p>

    <!-- Сетка карточек -->
    <div class="arena-grid" :class="{ 'dimmed': selectedGameId !== null }">
      <div 
        v-for="game in arenaGames" 
        :key="game.id"
        class="arena-card"
        :style="{ '--game-color': game.color }"
        @mouseenter="hoveredGame = game.id"
        @mouseleave="hoveredGame = null"
        @click="openGame(game.id)"
      >
        <!-- Превью с изображением -->
        <div class="arena-media">
          <video 
            v-if="hoveredGame === game.id"
            autoplay muted loop playsinline
            class="game-video"
          >
            <source :src="game.videoUrl" type="video/mp4">
          </video>
          
          <!-- Превьюшка как в ArenaVideos -->
          <div v-else class="video-placeholder" :style="{ background: game.color }">
            <img :src="game.thumbnail" class="video-thumbnail" :alt="game.name" />
            <div class="play-icon">▶</div>
          </div>
          
          <div class="media-overlay"></div>
        </div>

        <div class="arena-card-content">
          <div class="game-header">
            <h3 class="game-name">{{ game.name }}</h3>
            <span class="game-genre">{{ game.genre }}</span>
          </div>
          <p class="game-description">{{ game.description }}</p>
          <button class="details-button">Подробнее ↗</button>
        </div>

        <!-- Декорации -->
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration top-right"></div>
        <div class="corner-decoration bottom-left"></div>
        <div class="corner-decoration bottom-right"></div>
      </div>
    </div>

    <!-- Модальное окно -->
    <ArenaGameModal 
      :game="selectedGame" 
      @close="closeGame" 
    />
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

.arena-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  perspective: 1000px;
}

.arena-grid.dimmed {
  filter: blur(4px) brightness(0.5);
  pointer-events: none;
  transition: filter 0.4s ease;
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

.arena-media {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: var(--bg-primary);
}

.game-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* Стили превью как в ArenaVideos */
.video-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.arena-card:hover .video-thumbnail {
  opacity: 0.5;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: var(--game-color);
  opacity: 0.7;
  transition: all 0.3s ease;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.8));
}

.arena-card:hover .play-icon {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
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

@media (max-width: 1024px) {
  .arena-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .arena-media {
    height: 200px;
  }
}
</style>