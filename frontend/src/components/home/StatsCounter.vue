<!-- src/components/home/StatsCounter.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stats = ref([
  { label: 'довольных игроков', target: 1247, current: 0, suffix: '+' },
  { label: 'квадратных метров арены', target: 500, current: 0, suffix: ' м²' },
  { label: 'игр в каталоге', target: 52, current: 0, suffix: '' },
  { label: 'средний рейтинг', target: 49, current: 0, suffix: '/5.0' }
])

const animate = (stat: typeof stats.value[0]) => {
  const duration = 2000
  const start = performance.now()
  const startValue = 0
  
  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - start) / duration, 1)
    stat.current = Math.floor(progress * stat.target)
    
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