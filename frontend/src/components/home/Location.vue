<!-- src/components/home/Location.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { glitchText } from '@/src/composables/glitchEffects'

const address = ref({
  street: 'пр. Ленина, д. 46. ТЦ КрейсеR',
  city: 'г. Владимир',
  bus_station: 'ул. Пугачёва (3 мин пешком)'
})

const coordinates = ref({
  lat: 56.11858,
  lng: 40.35232
})

const work_time = ref({
    from: "10:00",
    to: "22:00"
})

const displayTitle = ref('LOCATION')
const titleRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && displayTitle.value === 'LOCATION') {
        setTimeout(() => {
          glitchText('РАСПОЛОЖЕНИЕ', isAnimating, displayTitle, 1200)
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
  <section class="location-section">
    <h2 ref="titleRef" class="section-title glitch-title" :class="{ 'glitching': isAnimating }">
      // {{ displayTitle }} //
    </h2>
    
    <div class="location-container">
      <!-- Фото места -->
      <div class="location-photo">
        <img src="@/assets/images/location/arena-exterior.jpg" alt="VR Arena exterior" />
        <div class="photo-overlay"></div>
      </div>
      
      <!-- Информация -->
      <div class="location-info">
        <div class="info-block">
          <span class="info-label">АДРЕС:</span>
          <p class="info-text">{{ address.city }}, {{ address.street }}</p>
        </div>
        
        <div class="info-block">
          <span class="info-label">ОСТАНОВКА:</span>
          <p class="info-text">{{ address.bus_station }}</p>
        </div>

        <div class="info-block">
          <span class="info-label">РАБОТАЕМ:</span>
          <p class="info-text">Ежедневно с {{ work_time.from }} до {{ work_time.to }}</p>
        </div>
        
        <div class="info-block">
          <span class="info-label">КООРДИНАТЫ:</span>
          <p class="info-text">{{ coordinates.lat }}° N, {{ coordinates.lng }}° E</p>
        </div>
        
        <div class="map-buttons">
          <a 
            href="https://yandex.com/maps/-/CLhS6CIs"
            target="_blank"
            class="map-btn yandex"
          >
            <span class="btn-icon">🗺</span>
            Яндекс.Карты
          </a>
          
          <a 
            href="https://2gis.ru/vladimir/firm/70000001106127750?m=40.352658%2C56.118612%2F16"
            target="_blank"
            class="map-btn gis"
          >
            <span class="btn-icon">📍</span>
            2ГИС
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.location-section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.location-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.location-photo {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/10;
}

.location-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.location-photo:hover img {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--accent) 0%,
    transparent 50%,
    var(--glow) 100%
  );
  opacity: 0.1;
  mix-blend-mode: screen;
}

.location-info {
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--bg-accent);
}

.info-block {
  margin-bottom: 1.5rem;
}

.info-label {
  font-family: 'Courier New', monospace;
  color: var(--accent);
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.3rem;
}

.info-text {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin: 0;
}

.map-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.map-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--bg-accent);
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.map-btn:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 5px 20px var(--glow);
}

.map-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 0;
}

.map-btn:hover::before {
  opacity: 0.1;
}

.btn-icon {
  position: relative;
  z-index: 1;
  font-size: 1.2rem;
}

.map-btn span:last-child {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .location-container {
    grid-template-columns: 1fr;
  }
  
  .map-buttons {
    flex-direction: column;
  }
}
</style>