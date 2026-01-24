<template>
  <div class="date-picker">
    <label class="question">Выберите дату</label>
    
    <button 
      class="date-button"
      :class="{ 'has-date': selectedDate }"
      @click="openCalendar"
    >
      {{ buttonText }}
    </button>

    <!-- Попап с календарём -->
    <div v-if="isOpen" class="calendar-popup" @click.self="closeCalendar">
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="prevMonth">←</button>
          <span class="month-year">{{ currentMonthLabel }}</span>
          <button class="nav-btn" @click="nextMonth">→</button>
        </div>

        <div class="calendar-grid">
          <div class="weekday" v-for="day in weekdays" :key="day">
            {{ day }}
          </div>
          
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="day-cell"
            :class="{
              'empty': !day,
              'selected': isSelected(day),
              'today': isToday(day)
            }"
            @click="selectDay(day)"
          >
            {{ day }}
          </div>
        </div>

        <div class="calendar-actions">
          <button class="cancel-btn" @click="closeCalendar">Отмена</button>
          <button 
            class="confirm-btn" 
            @click="confirmDate"
            :disabled="!tempDate"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: String // YYYY-MM-DD
})

const emit = defineEmits(['update:modelValue'])

const selectedDate = ref(props.modelValue || null)
const tempDate = ref(null)
const isOpen = ref(false)
const currentDate = ref(new Date())

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const buttonText = computed(() => {
  if (!selectedDate.value) return 'не выбрано'
  const date = new Date(selectedDate.value)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const currentMonthLabel = computed(() => {
  return currentDate.value.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric'
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDayOfWeek = firstDay.getDay() || 7 // Воскресенье = 7
  
  const days = []
  
  // Пустые ячейки
  for (let i = 1; i < startDayOfWeek; i++) {
    days.push(null)
  }
  
  // Дни месяца
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(day)
  }
  
  return days
})

const openCalendar = () => {
  tempDate.value = selectedDate.value ? new Date(selectedDate.value) : null
  isOpen.value = true
}

const closeCalendar = () => {
  isOpen.value = false
  tempDate.value = null
}

const selectDay = (day) => {
  if (!day) return
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  tempDate.value = new Date(year, month, day)
}

const confirmDate = () => {
  if (!tempDate.value) return
  const isoDate = tempDate.value.toISOString().split('T')[0]
  selectedDate.value = isoDate
  emit('update:modelValue', isoDate)
  closeCalendar()
}

const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const isSelected = (day) => {
  if (!day || !tempDate.value) return false
  return day === tempDate.value.getDate() && 
         currentDate.value.getMonth() === tempDate.value.getMonth() && 
         currentDate.value.getFullYear() === tempDate.value.getFullYear()
}

const isToday = (day) => {
  if (!day) return false
  const today = new Date()
  return day === today.getDate() && 
         currentDate.value.getMonth() === today.getMonth() && 
         currentDate.value.getFullYear() === today.getFullYear()
}
</script>

<style scoped>
.date-picker {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.75rem 0;
}

.question {
  font-size: 1rem;
  color: var(--text-primary);
  min-width: 120px;
}

.date-button {
  padding: 0.75rem 1.25rem;
  background: var(--bg-accent);
  border: 2px solid var(--bg-accent);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
  min-width: 150px;
}

.date-button:hover {
  border-color: var(--accent);
}

.date-button.has-date {
  border-color: var(--accent);
  background: var(--bg-primary);
  color: var(--accent);
  font-weight: bold;
}

/* Попап */
.calendar-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.calendar-container {
  background: var(--bg-secondary);
  border: 2px solid var(--accent);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 30px var(--glow);
  min-width: 320px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.nav-btn {
  background: var(--bg-accent);
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: var(--accent);
  color: var(--bg-primary);
}

.month-year {
  font-weight: bold;
  color: var(--accent);
  text-transform: capitalize;
}

/* Сетка календаря */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 1rem;
}

.weekday {
  text-align: center;
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-weight: bold;
  padding: 0.5rem 0;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-accent);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.day-cell:hover:not(.empty) {
  background: var(--accent);
  color: var(--bg-primary);
}

.day-cell.empty {
  cursor: default;
  background: transparent;
}

.day-cell.today {
  border: 1px solid var(--accent);
}

.day-cell.selected {
  background: var(--accent);
  color: var(--bg-primary);
  font-weight: bold;
}

/* Кнопки действий */
.calendar-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.cancel-btn,
.confirm-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.cancel-btn {
  background: var(--bg-accent);
  border: none;
  color: var(--text-secondary);
}

.cancel-btn:hover {
  border-color: var(--accent);
}

.confirm-btn {
  background: var(--accent);
  border: none;
  color: white;
}

.confirm-btn:hover {
  box-shadow: 0 0 10px var(--glow);
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>