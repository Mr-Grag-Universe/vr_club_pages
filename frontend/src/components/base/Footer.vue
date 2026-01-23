<script setup lang="ts">
    import SocialLinks from './SocialLinks.vue'
    import { ref } from 'vue'

const showNotification = ref(false)
const notificationMessage = ref('Номер скопирован!')

const phoneNumber = '+79028877457'

const copyPhoneNumber = async (e: Event) => {
  e.preventDefault()
  
  try {
    await navigator.clipboard.writeText(phoneNumber)
    notificationMessage.value = 'Номер скопирован!'
    showToast()
  } catch (err) {
    console.error(err)
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
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-title">О нас</div>
        <ul class="footer-links">
          <li><a href="https://metaforce.ru/vladimir/price">Цены</a></li>
          <li><a href="https://metaforce.ru/vladimir/birthday_kids">Мероприятия</a></li>
          <li><a href="https://metaforce.ru/vladimir#address">Адрес</a></li>
          <li><a href="https://metaforce.ru/vladimir/games">Игры</a></li>
          <li><a href="https://metaforce.ru/news">Новости</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <div class="footer-title">Сотрудничество</div>
        <ul class="footer-links">
          <li><a href="https://metaforce.ru/franchise">Франшиза</a></li>
          <li><a href="https://metaforce.ru/rent">Аренда</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <div class="footer-title">Документы</div>
        <ul class="footer-links">
          <li><a href="https://metaforce.ru/perm/privacy" target="_blank">Политика конфиденциальности</a></li>
          <li><a href="https://metaforce.ru/agreement" target="_blank">Пользовательское соглашение</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <div class="footer-contacts">
          <a href="tel:+79028877457" class="phone-link" @click="copyPhoneNumber">
            +7 (902) 887-74-57
          </a>
          <SocialLinks />
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>ИП Кафанов Павел Павлович | ИНН: 370263691865 | ОГРНИП: 325370000041668</p>
      <p>&copy; 2026 VR Arena Metaforce. Все права защищены.</p>
    </div>
  </footer>
  
  <!-- Всплывающее уведомление -->
  <transition name="fade">
    <div v-if="showNotification" class="notification-toast">
      {{ notificationMessage }}
    </div>
  </transition>
</template>

<style scoped>
.footer {
  padding: 3rem 2rem 2rem;
  background: var(--bg-secondary);
  border-top: 1px solid rgba(173, 240, 98, 0.2);
  margin-top: 4rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  color: var(--accent);
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.phone-link {
  color: var(--accent);
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}

.phone-link:hover {
  color: var(--glow);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links svg {
  width: 24px;
  height: 24px;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.social-links a:hover svg {
  color: var(--accent);
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(173, 240, 98, 0.1);
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-section {
    align-items: center;
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