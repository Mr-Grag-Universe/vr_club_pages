<script setup lang="ts">
import { ref } from 'vue'

import teamForceVideo from '@/assets/videos/team_force.mp4'

const videos = ref([
  { 
    id: 1, 
    name: 'Team Force',  
    description: 'Командный шутер а-ля Counter-Strike. 12 карт для полного разнообразия', 
    actionText: 'PLAY',
    url: teamForceVideo, // Переместите видео в public/videos/
    thumbnail: '/images/team_force_thumb.jpg' // Добавьте превью в public/images/
  },
//   { 
//     id: 2, 
//     name: 'Star Force', 
//     description: 'Космический шутер в далекой-далекой галактике. Телепорты в наличии', 
//     actionText: 'LAUNCH',
//     url: '/videos/space_war.mp4',
//     thumbnail: '/images/space_war_thumb.jpg'
//   },
//   { 
//     id: 3, 
//     name: 'Elevators', 
//     description: 'Многоэтажный шутер с перемещениями между этажами и зданиями.', 
//     actionText: 'CLIMB',
//     url: '/videos/elevators.mp4',
//     thumbnail: '/images/elevators_thumb.jpg'
//   },
//   { 
//     id: 4, 
//     name: 'Portals', 
//     description: 'Аркадный шутер с лифтами и телепортами', 
//     actionText: 'TELEPORT',
//     url: '/videos/portals.mp4',
//     thumbnail: '/images/portals_thumb.jpg'
//   }
])

const hoveredVideo = ref<number | null>(null);
const currentVideoUrl = ref<string | null>(null);

const playVideo = (url: string) => {
  currentVideoUrl.value = url;
}

const closePlayer = () => {
  currentVideoUrl.value = null;
}
</script>

<template>
  <section class="arena-section">
    <h2 class="section-title">:: VR ARENA'S EXCLUSIVE GAMES ::</h2>
    
    <div class="section-header">
      <h3 class="section-subtitle">VR-арена</h3>
      <p class="section-description">Игры собственной разработки со свободным перемещением для компаний до 10 человек</p>
    </div>

    <div class="videos-grid">
      <div 
        v-for="video in videos" 
        :key="video.id"
        class="video-card"
        @mouseenter="hoveredVideo = video.id"
        @mouseleave="hoveredVideo = null"
        @click="playVideo(video.url)"
      >
        <div class="card-video">
          <div class="video-placeholder">
            <img :src="video.thumbnail" class="video-thumbnail" alt="" />
            <div class="play-icon">▶</div>
          </div>
        </div>
        
        <div class="card-info">
          <h3 class="video-title">{{ video.name }}</h3>
          <p class="video-description">{{ video.description }}</p>
        </div>
        
        <div 
          class="video-overlay"
          :class="{ active: hoveredVideo === video.id }"
          @click.stop="playVideo(video.url)"
        >
          <div class="overlay-content">
            <span class="action-text">{{ video.actionText }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно плеера -->
    <div v-if="currentVideoUrl" class="video-modal" @click="closePlayer">
      <div class="video-modal-content" @click.stop>
        <button class="close-button" @click="closePlayer">✕</button>
        <VideoPlayer
          class="video-player-box"
          :options="{
            sources: [{
              src: currentVideoUrl,
              type: 'video/mp4',
            }],
            controls: true,
            responsive: true,
            fluid: true,
            playsinline: true,
            autoplay: true,
          }"
        />
      </div>
    </div>
  </section>
</template>


<style scoped>
.arena-section {
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-description {
  font-size: 1rem;
  color: var(--text-secondary);
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.video-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--bg-accent);
}

.video-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px var(--glow);
  border-color: var(--accent);
}

.card-video {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.video-card:hover .video-thumbnail {
  opacity: 0.5;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: var(--accent);
  opacity: 0.7;
  transition: all 0.3s ease;
  pointer-events: none;
}

.video-card:hover .play-icon {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}

.card-info {
  padding: 1.5rem;
}

.video-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.video-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.4s;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(5px);
}

.video-overlay.active {
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

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--accent), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
}

/* Стили для модального окна плеера */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.video-modal-content {
  position: relative;
  width: 100%;
  max-width: 1200px;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
}

.close-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px var(--glow);
}

.video-player-box {
  width: 100%;
  height: auto;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
  
  .action-text {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .video-modal {
    padding: 1rem;
  }
}
</style>