<script setup lang="ts">
import { ref } from 'vue'
import SocialLinks from './SocialLinks.vue'
import metaforceLogo from '@/assets/icons/metaforce.svg'

const isMobileMenuOpen = ref(false)
const showNotification = ref(false)
const notificationMessage = ref('Номер скопирован!')

const phoneNumber = '+79028877457'

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const copyPhoneNumber = async (e: Event) => {
  e.preventDefault()
  
  try {
    await navigator.clipboard.writeText(phoneNumber)
    notificationMessage.value = 'Номер скопирован!'
    showToast()
  } catch (err) {
    notificationMessage.value = 'Ошибка копирования'
    showToast()
  }
}

const showToast = () => {
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 2000)
}
</script>

<template>
  <header class="header">
    <div class="header-glitch"></div>
    
    <nav class="nav">
      <!-- Десктопное меню -->
      <div class="nav-left desktop-menu">
        <div class="logo-wrapper">
            <a href="/" class="logo glitch" data-text="VR ARENA">
                VR ARENA
            </a>
            <img :src="metaforceLogo" alt="Metaforce" class="metaforce-logo" />
        </div>
        
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#events" class="nav-link">Мероприятия</a>
          </li>
          <li class="nav-item">
            <a href="https://metaforce.ru/vladimir/price" class="nav-link">Цены</a>
          </li>
          <li class="nav-item">
            <a href="#games" class="nav-link">Игры</a>
          </li>
          <li class="nav-item">
            <a href="#faq" class="nav-link">FAQ</a>
          </li>
        </ul>
      </div>
      
      <div class="nav-right desktop-menu">
        <SocialLinks />
        
        <div class="cta-wrapper">
            <a href="https://metaforce.ru/vladimir">
              <button class="cta-button pulse">
                  <span class="cta-text">Забронировать</span>
              </button>
              <div class="cta-glow"></div>
            </a>
        </div>
        
        <div class="header-phone">
          <a href="tel:+79028877457" class="phone-link" @click="copyPhoneNumber">
            +7 (902) 887-74-57
          </a>
        </div>
      </div>
      
      <!-- Мобильное меню кнопка -->
      <button 
        class="mobile-menu-toggle" 
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        <svg class="hamburger-icon" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="12" rx="6" fill="currentColor"/>
          <rect y="34" width="100" height="12" rx="6" fill="currentColor"/>
          <rect y="68" width="100" height="12" rx="6" fill="currentColor"/>
        </svg>
      </button>
    </nav>
    
    <!-- Мобильное меню -->
    <transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-content">
          <ul class="mobile-nav-menu">
            <li class="mobile-nav-item">
              <a href="#events" class="mobile-nav-link" @click="closeMobileMenu">Мероприятия</a>
            </li>
            <li class="mobile-nav-item">
              <a href="https://metaforce.ru/vladimir/price" class="mobile-nav-link" @click="closeMobileMenu">Цены</a>
            </li>
            <li class="mobile-nav-item">
              <a href="#games" class="mobile-nav-link" @click="closeMobileMenu">Игры</a>
            </li>
            <li class="mobile-nav-item">
              <a href="#faq" class="mobile-nav-link" @click="closeMobileMenu">FAQ</a>
            </li>
          </ul>
          
          <div class="mobile-cta-section">
            <a href="https://metaforce.ru/vladimir" class="mobile-cta-button">
              Забронировать
            </a>
            <a href="tel:+79028877457" class="mobile-phone-link" @click="copyPhoneNumber">
              +7 (902) 887-74-57
            </a>
            <SocialLinks class="mobile-social-links" />
          </div>
        </div>
      </div>
    </transition>
    
    <div class="scanline"></div>
  </header>

  <!-- Всплывающее уведомление -->
  <transition name="fade">
    <div v-if="showNotification" class="notification-toast">
      {{ notificationMessage }}
    </div>
  </transition>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(13, 6, 67, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(173, 240, 98, 0.2);
  padding: 1rem 0;
}

.header-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: glitch-line 3s infinite;
}

@keyframes glitch-line {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.nav {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;
  max-width: none;
  width: 100%;
  flex-wrap: wrap;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--text-primary);
  text-decoration: none;
  position: relative;
  letter-spacing: 1px;
}

