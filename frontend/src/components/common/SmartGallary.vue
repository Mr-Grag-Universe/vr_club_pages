<!-- SmartGallery.vue -->
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { glitchText } from '@/src/scripts/glitchEffects';
import AdaptiveImage from '@/src/components/common/AdaptiveImage.vue';

const imageWrapperRef = ref<HTMLElement | null>(null);
const imageWrapperWidth = ref(0);

const galleryGridRef = ref<HTMLElement | null>(null);
const gridItemWidth = ref(250); // Начальная ширина
const containerWidth = ref(0);
const windowWidth = ref(window.innerWidth);
const MIN_ITEM_WIDTH = 250;

interface GalleryImage {
  src: string;      // jpg fallback
  webpSrc?: string;
  avifSrc?: string;
  alt: string;
}

interface Props {
  images: GalleryImage[]
  title?: {ru: string, en: string}
}


const props = withDefaults(defineProps<Props>(), {
  title: () => ({ ru: '', en: '' })
})

console.log(props.images)

function isPrime(num: number): boolean {
  if (num < 2) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

function computeWH(num: number): [number, number] {
  if (num < 1) return [0, 0];

  const sqrtNum = Math.sqrt(num);
  let w: number;
  let h: number;

  if (isPrime(num)) {
    w = Math.max(1, Math.floor(sqrtNum));
    h = Math.ceil(num / w);
  } else {
    w = Math.min(5, Math.floor(sqrtNum));
    while (num % w !== 0 && w > 1) {
      w--;
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
  const wh = computeWH(total);
  const ratio = wh[0] / wh[1]
  const isHighAspectRatio = ratio > 3 || ratio < 0.3
  const isPrimeNumber = isPrime(total)
  
  const cols = wh[0]
  const remainder = total % cols
  
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
    // 'grid-column': gridColumn,
    // 'justify-self': shouldCenter && isInLastRow ? 'center' : undefined
  }
}

const gridStyle = computed(() => {
    // Рассчитываем требуемую ширину для всех колонок
    const requiredWidth = layout.value.cols * MIN_ITEM_WIDTH;
    // Добавляем отступы между колонками (1.5rem * (cols - 1))
    const gapWidth = (layout.value.cols - 1) * 24; // 1.5rem = 24px
    const totalRequiredWidth = requiredWidth + gapWidth;
    
    const shouldUseAutoFit = containerWidth.value < totalRequiredWidth;
    
    console.log('Grid decision:', {
        cols: layout.value.cols,
        containerWidth: containerWidth.value,
        requiredWidth: totalRequiredWidth,
        shouldUseAutoFit
    });

    return {
        gridTemplateColumns: shouldUseAutoFit
            ? `repeat(auto-fit, minmax(${MIN_ITEM_WIDTH}px, 1fr))`
            : `repeat(${layout.value.cols}, minmax(${MIN_ITEM_WIDTH}px, 1fr))`
    };
});

// Lightbox logic
const currentIndex = ref(-1)
const isLightboxOpen = computed(() => currentIndex.value >= 0)

function openLightbox(index: number) {
  currentIndex.value = index
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  currentIndex.value = -1
  document.body.style.overflow = ''
}

function next() {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return
  
  switch(e.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowRight':
      next()
      break
    case 'ArrowLeft':
      prev()
      break
  }
}

function handleOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    closeLightbox()
  }
}

const measureContainerWidth = async () => {
    // Ждём следующего тика, чтобы DOM обновился
    await nextTick();
    if (galleryGridRef.value) {
        const rect = galleryGridRef.value.getBoundingClientRect();
        containerWidth.value = rect.width;
        windowWidth.value = window.innerWidth;
    }
};

const updateImageWrapperSize = () => {
    if (imageWrapperRef.value) {
        imageWrapperWidth.value = imageWrapperRef.value.clientWidth;
    }
};

const handleResize = () => {
    measureContainerWidth();
};

const displayTitle = ref(props.title["en"])
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);
    
    // Инициализация после монтирования
    measureContainerWidth();
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && displayTitle.value === props.title["en"]) {
          setTimeout(() => {
            glitchText(props.title["ru"], isAnimating, displayTitle, 1200)
          }, 1800)
        }
      })
    }, { threshold: 0.5 })
    
    if (titleRef.value) {
      observer.observe(titleRef.value)
    }
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('resize', handleResize);
    document.body.style.overflow = '';
});

</script>

<template>
  <section class="gallery-section">
    <h2 ref="titleRef" class="section-title glitch-title" :class="{ 'glitching': isAnimating }">
      // {{ displayTitle }} //
    </h2>
    
    <div 
      class="gallery-grid" 
      :style="gridStyle"
      ref="galleryGridRef"
    >
      <div 
        v-for="(img, index) in images" 
        :key="img.src"
        class="gallery-item"
        :style="getItemStyle(index)"
        @click="openLightbox(index)"
      >
        <div class="image-wrapper">
          <!-- <img :src="img.src" :alt="img.alt" loading="lazy" /> -->
          <AdaptiveImage
            :jpg-src="img.src"
            :webp-src="img.webpSrc"
            :avif-src="img.avifSrc"
            :alt="img.alt"
            loading="lazy"
            class="gallery-img"
          />
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div 
        v-if="isLightboxOpen" 
        class="lightbox-overlay"
        @click="handleOverlayClick"
      >
        <button class="close-btn" @click="closeLightbox" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button 
          v-if="currentIndex > 0" 
          class="nav-btn prev-btn" 
          @click="prev"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button 
          v-if="currentIndex < images.length - 1" 
          class="nav-btn next-btn" 
          @click="next"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="lightbox-content">
          <img 
            :src="images[currentIndex]?.src" 
            :alt="images[currentIndex]?.alt"
            class="lightbox-image"
            @click.stop
          />
          <!-- <div v-if="images[currentIndex]?.alt" class="image-caption">
            {{ images[currentIndex]?.alt }}
          </div> -->
        </div>
      </div>
    </Transition>
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

.gallery-item {
  cursor: pointer;
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

  width: 100%;
  height: auto;
}


@keyframes slideIn {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.image-wrapper :deep(picture),
.image-wrapper :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
  filter: grayscale(30%) contrast(1.1);
}

.image-wrapper:hover :deep(picture),
.image-wrapper:hover :deep(img) {
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

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
}

.lightbox-content {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  max-width: 90%;
  max-height: 90%;
  cursor: default;
  position: relative;
}

.lightbox-image {
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 2rem;
}

.next-btn {
  right: 2rem;
}

.image-caption {
  position: absolute;
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.1rem;
  text-align: center;
  white-space: nowrap;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>