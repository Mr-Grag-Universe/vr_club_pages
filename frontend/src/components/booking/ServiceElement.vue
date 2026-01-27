<template>
  <div class="service-element">
    <!-- Level 1: Выбор типа -->
    <div class="level-1">
      <div 
        v-for="option in level1Options"
        :key="option.id"
        class="service-option"
        :class="{ 
          active: options.type === option.id,
          blurred: options.type && options.type !== option.id
        }"
        @click="selectType(option.id)"
      >
        <span class="option-icon">{{ option.icon }}</span>
        <span class="option-label">{{ option.label }}</span>
      </div>
    </div>

    <!-- Level 2: Выбор подтипа -->
    <div v-if="showLevel2" class="level-2">
      <div class="level-2-title">{{ level2Title }}</div>
      <div class="level-2-options">
        <div 
          v-for="subtype in currentLevel2Options"
          :key="subtype.id"
          class="subtype-option"
          :class="{ 
            active: options.subtype === subtype.id,
            blurred: options.subtype && options.subtype !== subtype.id
          }"
          @click="selectSubtype(subtype.id)"
        >
          {{ subtype.label }}
        </div>
      </div>
    </div>

    <!-- Level 3: Выбор количества людей (если нужно) -->
    <div v-if="showPeopleSlider" class="level-3">
      <div class="slider-header">
        <span class="slider-title">{{ peopleSliderTitle }}</span>
        <span class="slider-value">{{ safePeopleValue }} {{ peopleUnit }}</span>
      </div>
      <input 
        type="range" 
        :min="minPeople"
        :max="maxPeople"
        :step="1"
        v-model="localPeopleValue"
        class="people-slider"
      />
      <div class="slider-labels">
        <span>{{ minPeople }} {{ peopleUnit }}</span>
        <span>{{ maxPeople }} {{ peopleUnit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, toRefs } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({ type: null, subtype: null, people: null })
  }
})

const emit = defineEmits(['update'])
const { options } = toRefs(props)
const localPeopleValue = ref(1)


const level1Options = [
  { id: 'arena', icon: '🎯', label: 'VR-Арена' },
  { id: 'zones', icon: '💎', label: 'VR-Зоны' },
  { id: 'package', icon: '🎁', label: 'Пакет' }
]

// Опции для второго уровня в зависимости от типа
const level2OptionsMap = {
  arena: [
    { id: 'full', label: 'Вся арена' },
    { id: 'jointly', label: 'Совместно' }
  ],
  zones: [
    { id: 'minutes', label: 'По 15 минут' },
    { id: 'jointly', label: 'Совместно' }
  ],
  package: [
    { id: 'S', label: 'S' },
    { id: 'M', label: 'M' },
    { id: 'L', label: 'L' },
    { id: 'XL', label: 'XL' }
  ]
}

// Вычисляемые свойства
const showLevel2 = computed(() => props.options.type !== null)
const currentLevel2Options = computed(() => level2OptionsMap[props.options.type] || [])
const level2Title = computed(() => {
  switch(props.options.type) {
    case 'arena': return 'Тип арены:'
    case 'zones': return 'Тип зон:'
    case 'package': return 'Размер пакета:'
    default: return ''
  }
})

// Нужен ли слайдер для выбора количества людей
const showPeopleSlider = computed(() => {
  if (!props.options.type || !props.options.subtype) return false
  
  // Слайдер показываем только для совместных арен и зон
  if (props.options.type === 'arena' && props.options.subtype === 'jointly') return true
  if (props.options.type === 'zones' && props.options.subtype === 'jointly') return true
  
  return false
})

// Настройки слайдера с защитой от null
const minPeople = computed(() => {
  if (props.options.type === 'zones') return 1
  if (props.options.type === 'arena') return 1
  return 1
})

const maxPeople = computed(() => {
  if (props.options.type === 'zones') return 3  // От 1 до 3 зон
  if (props.options.type === 'arena') return 10 // От 1 до 10 игроков
  return 1
})

const peopleSliderTitle = computed(() => {
  if (props.options.type === 'zones') return 'Количество зон:'
  if (props.options.type === 'arena') return 'Количество игроков:'
  return 'Количество:'
})

