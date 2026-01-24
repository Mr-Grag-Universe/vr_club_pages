<!-- QuestionInput.vue -->
<template>
  <div class="question-block" tabindex="0">
    <label class="question-label">
      {{ question }}
      <span class="keyboard-shortcut" v-if="keyboardKey">
        ({{ keyboardKey }})
      </span>
    </label>
    
    <div class="input-options" v-if="type === 'select'">
      <button
        v-for="option in options"
        :key="option.value"
        class="option-btn"
        :class="{ 
          active: modelValue === option.value,
          'glow-effect': modelValue === option.value 
        }"
        @click="selectOption(option.value)"
        @keydown.arrowRight.prevent="nextOption"
        @keydown.arrowLeft.prevent="prevOption"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="number-input-group" v-if="type === 'number'">
      <button 
        class="control-btn" 
        @click="decrement"
        @keydown.arrowDown.prevent="decrement"
        :disabled="modelValue <= min"
      >-</button>
      
      <input
        type="text"
        :value="modelValue"
        class="number-display"
        readonly
        @keydown.arrowUp.prevent="increment"
        @keydown.arrowDown.prevent="decrement"
      />
      
      <button 
        class="control-btn" 
        @click="increment"
        @keydown.arrowUp.prevent="increment"
        :disabled="modelValue >= max"
      >+</button>
    </div>

    <input
      v-if="type === 'time'"
      type="time"
      :value="modelValue"
      @input="handleInput"
      class="time-input"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  question: String,
  type: {
    type: String,
    default: 'select'
  },
  options: Array,
  modelValue: [String, Number],
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 10
  },
  keyboardKey: String
})

const emit = defineEmits(['update:modelValue'])

const selectOption = (value) => {
  emit('update:modelValue', value)
}

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}

const increment = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const currentOptionIndex = computed(() => 
  props.options?.findIndex(opt => opt.value === props.modelValue) || -1
)

const nextOption = () => {
  if (!props.options) return
  const nextIndex = (currentOptionIndex.value + 1) % props.options.length
  selectOption(props.options[nextIndex].value)
}

const prevOption = () => {
  if (!props.options) return
  const prevIndex = currentOptionIndex.value <= 0 
    ? props.options.length - 1 
    : currentOptionIndex.value - 1
  selectOption(props.options[prevIndex].value)
}
</script>