<!-- Gallery.vue -->
<script setup lang="ts">
const images = Array.from({ length: 9 }, (_, i) => ({
  src: `/src/assets/images/gallery/arena-${i + 1}.jpg`,
  alt: `Фото арены ${i + 1}`
}))
</script>

<template>
  <section class="gallery-section">
    <h2 class="section-title">// GALLERY //</h2>
    
    <div class="gallery-grid">
      <div 
        v-for="(img, index) in images" 
        :key="index"
        class="gallery-item"
        :style="`--delay: ${index * 0.1}s`"
      >
        <div class="image-wrapper">
          <img :src="img.src" :alt="img.alt" />
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
</style>