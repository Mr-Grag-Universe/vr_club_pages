<template>
  <div class="booking-group" :class="{ 
    'has-space': group.elements.length < 3,
    'is-full': group.elements.length === 3
  }">
    <!-- Шапка -->
    <div class="group-header">
      <div class="group-title">
        <span class="title-text">{{ group.elements.length }}/3</span>
        <span v-if="group.elements.length < 3" class="title-hint">есть место</span>
      </div>
      
      <div class="group-controls">
        <button class="delete-group-btn" @click="$emit('deleteGroup')">
          Удалить группу
        </button>
      </div>
    </div>

    <!-- Первый элемент (полноценный) -->
    <div v-if="group.elements.length > 0" class="first-element">
      <ServiceSelect v-model="group.elements[0].service" />
    </div>

    <!-- Остальные элементы (заглушки) -->
    <div v-for="(elem, idx) in otherElements" :key="elem.id" class="element-placeholder">
      <div class="placeholder-content">
        <span class="slot-number">#{{ idx + 2 }}</span>
        <span class="placeholder-text">Заглушка</span>
        <!-- Кнопка удаления только у последнего -->
        <button 
          v-if="idx === otherElements.length - 1"
          class="delete-btn"
          @click="$emit('deleteElement')"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Кнопка добавить элемент -->
    <button 
      v-if="group.elements.length < 3"
      class="add-element-btn"
      @click="$emit('addElement')"
    >
      <span class="plus">+</span>
      Добавить в эту группу
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ServiceSelect from './ServiceSelect.vue'

const props = defineProps({
  group: Object
})

const emit = defineEmits(['addElement', 'deleteElement', 'deleteGroup'])

// Элементы кроме первого (для заглушек)
const otherElements = computed(() => props.group.elements.slice(1))
</script>

<style scoped>
.booking-group {
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s;
}

.booking-group.has-space {
  border-style: dashed;
  opacity: 0.9;
}

.booking-group.is-full {
  border-color: var(--accent);
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.group-title {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.title-text {
  font-weight: bold;
  color: var(--accent);
  font-size: 1.2rem;
}

.title-hint {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.group-controls {
  display: flex;
  gap: 0.5rem;
}

.delete-group-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-primary);
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.delete-group-btn:hover {
  background: #ef4444;
  color: white;
}

.first-element {
  margin-bottom: 0.75rem;
}

.element-placeholder {
  padding: 0.75rem;
  background: var(--bg-accent);
  border: 1px dashed var(--text-secondary);
  border-radius: 8px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
}

.element-placeholder:last-child {
  border-left: 3px solid var(--accent);
}

.placeholder-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.slot-number {
  font-weight: bold;
  color: var(--accent);
}

.placeholder-text {
  color: var(--text-secondary);
}

.add-element-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-accent);
  border: 2px dashed var(--accent);
  color: var(--accent);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.add-element-btn:hover {
  background: var(--accent);
  color: white;
  box-shadow: 0 0 10px var(--glow);
}

.plus {
  font-size: 1.2rem;
}
</style>