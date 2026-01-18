<!-- SmartGallery.vue -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  images: Array<{ src: string; alt: string }>
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ""
})

function isPrime(num: number): boolean {
  if (num < 2) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

function computeWH(num: number): [number, number] {
    if (num < 1) return [0, 0]; // Если число меньше 1, возвращаем (0, 0)

    const sqrtNum = Math.sqrt(num);
    let w: number;
    let h: number;

    if (isPrime(num)) {
        w = Math.max(1, Math.floor(sqrtNum));
        h = Math.ceil(num / w);
    } else {
        // Находим максимальный делитель <= sqrt(num)
        w = Math.min(5, Math.floor(sqrtNum));
        while (num % w !== 0 && w > 1) {
            w--; // уменьшаем w до тех пор, пока не найдем делитель
        }
        h = Math.floor(num / w);
    }

    if ((w <= 5) && (w < h)) {
      return [h, w];
    }

    return [w, h];
}

const layout = computed(() => {
  const total = props.images.length
  const title = props.title

  const wh = computeWH(total);
  const ratio = wh[0] / wh[1]
  const isHighAspectRatio = ratio > 3 || ratio < 0.3
  const isPrimeNumber = isPrime(total)
  
  const cols = wh[0]
  const remainder = total % cols
  
  console.log(total, cols, remainder)

  return {
    cols,
    remainder,
    shouldCenter: isHighAspectRatio || isPrimeNumber || ((wh[0] * wh[1]) != total)
  }
})

function getItemStyle(index: number) {
  const { cols, remainder, shouldCenter } = layout.value
  const isInLastRow = index >= props.images.length - remainder
  
  let gridColumn = undefined
  if (shouldCenter && isInLastRow && remainder > 0) {
    const startCol = Math.floor((cols - remainder) / 2) + 1
    const positionInRow = index - (props.images.length - remainder)
    gridColumn = `${startCol + positionInRow} / span 1`
  }
  
  return {
    '--delay': `${index * 0.1}s`,
    'grid-column': gridColumn,
    'justify-self': shouldCenter && isInLastRow ? 'center' : undefined
  }
}

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${layout.value.cols}, minmax(250px, 1fr))`
}))
</script>

<template>
  <section class="gallery-section">
    <h2 class="section-title">// {{ title }} //</h2>
    
    <div 
      class="gallery-grid" 
      :style="gridStyle"
    >
      <div 
        v-for="(img, index) in images" 
        :key="img.src"
        class="gallery-item"
        :style="getItemStyle(index)"
      >
        <div class="image-wrapper">
          <img :src="img.src" :alt="img.alt" loading="lazy" />
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
}

.gallery-grid {
  display: grid;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 16/9;
  transform: translateY(20px);
  opacity: 0;
  animation: slideIn 0.6s forwards;
  animation-delay: var(--delay);
}

@keyframes slideIn {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
  filter: grayscale(30%) contrast(1.1);
}

.image-wrapper:hover img {
  transform: scale(1.1);
  filter: grayscale(0%) contrast(1.2);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    var(--glow) 0%,
    transparent 50%,
    var(--glow) 100%
  );
  opacity: 0;
  transition: opacity 0.5s;
  mix-blend-mode: screen;
}

.image-wrapper:hover .image-overlay {
  opacity: 0.3;
}

.section-title {
  font-size: 2.5rem;
  color: var(--accent);
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Courier New', monospace;
}
</style>