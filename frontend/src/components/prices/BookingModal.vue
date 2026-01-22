<script setup lang="ts">
import { ref } from 'vue'

// Типизация пропсов
interface Props {
  modelValue: boolean
  title: string
  price: number
}

// Типизация формы
interface BookingForm {
  name: string
  phone: string
  date: string
  agreement: boolean
}

// Сохраняем props в переменную, чтобы использовать в коде
const props = defineProps<Props>()

// Определяем emit'ы
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Инициализируем форму с типом
const form = ref<BookingForm>({
  name: '',
  phone: '',
  date: '',
  agreement: true
})

// Обработчик отправки с явным типом возвращаемого значения
function submit(): void {
  // Теперь props доступна
  console.log('Бронирование:', { 
    ...form.value, 
    service: props.title, 
    price: props.price 
  })
  
  // Закрываем модалку
  emit('update:modelValue', false)
  
  // Сбрасываем форму
  form.value = {
    name: '',
    phone: '',
    date: '',
    agreement: true
  }
}
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click="$emit('update:modelValue', false)">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="$emit('update:modelValue', false)">×</button>
      
      <h3 class="modal-title">Забронировать {{ title }}</h3>
      <p class="modal-price">Стоимость: <strong>{{ price.toLocaleString() }} ₽</strong></p>
      
      <form @submit.prevent="submit" class="booking-form">
        <input v-model="form.name" type="text" placeholder="Ваше имя" required>
        <input v-model="form.phone" type="tel" placeholder="Телефон" required>
        <input v-model="form.date" type="date" placeholder="Дата" required>
        
        <label class="checkbox-label">
          <input v-model="form.agreement" type="checkbox" required>
          Согласен с политикой конфиденциальности
        </label>
        
        <button type="submit" class="btn-primary">Отправить заявку</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

.modal-content {
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 450px;
  width: 90%;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-title {
  color: var(--accent);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.modal-price {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-form input {
  padding: 1rem;
  background: var(--bg-accent);
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.booking-form input:focus {
  outline: none;
  border-color: var(--accent);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  accent-color: var(--accent);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px var(--glow);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>