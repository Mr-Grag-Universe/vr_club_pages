<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Component } from 'vue'
import Header from '@/components/base/Header.vue'
import Footer from '@/components/base/Footer.vue'
import BookingModal from '@/components/prices/BookingModal.vue'
import Events from '@/components/prices/Events.vue'
import VrArenaTab from '@/components/prices/VrArenaTab.vue'
import VrZonesTab from '@/components/prices/VrZonesTab.vue'

interface Tab {
  id: string
  label: string
  component: Component // Правильный тип для :is
}

const tabs: Tab[] = [
    { id: 'vr-arena', label: 'VR-арена', component: VrArenaTab },
    { id: 'vr-zones', label: 'VR-зоны', component: VrZonesTab },
    { id: 'event', label: 'Мероприятие', component: Events },
]

const activeTab = ref(tabs[0]?.id ?? '')
const modalOpen = ref(false)
const modalTitle = ref('')
const modalPrice = ref(0)

function openBooking(title: string, price: number) {
  modalTitle.value = title
  modalPrice.value = price
  modalOpen.value = true
}

function setActiveTab(tabId: string) {
  const exists = tabs.some(tab => tab.id === tabId)
  if (exists) {
    activeTab.value = tabId
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('price-card')) {
        entry.target.classList.add('animate-in')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  setTimeout(() => {
    document.querySelectorAll('.price-card').forEach(el => {
      observer.observe(el)
    })
  }, 100)
})
</script>

<template>
  <div id="app">
    <Header />
    
    <main class="price-page">
      <section class="hero-section">
        <h1 class="section-title">// ТАРИФЫ //</h1>
        <p class="section-subtitle">Выберите формат игры и забронируйте удобное время</p>
      </section>

      <div class="container">
        <nav v-if="tabs.length > 0" class="tabs-nav" role="tablist">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="setActiveTab(tab.id)"
            role="tab"
            :aria-selected="activeTab === tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>

        <div v-else class="no-tabs">
          <p class="no-tabs-text">Тарифы временно недоступны</p>
        </div>

        <!-- Ключевое исправление: -->
        <!-- 1. Используем v-if вместо v-show -->
        <!-- 2. Оборачиваем в template для правильного key -->
        <!-- 3. :is получает напрямую tab.component -->
        <div class="tab-content-wrapper">
          <template v-for="tab in tabs" :key="tab.id">
            <component 
              :is="tab.component" 
              v-if="activeTab === tab.id"
              @book="openBooking"
            />
          </template>
        </div>
      </div>
    </main>

    <BookingModal 
      v-model="modalOpen"
      :title="modalTitle"
      :price="modalPrice"
    />
    
    <Footer />
  </div>
</template>

<style scoped>
@import '@/assets/styles/price.css';

.hero-section {
  padding: 7rem 1rem 2rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.container {
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1rem 2rem 4rem;
}

.tab-content-wrapper {
  min-height: 400px;
}

.no-tabs {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--bg-accent);
}

.no-tabs-text {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.animate-in {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .tabs-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  
  .tabs-nav::-webkit-scrollbar {
    display: none;
  }
}
</style>