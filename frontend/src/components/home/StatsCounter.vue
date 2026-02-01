<!-- src/components/home/StatsCounter.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Stat {
  label: string
  target: number
  current: number
  suffix: string
  decimals?: number
}

const stats = ref<Stat[]>([
  { label: 'довольных игроков', target: 100, current: 0, suffix: '+' },
  { label: 'квадратных метров арены', target: 200, current: 0, suffix: ' м²' },
  { label: 'игр в каталоге', target: 48+4, current: 0, suffix: '' },
  { label: 'средний рейтинг', target: 4.75, current: 0, suffix: '/5.0', decimals: 1 },
])

const animate = (stat: Stat) => {
  const duration = 2000
  const start = performance.now()
  
  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - start) / duration, 1)
    const rawValue = progress * stat.target
    
    // Для рейтинга используем 1 знак после запятой, для остальных — целые числа
    if (stat.decimals !== undefined) {
      const factor = Math.pow(10, stat.decimals)
      stat.current = Math.round(rawValue * factor) / factor
    } else {
      stat.current = Math.floor(rawValue)
    }
    
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  
  requestAnimationFrame(step)
}

onMounted(() => {
  stats.value.forEach((stat, index) => {
    setTimeout(() => animate(stat), index * 200)
  })
})
</script>

<template>
  <section class="stats-section">
    <div class="stats-container">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-item"
        :style="`--delay: ${index * 0.1}s`"
      >
        <div class="stat-number">
          {{ stat.current }}{{ stat.suffix }}
        </div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 5rem 2rem;
  background: linear-gradient(
    180deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 50%,
    var(--bg-primary) 100%
  );
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  animation: fadeInUp 0.6s forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--accent);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px var(--glow);
}

.stat-label {
  color: var(--text-secondary);
  font-size: 1rem;
}
</style>