<template>
  <div class="time-picker">
    <div class="time-display">
      <span class="label">Время:</span>
      <span class="value">{{ displayTime }}</span>
    </div>

    <div class="time-slider-container">
      <div class="slider-track">
        <div 
          class="slider-selection" 
          :style="{ left: selectionLeft, width: selectionWidth }"
        ></div>
      </div>
      
      <!-- Ползунок начала -->
      <input 
        type="range"
        class="slider start-slider"
        v-model="startMinutes"
        :min="OPEN_TIME"
        :max="maxStartTime"
        :step="30"
      >
      
      <!-- Ползунок конца (только для арены/зон) -->
      <input 
        v-if="!isPackage"
        type="range"
        class="slider end-slider"
        v-model="endMinutes"
        :min="minEndTime"
        :max="CLOSE_TIME"
        :step="30"
      >
      
      <div class="time-marks">
        <span 
          v-for="mark in timeMarks" 
          :key="mark.time"
          class="time-mark"
          :style="{ left: mark.position }"
        >
          {{ mark.label }}
        </span>
      </div>
    </div>

    <div class="validation-hint" v-if="!isValid">
      Минимальная длительность — 1 час
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: null, end: null })
  },
  serviceType: {
    type: String,
    default: null
  },
  date: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

// Время работы (константы)
const OPEN_TIME = 12 * 60 // 12:00
const CLOSE_TIME = 23 * 60 // 23:00
const LAST_BOOKING_TIME = 21 * 60 // 21:00

const startMinutes = ref(props.modelValue.start || OPEN_TIME)
const endMinutes = ref(props.modelValue.end || OPEN_TIME + 60)

// Для пакетов фиксируем конец
const isPackage = computed(() => props.serviceType && props.serviceType.startsWith('package'))

// Максимальное время начала (чтобы пакет уложился)
const maxStartTime = computed(() => {
  if (isPackage.value) {
    return CLOSE_TIME - 120 // -2 часа
  }
  return LAST_BOOKING_TIME
})

// Минимальное время конца (минимум 1 час после начала)
const minEndTime = computed(() => {
  const min = startMinutes.value + 60
  return min < CLOSE_TIME ? min : startMinutes.value
})

// Выделение на шкале
const selectionLeft = computed(() => {
  const range = CLOSE_TIME - OPEN_TIME
  return ((startMinutes.value - OPEN_TIME) / range * 100) + '%'
})

const selectionWidth = computed(() => {
  const range = CLOSE_TIME - OPEN_TIME
  const duration = (endMinutes.value - startMinutes.value) / range * 100
  return duration + '%'
})

// Отметки времени
const timeMarks = computed(() => {
  const marks = []
  for (let time = OPEN_TIME; time <= CLOSE_TIME; time += 60) {
    const label = formatTime(time)
    const position = ((time - OPEN_TIME) / (CLOSE_TIME - OPEN_TIME) * 100) + '%'
    marks.push({ time, label, position })
  }
  return marks
})

// Отслеживаем изменения ползунков
watch(startMinutes, (newVal) => {
  if (newVal > maxStartTime.value) {
    startMinutes.value = maxStartTime.value
    return
  }
  
  if (isPackage.value) {
    // Для пакетов конец фиксирован
    endMinutes.value = newVal + 120
  } else {
    // Для арены/зон корректируем минимум
    if (endMinutes.value < startMinutes.value + 60) {
      endMinutes.value = startMinutes.value + 60
    }
  }
  
  updateValue()
})

watch(endMinutes, (newVal) => {
  if (!isPackage.value) {
    updateValue()
  }
})

const updateValue = () => {
  emit('update:modelValue', {
    start: startMinutes.value,
    end: endMinutes.value
  })
}

// Форматирование времени
const displayTime = computed(() => {
  const start = formatTime(startMinutes.value)
  const end = formatTime(endMinutes.value)
  return `${start} - ${end}`
})

const formatTime = (minutes) => {
  const hour = Math.floor(minutes / 60)
  const minute = minutes % 60
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

const isValid = computed(() => {
  return !isPackage.value && (endMinutes.value - startMinutes.value) >= 60
})

// Инициализация при монтировании
const initFromValue = () => {
  if (props.modelValue.start) {
    startMinutes.value = props.modelValue.start
  }
  if (props.modelValue.end) {
    endMinutes.value = props.modelValue.end
  }
  
  if (isPackage.value) {
    endMinutes.value = startMinutes.value + 120
  }
}

watch(() => props.modelValue, initFromValue, { immediate: true })
watch(isPackage, () => {
  initFromValue()
}, { immediate: true })
</script>

<style scoped>
.time-picker {
  background: var(--bg-accent);
  padding: 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
}

.time-display {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
}

.label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-width: 60px;
}

.value {
  font-weight: bold;
  color: var(--accent);
  font-size: 1.1rem;
}

.time-slider-container {
  position: relative;
  height: 60px;
  margin-bottom: 0.5rem;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--bg-secondary);
  transform: translateY(-50%);
  border-radius: 2px;
}

.slider-selection {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: all 0.2s;
  box-shadow: 0 0 8px var(--glow);
}

.slider {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 20px;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  transform: translateY(-50%);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--accent);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 8px var(--glow);
  border: 2px solid var(--bg-primary);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--accent);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 8px var(--glow);
  border: 2px solid var(--bg-primary);
}

.start-slider {
  z-index: 2;
}

.end-slider {
  z-index: 1;
}

.time-marks {
  position: absolute;
  top: 70%;
  left: 0;
  right: 0;
  height: 20px;
}

.time-mark {
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.validation-hint {
  font-size: 0.8rem;
  color: #ef4444;
  text-align: center;
  margin-top: 0.5rem;
}
</style>