<script setup lang="ts">
interface Option {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: Option[]
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="day-selector">
    <select 
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option 
        v-for="option in options" 
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
@import '@/assets/styles/price.css';
</style>