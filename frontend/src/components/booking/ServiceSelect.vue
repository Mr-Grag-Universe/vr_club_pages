<template>
  <div class="service-select">
    <!-- Первый уровень: тип услуги -->
    <div class="level-1">
      <div 
        v-for="option in level1Options"
        :key="option.id"
        class="service-option"
        :class="{ 
          active: selectedLevel1 === option.id,
          blurred: selectedLevel1 && selectedLevel1 !== option.id
        }"
        @click="selectLevel1(option.id)"
      >
        <span class="option-icon">{{ option.icon }}</span>
        <span class="option-label">{{ option.label }}</span>
      </div>
    </div>

    <!-- Второй уровень: размер пакета (появляется только если выбран "пакет") -->
    <div v-if="showLevel2" class="level-2">
      <div class="level-2-title">Какой пакет?</div>
      <div class="level-2-options">
        <div 
          v-for="size in level2Options"
          :key="size"
          class="size-option"
          :class="{ 
            active: selectedLevel2 === size,
            blurred: selectedLevel2 && selectedLevel2 !== size
          }"
          @click="selectLevel2(size)"
        >
          {{ size }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const level1Options = ref([
  { id: 'arena', icon: '🎯', label: 'VR-Арена' },
  { id: 'zones', icon: '💎', label: 'VR-Зоны' },
  { id: 'package', icon: '🎁', label: 'Пакет' }
])

const level2Options = ref(['S', 'M', 'L', 'XL'])

const selectedLevel1 = ref(null)
const selectedLevel2 = ref(null)

const showLevel2 = computed(() => selectedLevel1.value === 'package')

const fullValue = computed(() => {
  if (!selectedLevel1.value) return null
  if (selectedLevel1.value !== 'package') return selectedLevel1.value
  if (!selectedLevel2.value) return null
  return `package-${selectedLevel2.value.toLowerCase()}`
})

watch(fullValue, (newValue) => {
  emit('update:modelValue', newValue)
})

onMounted(() => {
  if (props.modelValue) {
    if (props.modelValue.startsWith('package-')) {
      selectedLevel1.value = 'package'
      selectedLevel2.value = props.modelValue.split('-')[1].toUpperCase()
    } else {
      selectedLevel1.value = props.modelValue
    }
  }
})

const selectLevel1 = (id) => {
  selectedLevel1.value = id
  if (id !== 'package') {
    selectedLevel2.value = null
  }
}

const selectLevel2 = (size) => {
  selectedLevel2.value = size
}
</script>

<style scoped>
.service-select {
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
  background: var(--bg-accent);
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
  background: var(--bg-primary);
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
  margin-top: 0.5rem;
}

.level-2-title {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-align: center;
}

.level-2-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.size-option {
  padding: 0.5rem;
  background: var(--bg-accent);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  font-weight: bold;
}

.size-option:hover {
  border-color: var(--accent);
}

.size-option.active {
  border-color: var(--accent);
  background: var(--bg-primary);
  box-shadow: 0 0 6px var(--glow);
}

.size-option.blurred {
  opacity: 0.3;
  filter: blur(1px);
}
</style>