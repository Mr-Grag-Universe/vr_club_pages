<!-- src/components/home/Events.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const events = ref([
  { 
    id: 1, 
    name: 'Детские дни рождения', 
    description: 'Подарите ребенку праздник, который он запомнит надолго', 
    image: '/src/assets/images/events/birthday_child.jpg',
    actionText: 'CELEBRATE',
    url: 'https://metaforce.ru/vladimir/birthday_kids'
  },
  { 
    id: 2, 
    name: 'Выпускной', 
    description: 'Много детей - много радости', 
    image: '/src/assets/images/events/graduate.jpg',
    actionText: 'GRADUATE',
    url: 'https://metaforce.ru/vladimir/graduation'
  },
  { 
    id: 3, 
    name: 'Взрослые дни рождения', 
    description: 'Поиграли - и можно по барам', 
    image: '/src/assets/images/events/birthday_adult.jpg',
    actionText: 'PARTY',
    url: 'https://metaforce.ru/vladimir/birthday_adult'
  },
  { 
    id: 4, 
    name: 'Корпоративы', 
    description: 'Когда у вас еще будет шанс пострелять в коллег', 
    image: '/src/assets/images/events/coops.jpg',
    actionText: 'TEAM UP',
    url: 'https://metaforce.ru/vladimir/corp_party'
  }
])

const hoveredEvent = ref<number | null>(null)
</script>

<template>
  <section class="events-section" id="events">
    <h2 class="section-title">:: WHAT WE CAN CELEBRATE ::</h2>
    
    <p class="description">Праздничные события на VR-арене для любой компании</p>

    <div class="events-grid">
      <div 
        v-for="event in events" 
        :key="event.id"
        class="event-card"
        @mouseenter="hoveredEvent = event.id"
        @mouseleave="hoveredEvent = null"
      >
        <div class="card-image">
          <img :src="event.image" :alt="event.name" />
        </div>
        
        <div class="card-info">
          <h3 class="event-title">{{ event.name }}</h3>
          <p class="event-description">{{ event.description }}</p>
        </div>

        <!-- Оверлей с действием -->
        <a 
          :href="event.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="event-overlay"
          :class="{ active: hoveredEvent === event.id }"
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
            <span class="action-text">{{ event.actionText }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events-section {
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.event-card {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--bg-accent);
}

.event-card:hover {
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

.event-card:hover .card-image img {
  transform: scale(1.1);
}

.card-info {
  padding: 1.5rem;
}

.event-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.event-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Оверлей с эффектом взлома */
.event-overlay {
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

.event-overlay.active {
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

.description {
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .action-text {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>