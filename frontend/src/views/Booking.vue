<template>
  <div class="booking-container">
    <h1 class="section-title">VR Клуб - Бронирование</h1>
    
    <div class="groups-list">
      <BookingGroup
        v-for="(group, index) in groups"
        :key="group.id"
        :group="group"
        :can-add-element="group.elements.length < 3"
        @add-element="addToGroup(group.id)"
        @delete-element="deleteLastElement(group.id)"
        @delete-group="deleteGroup(group.id)"
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

const groups = ref([
  {
    id: Date.now(),
    elements: [{ id: Date.now() + 1, service: null, params: {} }]
  }
])

const canAddGroup = computed(() => groups.value.length < 5)

const addToGroup = (groupId) => {
  const group = groups.value.find(g => g.id === groupId)
  if (!group || group.elements.length >= 3) return
  
  group.elements.push({
    id: Date.now(),
    service: null,
    params: {}
  })
}

const addNewGroup = () => {
  if (!canAddGroup.value) return
  
  groups.value.push({
    id: Date.now(),
    elements: []
  })
}

const deleteLastElement = (groupId) => {
  const group = groups.value.find(g => g.id === groupId)
  if (!group || group.elements.length === 0) return
  
  group.elements.pop()
  
  if (group.elements.length === 0 && groups.value.length > 1) {
    deleteGroup(groupId)
  }
}

const deleteGroup = (groupId) => {
  const index = groups.value.findIndex(g => g.id === groupId)
  if (index === -1) return
  groups.value.splice(index, 1)
  
  if (groups.value.length === 0) {
    groups.value.push({
      id: Date.now(),
      elements: []
    })
  }
}
</script>

<style scoped>
@import '@/assets/styles/booking.css';
</style>