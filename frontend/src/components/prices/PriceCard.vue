<script setup lang="ts">
import { ref, computed } from 'vue'
import DaySelector from './DaySelector.vue'

interface PriceOption {
  label: string
  value: string
  price: number
}

interface Props {
  title: string
  description: string
  price: number
  options?: PriceOption[]
  hit?: boolean
  features?: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  book: [price: number]
}>()

const selectedDay = ref(props.options?.[0]?.value || '')
const currentPrice = computed(() => {
  const option = props.options?.find(opt => opt.value === selectedDay.value)
  return option ? option.price : props.price
})

function handleBook() {
  emit('book', currentPrice.value)
}
</script>

<template>
  <div class="price-card">
    <div class="price-header">
      <h3 class="price-title">{{ title }}</h3>
      <span v-if="hit" class="price-hit-badge">ХИТ</span>
    </div>
    
    <p class="price-description">{{ description }}</p>
    
    <DaySelector 
      v-if="options?.length"
      v-model="selectedDay"
      :options="options"
    />
    
    <div class="price-value-wrapper">
      <span class="price-value">{{ currentPrice.toLocaleString() }}</span>
      <span class="price-currency">₽</span>
    </div>
    
    <ul v-if="features?.length" class="price-features">
      <li v-for="feature in features" :key="feature">{{ feature }}</li>
    </ul>
    
    <button class="btn-primary" @click="handleBook">
      <span>Забронировать</span>
      <span>→</span>
    </button>
  </div>
</template>

<style scoped>
@import '@/assets/styles/price.css';
</style>