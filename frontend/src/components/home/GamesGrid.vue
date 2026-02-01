<!-- src/components/home/GamesGrid.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { glitchText } from '@/composables/glitchEffects'

const games = ref([
  { 
    id: 1, 
    name: 'Half-Life: Alyx', 
    genre: 'Action', 
    duration: '', // '45-90 мин', 
    image: '/src/assets/images/games/hla.jpg',
    actionText: 'ACTIVATE',
    steamUrl: 'https://store.steampowered.com/app/546560/HalfLife_Alyx/'
  },
  { 
    id: 2, 
    name: 'Beat Saber', 
    genre: 'Rhythm', 
    duration: '', // '15-30 мин', 
    image: '/src/assets/images/games/beat_saber.jpg',
    actionText: 'LAUNCH',
    steamUrl: 'https://store.steampowered.com/app/620980/Beat_Saber/'
  },
  { 
    id: 3, 
    name: 'Pavlov VR', 
    genre: 'Shooter', 
    duration: '', // '30-60 мин', 
    image: '/src/assets/images/games/pavlov.jpg',
    actionText: 'CONNECT',
    steamUrl: 'https://store.steampowered.com/app/555160/Pavlov_VR/'
  },
  { 
    id: 4, 
    name: 'Superhot VR', 
    genre: 'Puzzle', 
    duration: '', // '20-40 мин', 
    image: '/src/assets/images/games/superhot.jpg',
    actionText: 'RUN',
    steamUrl: 'https://store.steampowered.com/app/617830/SUPERHOT_VR/'
  },
  { 
    id: 5, 
    name: 'Vacation Simulator', 
    genre: 'Simulation', 
    duration: '', // '30-60 мин', 
    image: '/src/assets/images/games/vacation_sim.jpg',
    actionText: 'INITIALIZE',
    steamUrl: 'https://store.steampowered.com/app/726830/Vacation_Simulator/'
  },
  { 
    id: 6, 
    name: 'Elven Assassin', 
    genre: 'Tower Defense', 
    duration: '', // '15-45 мин', 
    image: '/src/assets/images/games/elven_assasin.jpg',
    actionText: 'DEPLOY',
    steamUrl: 'https://store.steampowered.com/app/503770/Elven_Assassin/'
  },
  { 
    id: 7, 
    name: 'Phasmophobia', 
    genre: 'Horror', 
    duration: '', // '30-90 мин', 
    image: '/src/assets/images/games/phasmo.jpg',
    actionText: 'ENTER',
    steamUrl: 'https://store.steampowered.com/app/739630/Phasmophobia/'
  },
  { 
    id: 8, 
    name: 'Serious Sam 3: BFE', 
    genre: 'Action-Shooter', 
    duration: '', // '30-90 мин', 
    image: '/src/assets/images/games/serious_sam.jpg',
    actionText: 'SHOOT',
    steamUrl: 'https://store.steampowered.com/app/567670/Serious_Sam_3_VR_BFE/'
  }
])

const hoveredGame = ref<number | null>(null)


const displayTitle = ref('VR ZONES\' GAMES AVAILABLE')
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && displayTitle.value === 'VR ZONES\' GAMES AVAILABLE') {
        setTimeout(() => {
          glitchText('ИГРЫ В VR ЗОНАХ', isAnimating, displayTitle, 1200)
        }, 1800)
      }
    })
  }, { threshold: 0.5 })
  
  if (titleRef.value) {
    observer.observe(titleRef.value)
  }
})
</script>

<template>
  <section class="games-section" id="games">
    <h2 ref="titleRef" class="section-title glitch-title" :class="{ 'glitching': isAnimating }">
      :: {{ displayTitle }} ::
    </h2>

    <p class="description">VR-хиты и новинки с ограниченным перемещением для одного или компаний до 3-х игроков</p>
    <p></p>

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
        </div>
        
        <div class="card-info">
          <h3 class="game-title">{{ game.name }}</h3>
          <div class="game-meta">
            <span class="genre">{{ game.genre }}</span>
            <span class="duration">{{ game.duration }}</span>
          </div>
        </div>

        <!-- Оверлей с действием -->
        <a 
          :href="game.steamUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="game-overlay"
          :class="{ active: hoveredGame === game.id }"
        >
          <div class="overlay-content">
            <!-- Анимированный фон из кода -->
            <div class="code-background">
              <div 
                class="code-line" 
                v-for="i in 8" 
                :key="i"
                :style="{ animationDelay: `${i * 0.2}s` }"
              >
                {{ Math.random().toString(16).substring(2, 12) }}
              </div>
            </div>
            
            <!-- Текст действия -->
            <span class="action-text">{{ game.actionText }}</span>
          </div>
        </a>
      </div>
    </div>
    
    <div class="view-all-container">
      <a 
        href="https://metaforce.ru/vladimir/games" 
        target="_blank" 
        rel="noopener noreferrer"
        class="view-all-button"
      >
        все наши игры
      </a>
    </div>
  </section>
</template>

<style scoped>
.games-section {
  padding: 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.game-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--bg-accent);
}

.game-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px var(--glow);
  border-color: var(--accent);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.game-card:hover .card-image img {
  transform: scale(1.1);
}

.card-info {
  padding: 1.5rem;
}

.game-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.game-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Оверлей с эффектом взлома */
.game-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.4s;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(5px);
}

.game-overlay.active {
  opacity: 1;
}

.overlay-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Анимированный фон из кода */
.code-background {
  position: absolute;
  inset: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  padding: 2rem;
}

.code-line {
  color: var(--accent);
  opacity: 0.2;
  animation: code-flow 3s linear infinite;
  white-space: nowrap;
}

.code-line:nth-child(odd) {
  animation-duration: 3.5s;
}

.code-line:nth-child(even) {
  animation-duration: 2.5s;
}

@keyframes code-flow {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

/* Текст действия */
.action-text {
  position: relative;
  z-index: 1;
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 20px var(--glow);
  animation: pulse-text 1.5s ease-in-out infinite;
}

@keyframes pulse-text {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .action-text {
    font-size: 1.5rem;
  }
}

.description {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.view-all-container {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
}

.view-all-button {
  display: inline-block;
  padding: 1rem 3rem;
  background: var(--bg-secondary);
  border: 2px solid var(--accent);
  border-radius: 8px;
  color: var(--accent);
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 2px;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.view-all-button:hover {
  background: var(--accent);
  color: var(--bg-primary);
  box-shadow: 0 0 30px var(--glow);
  transform: translateY(-3px) scale(1.02);
}

.view-all-button:active {
  transform: translateY(0) scale(0.98);
}
</style>