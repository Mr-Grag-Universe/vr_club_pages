<!-- FAQ.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  { 
    q: 'Сколько длится один сеанс?', 
    a: 'Стандартный сеанс — 60 минут. Можно продлить на 30 минут за 500₽.' 
  },
  { 
    q: 'Можно ли играть вдвоём?', 
    a: 'Да! У нас есть кооперативные игры и PvP-режимы на арене до 4х человек.' 
  },
  { 
    q: 'Есть ли возрастные ограничения?', 
    a: 'С 7 лет с родителями, с 14 — самостоятельно. Для kids VR — от 5 лет.' 
  }
])

const activeIndex = ref<number | null>(null)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <section class="faq-section">
    <h2 class="section-title">[ FAQ ]</h2>
    
    <div class="faq-container">
      <div 
        v-for="(item, index) in faqs" 
        :key="index"
        class="faq-item"
        :class="{ active: activeIndex === index }"
      >
        <button class="faq-question" @click="toggle(index)">
          <span class="prompt">user@vrarena:~$</span>
          {{ item.q }}
          <span class="cursor" :class="{ blink: activeIndex === index }">_</span>
        </button>
        
        <div class="faq-answer">
          <div class="answer-content">
            <span class="prompt">system@vrarena:~$</span>
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding: 5rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: var(--accent);
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Courier New', monospace;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid var(--bg-accent);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-secondary);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background 0.3s;
}

.faq-question:hover {
  background: var(--bg-accent);
}

.prompt {
  color: var(--accent);
  font-family: monospace;
  font-size: 0.9rem;
}

.cursor {
  color: var(--accent);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item.active .faq-answer {
  max-height: 200px;
}

.answer-content {
  padding: 1.5rem;
  padding-top: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>