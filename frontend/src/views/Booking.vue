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
        @delete-element="deleteElement"
        @delete-group="deleteGroup(group.id)"
      >
        <template #service="{ element }">
          <ServiceSelect v-model="element.service" />
        </template>
        <template #date="{ element }">
          <DatePicker v-model="element.params.date" />
        </template>
        <template #time="{ element }">
          <TimePicker 
            v-model="element.params.time"
            :service-type="group.elements[0]?.service"
            :date="element.params.date"
          />
        </template>
      </BookingGroup>
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
import ServiceSelect from '@/components/booking/ServiceSelect.vue'
import DatePicker from '@/components/booking/DatePicker.vue'
import TimePicker from '@/components/booking/TimePicker.vue'

const groups = ref([
  {
    id: Date.now(),
    elements: [
      { id: Date.now() + 1, service: null, params: {} },
      { id: Date.now() + 2, service: null, params: {} },
      { id: Date.now() + 3, service: null, params: {} }
    ]
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

const deleteElement = (groupId, elementIndex) => {
  const group = groups.value.find(g => g.id === groupId)
  if (!group) return
  
  group.elements.splice(elementIndex, 1)
  
  if (group.elements.length === 0 && groups.value.length > 1) {
    deleteGroup(groupId)
  }
}

const deleteGroup = (groupId) => {
  const index = groups.value.findIndex(g => g.id === groupId)
  if (index > -1) groups.value.splice(index, 1)
  
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