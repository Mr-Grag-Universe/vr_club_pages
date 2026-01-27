<template>
  <div class="booking-container">
    <h1 class="section-title">VR Клуб - Бронирование</h1>
    
    <div class="groups-list">
      <BookingGroup
        v-for="group in groups"
        :key="group.id"
        :group="group"
        :can-add-element="group.elements.length < 3"
        @update-element="updateElement"
        @delete-element="deleteElement"
        @delete-group="deleteGroup"
        @add-element="addElement(group.id)"
      />
    </div>

    <button 
      class="add-group-btn" 
      @click="addNewGroup"
      :disabled="!canAddGroup"
    >
      + Добавить группу
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookingGroup from '@/components/booking/BookingGroup.vue'

// === СТРУКТУРА ДАННЫХ ===
const groups = ref([
  {
    id: generateId(),
    elements: [
      { id: generateId(), type: 'service', options: { type: null, subtype: null, people: null } },
      { id: generateId(), type: 'date', options: { date: null } },
      { id: generateId(), type: 'time', options: { start: null, end: null } }
    ]
  }
])

// === ГЕНЕРАТОР ID ===
function generateId() {
  return `elem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// === ЛИМИТЫ ===
const canAddGroup = computed(() => groups.value.length < 5)

// === ОПЕРАЦИИ С ЭЛЕМЕНТАМИ ===
function addElement(groupId) {
  const group = groups.value.find(g => g.id === groupId)
  if (!group || group.elements.length >= 3) return
  
  if (group.elements.length === 0) {
    group.elements.push({
      id: generateId(),
      type: 'service',
      options: { type: null, subtype: null, people: null }
    })
  } else if (group.elements.length === 1) {
    group.elements.push({
      id: generateId(),
      type: 'date',
      options: { date: null }
    })
  } else if (group.elements.length === 2) {
    group.elements.push({
      id: generateId(),
      type: 'time',
      options: { start: null, end: null }
    })
  }
}

function updateElement({ groupId, elementId, options }) {
  const group = groups.value.find(g => g.id === groupId)
  if (!group) return
  
  const element = group.elements.find(e => e.id === elementId)
  if (!element) return
  
  // Создаем новый объект опций для реактивности
  const newOptions = { ...element.options, ...options }
  
  // Специальная логика для услуг
  if (element.type === 'service') {
    // Сбрасываем людей ТОЛЬКО при смене типа или подтипа
    if (options.type && options.type !== element.options.type) {
      newOptions.people = null
      if (!options.subtype) {
        newOptions.subtype = null
      }
    }
    
    // Сбрасываем людей ТОЛЬКО при смене подтипа
    if (options.subtype && options.subtype !== element.options.subtype) {
      if (
        (newOptions.type === 'arena' && options.subtype === 'full') ||
        (newOptions.type === 'zones' && options.subtype === 'minutes')
      ) {
        newOptions.people = null
      } else if (
        (newOptions.type === 'arena' && options.subtype === 'jointly') ||
        (newOptions.type === 'zones' && options.subtype === 'jointly')
      ) {
        newOptions.people = 1 // минимальное значение по умолчанию
      }
    }
    // Если обновляем только людей - не сбрасываем ничего!
  }
  
  // Обновляем опции
  element.options = newOptions
}

function deleteElement({ groupId, elementId }) {
  const group = groups.value.find(g => g.id === groupId)
  if (!group) return
  
  const index = group.elements.findIndex(e => e.id === elementId)
  if (index === -1) return
  
  group.elements.splice(index, 1)
  
  // Удаляем пустую группу, если она не последняя
  if (group.elements.length === 0 && groups.value.length > 1) {
    deleteGroup(groupId)
  }
}

// === ОПЕРАЦИИ С ГРУППАМИ ===
function addNewGroup() {
  if (!canAddGroup.value) return
  
  groups.value.push({
    id: generateId(),
    elements: []
  })
}

function deleteGroup(groupId) {
  const index = groups.value.findIndex(g => g.id === groupId)
  if (index === -1) return
  
  groups.value.splice(index, 1)

  // Создаём пустую группу, если удалили последнюю
  if (groups.value.length === 0) {
    groups.value.push({
      id: generateId(),
      elements: []
    })
  }
}
</script>

<style scoped>
@import '@/assets/styles/booking.css';
</style>