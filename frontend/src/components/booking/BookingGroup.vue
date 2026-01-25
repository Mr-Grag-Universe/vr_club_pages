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
        <button class="delete-group-btn" @click="$emit('delete-group', { groupId: group.id })">
          Удалить группу
        </button>
      </div>
    </div>

    <!-- Рендеринг элементов по типу -->
    <div 
      v-for="element in group.elements" 
      :key="element.id"
      class="element"
      :class="`element-${element.type}`"
    >
      <!-- Заголовок элемента -->
      <div class="element-header">
        <span class="element-type">{{ elementTypes[element.type] }}</span>
        <button 
          v-if="group.elements[group.elements.length - 1].id === element.id"
          class="delete-btn"
          @click="$emit('delete-element', { 
            groupId: group.id, 
            elementId: element.id 
          })"
        >
          ×
        </button>
      </div>

      <!-- Контент элемента -->
      <component 
        :is="getComponent(element.type)"
        :options="element.options"
        :service-type="group.elements[0]?.options.type"
        :show-end-time="group.elements[0]?.options.type === 'arena' || group.elements[0]?.options.type === 'zones'"
        @update="(options) => $emit('update-element', { 
          groupId: group.id, 
          elementId: element.id, 
          options 
        })"
      />
    </div>

    <!-- Кнопка добавить элемент -->
    <button 
      v-if="group.elements.length < 3"
      class="add-element-btn"
      @click="$emit('add-element')"
    >
      <span class="plus">+</span>
      Добавить в эту группу
    </button>
  </div>
</template>

<script setup>
import ServiceElement from './ServiceElement.vue'
import DateElement from './DateElement.vue'
import TimeElement from './TimeElement.vue'

defineProps({
  group: Object,
  canAddElement: Boolean
})

defineEmits(['update-element', 'delete-element', 'delete-group', 'add-element'])

// Маппинг типов
const elementTypes = {
  service: 'Тип услуги',
  date: 'Дата',
  time: 'Время'
}

// Маппинг компонентов
const componentMap = {
  service: ServiceElement,
  date: DateElement,
  time: TimeElement
}

function getComponent(type) {
  return componentMap[type] || 'div'
}
</script>

<style scoped>
/* ВСТАВИТЬ ПОЛНОСТЬЮ */
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

.element {
  padding: 0.75rem;
  background: var(--bg-accent);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border-left: 3px solid transparent;
}

.element:last-child {
  margin-bottom: 0;
}

.element.service-element {
  border-left-color: var(--accent);
}

.element.date-element {
  border-left-color: #8b5cf6;
}

.element.time-element {
  border-left-color: #10b981;
}

.element-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.element-type {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.delete-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 2px solid var(--text-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  transition: all 0.3s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.delete-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
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