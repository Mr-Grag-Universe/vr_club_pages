<!-- GiftCertificate.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { glitchText } from '@/composables/glitchEffects'

interface Props {
  title?: {ru: string, en: string}
  description?: string
  imageSrc?: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  title:  () => ({ ru: '', en: '' }),
  description: 'Сертификат можно приобрести на любую сумму и закрыть любые услуги клуба: полностью или частично.',
  imageSrc: '/src/assets/images/gift-cards/gift-card-pack.jpg',
  alt: 'Gift Certificate'
})

const displayTitle = ref(props.title["en"])
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

onMounted(() => {
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
})
</script>

<template>
  <section class="certificate-section">
    <h2 ref="titleRef" class="section-title glitch-title" :class="{ 'glitching': isAnimating }">
      // {{ displayTitle }} //
    </h2>
    <div class="certificate-container">
      <!-- Левая колонка: текст -->
      <div class="text-column">
        <h2>ПОДАРИТЕ БИЛЕТ В МУЛЬТИВСЕЛЕННУЮ</h2>
        <p class="section-description">
          {{ description }}
        </p>
      </div>
      
      <!-- Правая колонка: изображение -->
      <div class="image-column">
        <div class="image-wrapper">
          <div class="glow-effect"></div>
          <img :src="imageSrc" :alt="alt" loading="lazy" class="certificate-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certificate-section {
  padding: 6rem 3rem;
  background: var(--bg-secondary);
  overflow: hidden;
}

.certificate-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
}

.text-column {
  /* text-align: center; */
  margin: 0;
  padding-top: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 500px;
}

.image-column {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 3rem;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3/4;
  transform: translateY(20px);
  opacity: 0;
  animation: slideIn 0.8s forwards;
  animation-delay: 0.2s;
}

@keyframes slideIn {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Пульсирующее неоновое свечение */
.glow-effect {
  position: absolute;
  inset: -10px;
  background: radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%);
  border-radius: 20px;
  filter: blur(20px);
  animation: pulse 3s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

/* Анимация шиммера */
.image-wrapper::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  /* background: linear-gradient(
    45deg,
    transparent 30%,
    var(--glow) 50%,
    transparent 70%
  ); */
  background: repeating-linear-gradient(45deg, transparent 3rem, var(--glow) 3rem, transparent 6rem);
  background-size: 300% 100%;
  border-radius: 14px;
  animation: shimmer 10s linear infinite;
  z-index: 1;
  opacity: 0.5;
}

@keyframes shimmer {
  0% {
    background-position: 0% 0%;
  }
  100% {
		background-position: 50% 0%;
	}
}

.certificate-image {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 2;
  /* Статичное изображение - без transform */
}

/* Легкое парение */
.certificate-image {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .certificate-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .text-column {
    text-align: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-description {
    max-width: 100%;
  }

  .image-column {
    margin-right: 0; /* Reset margin on smaller screens */
  }
  
  .image-wrapper {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>