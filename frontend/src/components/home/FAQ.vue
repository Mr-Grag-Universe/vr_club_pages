<!-- src/components/home/FAQ.vue -->
<script setup lang="ts">
import { ref } from 'vue'

interface FAQItem {
  q: string
  a: string | string[] // Поддержка строки или массива
}

const faqs = ref<FAQItem[]>([
  { 
    q: 'Чем отличается VR-арена от VR-клуба?', 
    a: [
      'В обычных VR-клубах игра происходит в ограниченном пространстве 2*2 кв. м., ' +
      'передвижение в играх происходит путем телепортации. Игры обычно рассчитаны максимум до 4х человек.', 
      'На VR-арене перемещение происходит свободно, игровой персонаж полностью следует за вами.'
    ]
  },
  { 
    q: 'Нужна ли сменная обувь?', 
    a: ['Сменку брать не обязательно, но мы настоятельно рекомендуем удобную одежду и обувь. ' +
        'Игра на VR-арене - дело азартное, вероятно вы захотите побегать - а каблуки будут мешать погружению в виртуальную реальность.'] 
  },
  { 
    q: 'Есть ли возрастные ограничения?', 
    a: [ 'Мы пускаем детей с 7 лет.' ]
  },
  { 
    q: 'Есть ли что-то кроме "стрелялок"?', 
    a: [
      'Конечно! ' +
      'Вам на выбор доступен обширный каталог Steam от ритм-игр до симуляторов готовки и хорроров.'
    ]
  },
  { 
    q: 'Меня не будет укачивать на VR арене?', 
    a: [
      'Нет.',
      'Поскольку на VR-арене перемещение в игре и в жизни синхронизировано, укачивания не происходит.'
    ] 
  },
  { 
    q: 'А как игроки на VR арене друг в друга не врезаются?', 
    a: [ 'Игроки в виртуальной реальности видят друг друга там же, где в реальной жизни, поэтому столкновения возможны только по неаккуратности.' ]
  }
])

const activeIndex = ref<number | null>(null)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <section class="faq-section" id="faq">
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
          <!-- Эффект выполнения команды -->
          <div class="execution-header" v-if="activeIndex === index">
            <span class="loader">▮▮▮</span>
            <span class="status">EXECUTING_QUERY...</span>
          </div>
          
          <div class="answer-content">
            <div 
            v-for="(line, lineIndex) in item.a" 
            :key="lineIndex"
            class="answer-line"
            >
            <span class="line-marker">></span>
            <span class="line-text">{{ line }}</span>
            </div>
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
  flex-shrink: 0;
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
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item.active .faq-answer {
  max-height: 400px; /* Увеличено для многострочных ответов */
}

/* Заголовок выполнения */
.execution-header {
  padding: 0.5rem 1.5rem;
  background: var(--bg-accent);
  border-left: 3px solid var(--accent);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--accent);
}

.loader {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.status {
  letter-spacing: 1px;
}

/* Содержимое ответа */
.answer-content {
  padding: 1rem 1.5rem;
  background: var(--bg-primary);
}

.answer-line {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: var(--text-secondary);
  font-size: 1rem;
}

.first-line {
  color: var(--text-primary);
}

.line-marker {
  color: var(--accent);
  font-family: monospace;
  flex-shrink: 0;
}

.line-text {
  flex: 1;
}

/* Убираем лишний отступ у последней строки */
.answer-line:last-child {
  margin-bottom: 0;
}

/* Анимация появления строк */
.answer-line {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInLine 0.4s forwards;
}

.answer-line:nth-child(1) { animation-delay: 0.1s; }
.answer-line:nth-child(2) { animation-delay: 0.2s; }
.answer-line:nth-child(3) { animation-delay: 0.3s; }
.answer-line:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideInLine {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>