.logo.glitch::before,
.logo.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.logo.glitch::before {
  animation: glitch-1 0.5s infinite;
  color: var(--accent);
  z-index: -1;
}

.logo.glitch::after {
  animation: glitch-2 0.5s infinite;
  color: var(--glow);
  z-index: -2;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  color: var(--accent);
  text-shadow: 0 0 10px var(--glow);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.cta-wrapper {
  position: relative;
  padding: 15px 0;
  margin: -15px 0;
  z-index: 1;
  max-width: 150px;
}

.cta-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, var(--accent) 0%, var(--glow) 100%);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px var(--glow);
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 100%;
  background: radial-gradient(rectangle, rgba(173, 240, 98, 0.3) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
  pointer-events: none;
}

.cta-wrapper:hover .cta-glow {
  opacity: 1;
}

.cta-button:hover .cta-glow {
  opacity: 1;
}

.header-phone {
  position: relative;
  border-left: 1px solid rgba(173, 240, 98, 0.2);
  padding-left: 1.5rem;
  z-index: 2;
}

.header-phone::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130%;
  height: 130%;
  background: radial-gradient(circle, rgba(173, 240, 98, 0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
  pointer-events: none;
}

.header-phone:hover::before {
  opacity: 1;
}

.phone-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: color 0.3s, transform 0.3s;
  display: inline-block;
  cursor: pointer;
}

.phone-link:hover {
  transform: translateY(-2px);
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.metaforce-logo {
  width: 80px;
  height: auto;
  opacity: 0.6;
  transition: opacity 0.3s, filter 0.3s, transform 0.3s;
  filter: brightness(0) saturate(100%) invert(76%) sepia(40%) saturate(545%) hue-rotate(36deg) brightness(99%) contrast(91%);
}

.metaforce-logo:hover {
  opacity: 1;
  transform: translateY(-2px);
  filter: brightness(0) saturate(100%) invert(76%) sepia(40%) saturate(545%) hue-rotate(36deg) brightness(120%) contrast(91%);
}

/* Мобильное меню */
.mobile-menu-toggle {
  display: block;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  margin-left: auto;
  width: auto;
}

.hamburger-icon {
  width: 32px;
  height: 24px;
  color: var(--text-primary);
  transition: color 0.3s;
}

.mobile-menu-toggle:hover .hamburger-icon {
  color: var(--accent);
}

/* Анимация для мобильного меню */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  width: auto;
  max-width: none;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--bg-accent);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.mobile-menu-content {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.mobile-nav-menu {
  list-style: none;
  margin: 0 0 2rem 0;
  padding: 0;
}

.mobile-nav-item {
  margin-bottom: 0.75rem;
}

.mobile-nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: block;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--bg-accent);
  transition: color 0.3s;
  text-align: center;
}

.mobile-nav-link:hover {
  color: var(--accent);
}

.mobile-cta-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.mobile-cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--accent) 0%, var(--glow) 100%);
  color: #000;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s;
  text-align: center;
  width: auto;
  max-width: 300px;
}

.mobile-cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px var(--glow);
}

.mobile-phone-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
}

.mobile-social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

/* Адаптивность */
@media (max-width: 600px) {
  .nav {
    padding: 0 1rem;
  }
  
  .desktop-menu {
    display: none !important;
  }
  
  .mobile-menu-toggle {
    display: block !important;
  }
  
  .nav-left {
    gap: 1rem;
  }
  
  .logo {
    font-size: 1.4rem;
  }
  
  .metaforce-logo {
    width: 60px;
  }
}

@media (min-width: 600px) {
  .mobile-menu {
    display: none;
  }
  .mobile-menu-toggle {
    display: none;
  }
}

.scanline {
  animation: scan-h 8s linear infinite;
  opacity: 0.4;
  filter: blur(1px);
}

@keyframes scan-h {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 480px) {
  .header {
    padding: 0.75rem 0;
  }
  
  .mobile-menu-content {
    padding: 1.5rem;
  }
  
  .mobile-cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
}

/* Всплывающее уведомление */
.notification-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(13, 6, 67, 0.95);
  backdrop-filter: blur(10px);
  color: var(--accent);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: 1px solid var(--accent);
  box-shadow: 0 4px 20px rgba(173, 240, 98, 0.3);
  z-index: 2000;
  font-weight: 500;
  font-size: 0.9rem;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>