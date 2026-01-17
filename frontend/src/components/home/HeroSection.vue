<!-- HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => isLoaded.value = true, 100)
})
</script>

<template>
  <section class="hero">
    <div class="hero-bg" :class="{ loaded: isLoaded }">
      <!-- <img src="@/assets/images/hero-bg.jpg" alt="VR Arena" /> -->
      <div class="scanline"></div>
    </div>
    
    <div class="hero-content">
      <h1 class="glitch" data-text="VR ARENA">
        VR ARENA
      </h1>
      <p class="subtitle">Переступи грань реальности</p>
      
      <div class="stats">
        <div class="stat">
          <span class="number">500+</span>
          <span class="label">кв.м арены</span>
        </div>
        <div class="stat">
          <span class="number">50+</span>
          <span class="label">игр</span>
        </div>
        <div class="stat">
          <span class="number">4.9</span>
          <span class="label">рейтинг</span>
        </div>
      </div>
      
      <button class="cta-button">
        <span>Забронировать сеанс</span>
        <div class="ripple"></div>
      </button>
    </div>
    
    <!-- Креатив: плавающие голограммы -->
    <div class="holograms">
      <div class="holo-item" v-for="i in 3" :key="i">
        <img :src="`/src/assets/images/games/game-${i}.png`" alt="" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  filter: grayscale(50%) brightness(0.4);
  transition: filter 2s ease;
}

.hero-bg.loaded {
  filter: grayscale(0%) brightness(0.6);
}

.scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    var(--accent) 2px,
    var(--accent) 4px
  );
  opacity: 0.1;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.glitch {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 900;
  position: relative;
  color: var(--text-primary);
  animation: glitch 4s infinite;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.glitch::before {
  animation: glitch-1 0.5s infinite;
  color: var(--accent);
  z-index: -1;
}

.glitch::after {
  animation: glitch-2 0.5s infinite;
  color: var(--glow);
  z-index: -2;
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, 2px); }
  40% { transform: translate(2px, -2px); }
}

.holograms {
  position: absolute;
  bottom: -50px;
  right: 10%;
  display: flex;
  gap: 2rem;
}

.holo-item {
  width: 120px;
  height: 120px;
  transform: perspective(500px) rotateX(45deg);
  animation: float 3s ease-in-out infinite;
}

.holo-item:nth-child(2) { animation-delay: -1s; }
.holo-item:nth-child(3) { animation-delay: -2s; }

@keyframes float {
  0%, 100% { transform: perspective(500px) rotateX(45deg) translateY(0); }
  50% { transform: perspective(500px) rotateX(45deg) translateY(-20px); }
}
</style>