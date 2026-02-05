<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import type { ArenaGame } from '@/src/composables/configs/arenaGames'

const props = defineProps<{
  game: ArenaGame | null
}>()

const emit = defineEmits<{
  close: []
}>()

// Состояние галереи: 'video' или индекс скриншота
const activeMedia = ref<'video' | number>('video')

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.game, (newGame) => {
  if (!newGame) {
    activeMedia.value = 'video'
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Получаем URL активного медиа
const activeMediaUrl = computed(() => {
  if (!props.game) return ''
  if (activeMedia.value === 'video') return props.game.videoUrl
  return props.game.screenshots[activeMedia.value] || ''
})

// Проверка активности
const isVideoActive = computed(() => activeMedia.value === 'video')
const isScreenshotActive = (idx: number) => activeMedia.value === idx
</script>

<template>
  <Transition name="expand">
    <div 
      v-if="game"
      class="arena-modal-overlay"
      @click.self="emit('close')"
    >
      <div 
        class="arena-modal"
        :style="{ '--game-color': game.color }"
      >
        <!-- Кнопка закрытия -->
        <button class="close-button" @click="emit('close')">
          <span>×</span>
        </button>

        <!-- Медиа секция -->
        <div class="modal-media-section">
          <!-- Основная область -->
          <div class="main-media">
            <!-- Видео (по умолчанию) -->
            <video 
              v-if="isVideoActive"
              autoplay muted loop playsinline
              class="modal-video"
            >
              <source :src="game.videoUrl" type="video/mp4">
            </video>
            
            <!-- Скриншот (когда выбран) -->
            <div 
              v-else
              class="modal-screenshot"
              :style="{ backgroundImage: `url(${activeMediaUrl})` }"
            ></div>
            
            <!-- Индикатор типа медиа -->
            <div class="media-badge">
              {{ isVideoActive ? '▶ VIDEO' : '🖼 SCREENSHOT' }}
            </div>
          </div>
          
          <!-- Галерея превью -->
          <div class="media-gallery">
            <!-- Кнопка видео -->
            <button 
              class="gallery-thumb"
              :class="{ active: isVideoActive }"
              @click="activeMedia = 'video'"
            >
              <video muted class="thumb-video">
                <source :src="game.videoUrl" type="video/mp4">
              </video>
              <div class="thumb-overlay">
                <span class="thumb-icon">▶</span>
              </div>
              <span class="thumb-label">Video</span>
            </button>
            
            <!-- Скриншоты -->
            <button 
              v-for="(screenshot, idx) in game.screenshots" 
              :key="idx"
              class="gallery-thumb"
              :class="{ active: isScreenshotActive(idx) }"
              @click="activeMedia = idx"
            >
              <div 
                class="thumb-image"
                :style="{ backgroundImage: `url(${screenshot})` }"
              ></div>
              <span class="thumb-label">Shot {{ idx + 1 }}</span>
            </button>
          </div>
        </div>

        <!-- Инфо секция -->
        <div class="modal-info-section">
          <div class="modal-header">
            <h2 class="modal-title">{{ game.name }}</h2>
            <span class="modal-genre">{{ game.genre }}</span>
          </div>

          <p class="modal-description">{{ game.description }}</p>

          <div class="features-grid">
            <h4>Особенности:</h4>
            <div class="features-list">
              <span 
                v-for="feature in game.features" 
                :key="feature" 
                class="feature-tag"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <div class="modal-actions">
            <a 
                href="https://metaforce.ru/vladimir/price"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button class="action-button primary">
                    Забронировать Arena
                </button>
            </a>
            <button class="action-button secondary" @click="emit('close')">
              Назад к играм
            </button>
          </div>
        </div>

        <!-- Декоративные линии -->
        <div class="scan-lines"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.arena-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
}

.arena-modal {
  position: relative;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  background: var(--bg-secondary);
  border-radius: 24px;
  border: 2px solid var(--game-color);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  overflow: hidden;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 100px rgba(var(--game-color), 0.2);
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--game-color);
  color: var(--game-color);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-button:hover {
  background: var(--game-color);
  color: var(--bg-primary);
  transform: rotate(90deg);
}

.modal-media-section {
  position: relative;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
}

/* Основная область медиа */
.main-media {
  position: relative;
  flex: 1;
  min-height: 350px;
  background: var(--bg-secondary);
  overflow: hidden;
}

.modal-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-screenshot {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--bg-secondary);
}

.media-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--game-color);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--game-color);
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(4px);
}

/* Галерея превью */
.media-gallery {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--bg-accent);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--game-color) var(--bg-accent);
}

.media-gallery::-webkit-scrollbar {
  height: 6px;
}

.media-gallery::-webkit-scrollbar-track {
  background: var(--bg-accent);
  border-radius: 3px;
}

.media-gallery::-webkit-scrollbar-thumb {
  background: var(--game-color);
  border-radius: 3px;
}

.gallery-thumb {
  position: relative;
  flex: 0 0 auto;
  width: 100px;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--bg-accent);
  background: var(--bg-primary);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.gallery-thumb:hover {
  border-color: var(--game-color);
  transform: translateY(-2px);
}

.gallery-thumb.active {
  border-color: var(--game-color);
  box-shadow: 0 0 0 2px var(--game-color), 0 4px 12px rgba(0,0,0,0.3);
}

.thumb-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.thumb-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.gallery-thumb:hover .thumb-image,
.gallery-thumb.active .thumb-image,
.gallery-thumb:hover .thumb-video,
.gallery-thumb.active .thumb-video {
  opacity: 1;
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.thumb-icon {
  font-size: 1.5rem;
  color: white;
  opacity: 0.8;
}

.thumb-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem;
  background: rgba(0, 0, 0, 0.7);
  color: var(--text-secondary);
  font-size: 0.65rem;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.gallery-thumb.active .thumb-label {
  color: var(--game-color);
  font-weight: 700;
}

/* Инфо секция */
.modal-info-section {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.modal-header {
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.modal-genre {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: var(--game-color);
  color: var(--bg-primary);
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
}

.modal-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.features-grid h4 {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.feature-tag {
  padding: 0.6rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
  transition: all 0.3s;
}

.feature-tag:hover {
  border-color: var(--game-color);
  background: rgba(var(--game-color), 0.1);
}

.modal-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-button {
  padding: 1.25rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.action-button.primary {
  background: var(--game-color);
  color: var(--bg-primary);
  box-shadow: 0 10px 30px rgba(var(--game-color), 0.3);
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(var(--game-color), 0.4);
}

.action-button.secondary {
  background: transparent;
  border-color: var(--bg-accent);
  color: var(--text-secondary);
}

.action-button.secondary:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.scan-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  opacity: 0.5;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.expand-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.expand-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 1024px) {
  .arena-modal {
    grid-template-columns: 1fr;
    max-height: 95vh;
  }
  
  .main-media {
    min-height: 250px;
  }
  
  .modal-title {
    font-size: 2rem;
  }
  
  .modal-info-section {
    padding: 2rem;
  }
}

@media (max-width: 640px) {
  .arena-modal-overlay {
    padding: 0;
  }
  
  .arena-modal {
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
  }
  
  .main-media {
    min-height: 200px;
  }
  
  .gallery-thumb {
    width: 80px;
    height: 60px;
  }
  
  .modal-actions {
    position: sticky;
    bottom: 0;
    background: var(--bg-secondary);
    padding: 1rem 0;
    margin: 0 -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>