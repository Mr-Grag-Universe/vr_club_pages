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

    <!-- Элемент 1: Тип услуги -->
    <div v-if="group.elements.length > 0" class="element service-element">
      <div class="element-label">Тип услуги:</div>
      <ServiceSelect v-model="group.elements[0].service" />
      <!-- Кнопка удаления для первого элемента -->
      <button 
        v-if="group.elements.length === 1"
        class="delete-btn"
        @click="deleteElement(0)"
        title="Удалить услугу"
      >
        ×
      </button>
    </div>

    <!-- Элемент 2: Дата -->
    <div v-if="group.elements.length > 1" class="element date-element">
      <div class="element-label">Дата:</div>
      <DatePicker v-model="group.elements[1].params.date" />
      <!-- Кнопка удаления для второго элемента -->
      <button 
        v-if="group.elements.length === 2"
        class="delete-btn"
        @click="deleteElement(1)"
        title="Удалить дату"
      >
        ×
      </button>
    </div>

    <!-- Элемент 3: Время -->
    <div v-if="group.elements.length > 2" class="element time-element">
      <div class="element-label">Время:</div>
      <TimePicker 
        v-model="group.elements[2].params.time"
        :service-type="group.elements[0]?.service"
        :date="group.elements[1]?.params.date"
      />
      <!-- Кнопка удаления для третьего элемента -->
      <button 
        class="delete-btn"
        @click="deleteElement(2)"
        title="Удалить время"
      >
        ×
      </button>
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
import ServiceSelect from './ServiceSelect.vue'
import DatePicker from './DatePicker.vue'
import TimePicker from './TimePicker.vue'

const props = defineProps({
  group: Object,
  canAddElement: Boolean
})

const emit = defineEmits(['addElement', 'deleteElement', 'deleteGroup'])

const deleteElement = (index) => {
  emit('deleteElement', index)
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
  border-left: 3px solid transparent;
  transition: all 0.3s;
  position: relative;
}

.service-element {
  border-left-color: var(--accent);
}

.date-element {
  border-left-color: #8b5cf6;
}

.time-element {
  border-left-color: #10b981;
}

.element-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.delete-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
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