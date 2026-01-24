<!-- VrBookingManager.vue -->
<template>
  <div class="booking-manager">
    <h1 class="section-title">VR Клуб - Бронирование</h1>
    
    <!-- Список заказов -->
    <div class="bookings-list">
      <BookingItem
        v-for="(booking, index) in bookings"
        :key="booking.id"
        :booking="booking"
        :is-new="index === bookings.length - 1 && !booking.service"
        @update="updateBooking(index, $event)"
        @delete="deleteBooking(index)"
        @keydown.tab="handleTabNavigation"
      />
    </div>

    <!-- Добавить заказ -->
    <button class="add-booking-btn" @click="addBooking">
      <span class="plus-icon">+</span>
      Добавить услугу
    </button>

    <!-- Панель итогов -->
    <div v-if="bookings.length > 0" class="summary-panel">
      <div class="summary-info">
        <p>Услуг: <strong>{{ bookings.length }}</strong></p>
        <p class="price-hint">Итоговая сумма будет рассчитана при оформлении</p>
      </div>
      
      <button 
        class="checkout-btn primary-glow"
        @click="proceedToCheckout"
        :disabled="!hasValidBookings"
      >
        Оформить заказ →
      </button>
    </div>

    <!-- Подсказки по клавиатуре -->
    <div class="keyboard-hints">
      <div class="hint">
        <span class="key">TAB</span> — следующий вопрос
      </div>
      <div class="hint">
        <span class="key">1-3</span> — выбор услуги
      </div>
      <div class="hint">
        <span class="key">↑/↓</span> — изменить число
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookingItem from './BookingItem.vue'

const bookings = ref([
  { id: Date.now(), service: null, params: {} }
])

const addBooking = () => {
  bookings.value.push({
    id: Date.now(),
    service: null,
    params: {}
  })
}

const updateBooking = (index, updatedData) => {
  bookings.value[index] = { ...bookings.value[index], ...updatedData }
}

const deleteBooking = (index) => {
  if (bookings.value.length === 1) {
    // Оставляем один пустой заказ вместо удаления последнего
    bookings.value[0] = { id: Date.now(), service: null, params: {} }
  } else {
    bookings.value.splice(index, 1)
  }
}

const hasValidBookings = computed(() => 
  bookings.value.some(b => b.service && b.params.time)
)

const proceedToCheckout = () => {
  const validBookings = bookings.value.filter(b => b.service && b.params.time)
  console.log('Переход к оформлению:', validBookings)
  // TODO: Переход к оформлению
}

const handleTabNavigation = (e) => {
  // Глобальная навигация TAB между вопросами
  const questions = document.querySelectorAll('.question-block')
  const current = document.activeElement.closest('.question-block')
  const currentIndex = Array.from(questions).indexOf(current)
  
  if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault()
    const nextIndex = (currentIndex + 1) % questions.length
    questions[nextIndex]?.querySelector('button, input')?.focus()
  }
}
</script>

<style scoped>
.booking-manager {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.bookings-list {
  margin: 2rem 0;
}

.add-booking-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: var(--bg-accent);
  border: 2px dashed var(--text-secondary);
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.add-booking-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.plus-icon {
  font-size: 1.5rem;
}

.summary-panel {
  position: sticky;
  bottom: 1rem;
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid var(--accent);
  box-shadow: 0 0 20px var(--glow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.price-hint {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.checkout-btn {
  padding: 1rem 2rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-glow {
  box-shadow: 0 0 20px var(--glow);
}

.keyboard-hints {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: var(--bg-accent);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--accent);
}

.hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.hint:last-child {
  margin-bottom: 0;
}

.key {
  background: var(--accent);
  color: var(--bg-primary);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.75rem;
}
</style>