const peopleUnit = computed(() => {
  if (props.options.type === 'zones') return 'зон'
  if (props.options.type === 'arena') return 'игроков'
  return ''
})

// Безопасное значение для слайдера
const safePeopleValue = computed(() => {
  return localPeopleValue.value
})

// Автоматическая инициализация people при показе слайдера
watch(showPeopleSlider, (newVal) => {
  if (newVal && (props.options.people === null || props.options.people === undefined)) {
    emit('update', { 
      ...props.options, 
      people: minPeople.value 
    })
  }
})

// Методы
function selectType(type) {
  const newOptions = { 
    type,
    subtype: null, // Сбрасываем подтип при смене типа
    people: null
  }
  
  emit('update', newOptions)
}

function selectSubtype(subtype) {
  const newOptions = { 
    ...props.options, 
    subtype,
    people: null // Сбрасываем людей при смене подтипа
  }
  
  // Если выбран подтип, не требующий указания людей, сбрасываем people
  if (
    (props.options.type === 'arena' && subtype === 'full') ||
    (props.options.type === 'zones' && subtype === 'minutes')
  ) {
    newOptions.people = null
  } else if (
    (props.options.type === 'arena' && subtype === 'jointly') ||
    (props.options.type === 'zones' && subtype === 'jointly')
  ) {
    // Для совместных подтипов устанавливаем значение по умолчанию
    newOptions.people = minPeople.value
  }
  
  emit('update', newOptions)
}

function updatePeople(value) {
  const peopleValue = parseInt(value)
  emit('update', { 
    ...props.options, 
    people: peopleValue 
  })
}

watch(() => options.value.people, (newPeople) => {
  const safeValue = newPeople === null || newPeople === undefined || isNaN(newPeople) 
    ? minPeople.value 
    : Math.max(minPeople.value, Math.min(maxPeople.value, parseInt(newPeople)))
  localPeopleValue.value = safeValue
}, { immediate: true })

watch(localPeopleValue, (newValue) => {
  emit('update', { 
    ...options.value, 
    people: parseInt(newValue) 
  })
})

watch(showPeopleSlider, (newVal) => {
  if (newVal && (options.value.people === null || options.value.people === undefined)) {
    localPeopleValue.value = minPeople.value
    emit('update', { 
      ...options.value, 
      people: minPeople.value 
    })
  }
})
</script>

<style scoped>
.service-element {
  width: 100%;
}

.level-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.service-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--bg-primary);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-primary);
}

.service-option:hover {
  border-color: var(--accent);
}

.service-option.active {
  border-color: var(--accent);
  background: var(--bg-accent);
  box-shadow: 0 0 8px var(--glow);
}

.service-option.blurred {
  opacity: 0.3;
  filter: blur(1px);
}

.option-icon {
  font-size: 1.5rem;
}

.option-label {
  font-weight: bold;
  font-size: 0.9rem;
}

.level-2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.level-2-title {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.level-2-options {
  display: grid;
  gap: 0.5rem;
}

.subtype-option {
  padding: 0.75rem;
  background: var(--bg-primary);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s;
  color: var(--text-primary);
}

.subtype-option:hover {
  border-color: var(--accent);
}

.subtype-option.active {
  border-color: var(--accent);
  background: var(--bg-accent);
  box-shadow: 0 0 6px var(--glow);
}

.subtype-option.blurred {
  opacity: 0.3;
  filter: blur(1px);
}

/* Конфигурация сетки в зависимости от типа */
.level-2-options:has(.subtype-option:nth-child(4)) {
  grid-template-columns: repeat(4, 1fr);
}

.level-2-options:has(.subtype-option:nth-child(2)):not(:has(.subtype-option:nth-child(3))) {
  grid-template-columns: repeat(2, 1fr);
}

/* Стили для слайдера */
.level-3 {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--bg-accent);
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.slider-title {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: bold;
}

.slider-value {
  font-size: 1.1rem;
  color: var(--accent);
  font-weight: bold;
}

.people-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--bg-accent);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.people-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

.people-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}
</style>