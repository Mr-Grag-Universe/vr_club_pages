<!-- src/components/home/GamesGrid.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const games = ref([
  { id: 1, name: 'Half-Life: Alyx', genre: 'Action', duration: '45-90 мин', image: '/src/assets/images/games/hla.jpg' },
  { id: 2, name: 'Beat Saber', genre: 'Rhythm', duration: '15-30 мин', image: '/src/assets/images/games/beat_saber.jpg' },
  { id: 3, name: 'Pavlov VR', genre: 'Shooter', duration: '30-60 мин', image: '/src/assets/images/games/pavlov.jpg' },
  { id: 4, name: 'Superhot VR', genre: 'Puzzle', duration: '20-40 мин', image: '/src/assets/images/games/superhot.jpg' },
])

const hoveredGame = ref<number | null>(null)
</script>

<template>
  <section class="games-section">
    <h2 class="section-title">:: GAMES AVAILABLE ::</h2>
    
    <div class="games-grid">
      <div 
        v-for="game in games" 
        :key="game.id"
        class="game-card"
        @mouseenter="hoveredGame = game.id"
        @mouseleave="hoveredGame = null"
      >
        <div class="card-image">
          <img :src="game.image" :alt="game.name" />
          <div class="glitch-overlay" v-if="hoveredGame === game.id"></div>
        </div>
        
        <div class="card-info">
          <h3 class="game-title">{{ game.name }}</h3>
          <div class="game-meta">
            <span class="genre">{{ game.genre }}</span>
            <span class="duration">{{ game.duration }}</span>
          </div>
        </div>
        
        <!-- Эффект "взлома" -->
        <div class="hack-effect" :class="{ active: hoveredGame === game.id }">
          <div class="hack-code" v-for="i in 5" :key="i">
            {{ Math.random().toString(16).substring(2, 12) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.games-section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: var(--accent);
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Courier New', monospace;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.game-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 40px var(--glow);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.game-card:hover .card-image img {
  transform: scale(1.05);
}

.glitch-overlay {
  position: absolute;
  inset: 0;
  background: var(--accent);
  mix-blend-mode: screen;
  opacity: 0.1;
  animation: glitch-move 0.3s infinite;
}

@keyframes glitch-move {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
}

.card-info {
  padding: 1.5rem;
}

.game-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.game-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Эффект взлома */
.hack-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  background: var(--bg-primary);
  overflow: hidden;
}

.hack-effect.active {
  opacity: 0.9;
}

.hack-code {
  font-family: monospace;
  font-size: 0.8rem;
  color: var(--accent);
  padding: 0 1rem;
  animation: code-scroll 2s linear infinite;
}

@keyframes code-scroll {
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
}
</style>