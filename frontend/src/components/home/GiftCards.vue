<!-- GiftCertificate.vue -->
<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  imageSrc?: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '// Gift Cards //',
  description: 'Сертификат можно приобрести на любую сумму и закрыть любые услуги клуба: полностью или частично.',
  imageSrc: '/src/assets/images/gift-cards/gift-card-pack.jpg',
  alt: 'Gift Certificate'
})
</script>

<template>
  <section class="certificate-section">
    <h2 class="section-title">{{ title }}</h2>
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
  padding: 5rem 2rem;
  background: var(--bg-secondary);
  overflow: hidden;
}

.certificate-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.text-column {
  text-align: left;
}

.section-title {
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1.2;
}

.section-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 500px;
}

.image-column {
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: linear-gradient(
    45deg,
    transparent 30%,
    var(--glow) 50%,
    transparent 70%
  );
  background-size: 200% 200%;
  border-radius: 14px;
  animation: shimmer 4s linear infinite;
  z-index: 1;
  opacity: 0.5;
}

@keyframes shimmer {
  0% {
    background-position: -200% -200%;
  }
  100% {
    background-position: 200% 200%;
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
  
  .image-wrapper {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>