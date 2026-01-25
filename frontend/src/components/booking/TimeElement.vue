<template>
  <div class="time-element">
    <div class="time-display">
      <span class="label">Время:</span>
      <span class="value">{{ displayTime }}</span>
    </div>

    <div class="slider-container" ref="sliderContainer">
      <!-- Подложка -->
      <div class="slider-track"></div>
      
      <!-- Выделенная область -->
      <div 
        class="slider-range" 
        :style="rangeStyle"
      ></div>

      <!-- Ползунок начала -->
      <div 
        class="slider-thumb start-thumb"
        :style="startThumbStyle"
        @mousedown.prevent="startDrag('start')"
        @touchstart.prevent="startDrag('start')"
      ></div>

      <!-- Ползунок конца -->
      <div 
        class="slider-thumb end-thumb"
        :style="endThumbStyle"
        @mousedown.prevent="startDrag('end')"
        @touchstart.prevent="startDrag('end')"
      ></div>

      <!-- Метки времени -->
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({ start: null, end: null })
  },
  serviceType: {
    type: String,
    default: null
  },
  showEndTime: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update'])

// Константы
const OPEN_TIME = 9 * 60 // 09:00
const CLOSE_TIME = 22 * 60 // 22:00
const LAST_BOOKING_TIME = 21 * 60 // 21:00
const STEP = 30 // шаг 30 минут

// Безопасное получение значений по умолчанию
const getDefaultStartTime = () => OPEN_TIME
const getDefaultEndTime = () => props.showEndTime ? OPEN_TIME + 60 : OPEN_TIME + 120

// Текущие значения с защитой от null
const startTime = ref(getSafeTime(props.options.start, getDefaultStartTime()))
const endTime = ref(getSafeTime(props.options.end, getDefaultEndTime()))

// Вспомогательная функция для безопасного получения времени
function getSafeTime(value, defaultValue) {
  if (value === null || value === undefined || isNaN(value)) {
    return defaultValue
  }
  // Ограничиваем диапазон
  return Math.max(OPEN_TIME, Math.min(CLOSE_TIME, value))
}

// Ссылка на контейнер
const sliderContainer = ref(null)

// Обновление из props с защитой
watch(() => props.options, (val) => {
  if (val) {
    if (val.start !== undefined && val.start !== null) {
      startTime.value = getSafeTime(val.start, getDefaultStartTime())
    }
    if (val.end !== undefined && val.end !== null) {
      endTime.value = getSafeTime(val.end, getDefaultEndTime())
    }
  }
}, { immediate: true, deep: true })

// Перетаскивание
const dragging = ref(null)
const sliderRect = ref(null)

const updateSliderRect = () => {
  if (sliderContainer.value) {
    sliderRect.value = sliderContainer.value.getBoundingClientRect()
  }
}

const startDrag = (type) => {
  dragging.value = type
  updateSliderRect()
  document.body.style.userSelect = 'none'
}

const onMouseMove = (e) => {
  if (!dragging.value || !sliderRect.value) return
  updateFromPosition(e.clientX)
}

const onTouchMove = (e) => {
  if (!dragging.value || !e.touches[0] || !sliderRect.value) return
  updateFromPosition(e.touches[0].clientX)
}

const onMouseUp = () => {
  dragging.value = null
  document.body.style.userSelect = ''
}

const updateFromPosition = (clientX) => {
  if (!sliderRect.value) return
  
  const rect = sliderRect.value
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  let newTime = Math.round((OPEN_TIME + percent * (CLOSE_TIME - OPEN_TIME)) / STEP) * STEP
  
  // Ограничиваем диапазон
  newTime = Math.max(OPEN_TIME, Math.min(CLOSE_TIME, newTime))
  
  if (dragging.value === 'start') {
    // Ограничения для начала
    const maxStart = props.showEndTime ? LAST_BOOKING_TIME : CLOSE_TIME - 120
    startTime.value = Math.min(newTime, maxStart)
    
    // Корректируем конец, если нужно
    if (props.showEndTime) {
      const minEnd = startTime.value + 60
      if (endTime.value < minEnd) {
        endTime.value = minEnd
      }
    } else {
      endTime.value = startTime.value + 120
    }
  } else if (dragging.value === 'end' && props.showEndTime) {
    // Ограничения для конца
    const minEnd = startTime.value + 60
    endTime.value = Math.max(newTime, Math.max(minEnd, OPEN_TIME))
  }
  
  updateValue()
}

