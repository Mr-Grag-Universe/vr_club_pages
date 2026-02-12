<!-- HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)
const typedText = ref('')
const subtitle = 'Переступи грань реальности'

onMounted(() => {
  setTimeout(() => isLoaded.value = true, 100)
  
  let i = 0
  const typeInterval = setInterval(() => {
    typedText.value += subtitle[i]
    i++
    if (i >= subtitle.length) clearInterval(typeInterval)
  }, 50)
})

// Новый эффект: световые частицы вместо странных кругов
const lightParticles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 4 + 6
}))
</script>

<template>
  <section class="hero">
    <div class="hero-bg" :class="{ loaded: isLoaded }">
      <!-- <img src="@/assets/images/hero-gpt.jpg" alt="VR Arena" /> -->
      <div class="scanline"></div>
      <div class="vignette"></div>
    </div>
    
    <!-- Контент слева для лучшей читаемости -->
    <div class="hero-content-left">
      <h1 class="glitch" data-text="VR ARENA">
        VR ARENA
      </h1>
      <p class="subtitle">{{ typedText }}<span class="cursor" v-show="typedText.length < subtitle.length"></span></p>
      
      <!-- Добавляем подложку для текста -->
      <div class="text-glow"></div>
      
      <a href="https://metaforce.ru/vladimir/price">
        <button class="cta-button">
          <span class="cta-text">Забронировать сеанс</span>
          <div class="button-particles"></div>
        </button>
      </a>
    </div>
    
    <!-- Новый эффект: световые частицы -->
    <div class="light-particles">
      <div 
        v-for="particle in lightParticles" 
        :key="particle.id"
        class="lparticle"
        :style="{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`
        }"
      ></div>
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
}

.hero-bg {
  position: absolute;
  inset: 0;
  filter: grayscale(30%) brightness(0.5) contrast(1.1);
  transition: filter 2.5s ease;
  background: url('@/assets/images/hero-gpt.jpg') no-repeat center center fixed;
  background-size: cover;
}

.hero-bg.loaded {
  filter: grayscale(0%) brightness(0.65) contrast(1.2);
}

.hero-bg img {
  display: none;
  /* width: 100%;
  height: 100%;
  object-fit: cover; */
}

@media (max-width: 980px) {
  .hero-bg {
    background-position: center top; /* Adjust position to keep focus */
  }
}

/* Vignette для затемнения краев */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(10, 10, 10, 0.5) 70%,
    rgba(10, 10, 10, 0.9) 100%
  );
  pointer-events: none;
}

/* Scanline эффект */
.scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    var(--accent) 3px,
    var(--accent) 5px
  );
  opacity: 0.12;
  animation: scan 6s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Контент слева */
.hero-content-left {
  position: relative;
  z-index: 10;
  max-width: 700px;
  margin-left: 5rem;
  padding: 3rem;
}

/* Glow-подложка для текста */
.text-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    var(--accent) 0%,
    transparent 70%
  );
  opacity: 0.05;
  z-index: -1;
  filter: blur(40px);
}

.glitch {
  font-size: clamp(3rem, 15vw, 7rem);
  font-weight: 900;
  position: relative;
  color: var(--text-primary);
  animation: glitch 5s infinite;
  letter-spacing: -2px;
  line-height: 0.9;
  margin-bottom: 1rem;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.glitch::before {
  animation: glitch-1 0.6s infinite;
  color: var(--accent);
  z-index: -1;
}

.glitch::after {
  animation: glitch-2 0.6s infinite;
  color: var(--glow);
  z-index: -2;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--text-primary);
  margin-top: 1rem;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

/* Курсор печати */
.cursor {
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background: var(--accent);
  margin-left: 4px;
  vertical-align: baseline;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
}

/* Кнопка с частицами */
.cta-button {
  margin-top: 3rem;
  padding: 1rem 3rem;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid var(--accent);
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 40px var(--glow);
  background: rgba(99, 102, 241, 0.2);
}

/* Световые частицы */
.light-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.lparticle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 10px var(--accent);
  animation: float-light linear infinite;
}

@keyframes float-light {
  0% {
    opacity: 0;
    transform: translateY(100vh) translateX(0);
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) translateX(50px);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero-content-left {
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 2rem;
    width: 100%;
  }
}
</style>