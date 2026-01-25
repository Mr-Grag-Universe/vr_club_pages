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

    <!-- Level 2: Выбор подтипа для пакетов -->
    <div v-if="showLevel2" class="level-2">
      <div class="level-2-title">Размер пакета:</div>
      <div class="level-2-options">
        <div 
          v-for="subtype in level2Options"
          :key="subtype"
          class="size-option"
          :class="{ 
            active: options.subtype === subtype,
            blurred: options.subtype && options.subtype !== subtype
          }"
          @click="selectSubtype(subtype)"
        >
          {{ subtype }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: () => ({ type: null, subtype: null })
  }
})

const emit = defineEmits(['update'])

const level1Options = [
  { id: 'arena', icon: '🎯', label: 'VR-Арена' },
  { id: 'zones', icon: '💎', label: 'VR-Зоны' },
  { id: 'package', icon: '🎁', label: 'Пакет' }
]

const level2Options = ['S', 'M', 'L', 'XL']

const showLevel2 = computed(() => props.options.type === 'package')

function selectType(type) {
  const newOptions = { type }
  // Сбрасываем subtype при смене типа
  if (type !== 'package') {
    newOptions.subtype = 'default'
  } else {
    newOptions.subtype = null
  }
  emit('update', newOptions)
}

function selectSubtype(subtype) {
  emit('update', { ...props.options, subtype })
}
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
  margin-top: 0.5rem;
}

.level-2-title {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.level-2-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.size-option {
  padding: 0.5rem;
  background: var(--bg-primary);
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s;
  color: var(--text-primary);
}

.size-option:hover {
  border-color: var(--accent);
}

.size-option.active {
  border-color: var(--accent);
  background: var(--bg-accent);
  box-shadow: 0 0 6px var(--glow);
}

.size-option.blurred {
  opacity: 0.3;
  filter: blur(1px);
}
</style>