const updateValue = () => {
  // Дополнительная валидация перед эмитом
  const safeStart = getSafeTime(startTime.value, getDefaultStartTime())
  const safeEnd = getSafeTime(endTime.value, getDefaultEndTime())
  
  emit('update', { 
    start: safeStart, 
    end: props.showEndTime ? safeEnd : safeStart + 120 
  })
}

// Стиль ползунков - ИСПРАВЛЕНО: приоритет операторов
const sliderWidth = CLOSE_TIME - OPEN_TIME

const startPercent = computed(() => {
  const safeStartTime = getSafeTime(startTime.value, getDefaultStartTime())
  return ((safeStartTime - OPEN_TIME) / sliderWidth) * 100
})

const endPercent = computed(() => {
  const safeEndTime = getSafeTime(endTime.value, getDefaultEndTime())
  return ((safeEndTime - OPEN_TIME) / sliderWidth) * 100
})

const startThumbStyle = computed(() => ({
  left: `calc(${startPercent.value}% - 15px)`
}))

const endThumbStyle = computed(() => ({
  left: `calc(${endPercent.value}% - 15px)`
}))

const rangeStyle = computed(() => {
  const start = startPercent.value
  const end = endPercent.value
  return {
    left: `${start}%`,
    width: `${Math.max(0, end - start)}%`
  }
})

// Отображение времени
const displayTime = computed(() => {
  const safeStart = getSafeTime(startTime.value, getDefaultStartTime())
  const safeEnd = getSafeTime(endTime.value, getDefaultEndTime())
  
  const start = formatTime(safeStart)
  const end = formatTime(safeEnd)
  return `${start} - ${end}`
})

const formatTime = (minutes) => {
  const safeMinutes = getSafeTime(minutes, getDefaultStartTime())
  const hour = Math.floor(safeMinutes / 60)
  const minute = safeMinutes % 60
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

// Валидация
const isValid = computed(() => {
  const safeStart = getSafeTime(startTime.value, getDefaultStartTime())
  const safeEnd = getSafeTime(endTime.value, getDefaultEndTime())
  return (safeEnd - safeStart) >= 60
})

// Метки
const timeMarks = computed(() => {
  const marks = []
  for (let time = OPEN_TIME; time <= CLOSE_TIME; time += 60) {
    const label = formatTime(time)
    const position = ((time - OPEN_TIME) / sliderWidth * 100) + '%'
    marks.push({ time, label, position })
  }
  return marks
})

// События
onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('touchend', onMouseUp)
  window.addEventListener('resize', updateSliderRect)
  
  nextTick(() => {
    updateSliderRect()
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onMouseUp)
  window.removeEventListener('resize', updateSliderRect)
  document.body.style.userSelect = ''
})
</script>

<style scoped>
.time-element {
  position: relative;
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

.slider-container {
  position: relative;
  height: 40px;
  margin-bottom: 2rem;
  user-select: none;
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

.slider-range {
  position: absolute;
  top: 50%;
  height: 6px;
  background: var(--accent);
  border-radius: 3px;
  transform: translateY(-50%);
  box-shadow: 0 0 8px var(--glow);
  transition: all 0.1s;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  background: var(--accent);
  border: 3px solid var(--bg-primary);
  border-radius: 50%;
  cursor: grab;
  transform: translateY(-50%);
  box-shadow: 0 0 10px var(--glow);
  transition: all 0.2s;
  z-index: 3;
}

.slider-thumb:hover {
  transform: translateY(-50%) scale(1.1);
}

.slider-thumb:active {
  cursor: grabbing;
}

.end-thumb {
  z-index: 2;
}

.time-marks {
  position: absolute;
  top: calc(100% + 8px);
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