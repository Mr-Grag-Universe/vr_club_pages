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

const isFlipped = ref(false)
const selectedDay = ref(props.options?.[0]?.value || '')
const currentPrice = computed(() => {
  const option = props.options?.find(opt => opt.value === selectedDay.value)
  return option ? option.price : props.price
})

function handleBook() {
  emit('book', currentPrice.value)
  isFlipped.value = false
}
</script>

<template>
  <div class="price-card">
    <div class="card-inner" :class="{ flipped: isFlipped }" @click="isFlipped = !isFlipped">
      <!-- Лицевая сторона -->
      <div class="card-face card-front">
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
        
        <div class="hint">Нажмите для подробностей</div>
      </div>

      <!-- Обратная сторона -->
      <div class="card-face card-back" @click.stop="handleBook">
        <h3 class="back-title">Включено в пакет</h3>
        
        <ul v-if="features?.length" class="price-features">
          <li v-for="feature in features" :key="feature" class="price-feature-point">
            <!-- <i class="check-icon">✓</i> -->
            <span class="feature-text">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
    <button class="btn-primary book-button" @click="handleBook">
      Забронировать
    </button>
  </div>
</template>

<style scoped>
@import '@/assets/styles/price.css';

.book-button {
  /* position: absolute; */
  /* bottom: 1.5rem; */
  /* left: 1.5rem; */
  /* right: 1.5rem; */
  margin-top: 5%;
  width: auto;
  z-index: 10;
  pointer-events: all;
}

.price-card {
  /* Убираем min-height, делаем гибкой */
  min-height: auto;
  height: 100%; /* Занимает всё доступное пространство */
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 80%; /* Высота на всю карточку */
  min-height: 450px; /* Минимальная высота для красивого вида */
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 1.5rem; /* Увеличен padding для лучшего вида */
  background: var(--bg-secondary);
  border: 1px solid var(--bg-accent);
  display: flex;
  flex-direction: column;
  /* Убираем position: absolute проблемы */
  box-sizing: border-box;
}

.card-front {
  /* распределяем пространство */
}

.card-back {
  transform: rotateY(180deg);
  /* ФИКС: Убираем переполнение контента */
  overflow-y: auto;
}

.back-title {
  color: var(--accent);
  font-size: 1.5rem;
  margin: 0 0 1rem 0; /* Уменьшен отступ */
  text-align: center;
  flex-shrink: 0;
}

.price-features {
  flex: 1;
  margin: 0;
  padding: 0;
  /* ФИКС: Убираем list-style и маркеры */
  list-style: none;
}

/* ФИКС: Явно отключаем маркеры для всех псевдоэлементов */
.price-features ::marker {
  display: none;
  content: '✓';
}

.price-features li {
    content: '✓';
  /* ФИКС: Уменьшаем интервалы */
  padding: auto;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
}

.price-features li:before {
    content: '✓';
}

.check-icon {
  color: var(--accent);
  font-weight: bold;
  flex-shrink: 0;
  /* ФИКС: Убедимся что нет конфликта с псевдоэлементами */
  display: inline-block;
  min-width: 1.2em;
}

.feature-text {
  /* ФИКС: Убираем перенос на новую строку под иконкой */
  flex: 1;
}

.back-actions {
  /* ФИКС: Кнопка всегда видна, вынесена за пределы скролла */
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--bg-accent);
  flex-shrink: 0;
}

/* Остальные стили остаются */
.hint {
  margin-top: 0.5rem; /* Уменьшен отступ */
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
  opacity: 0.7;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  /* ... остальные стили */
}

/* Адаптивность */
@media (max-width: 768px) {
  .card-inner {
    min-height: 400px;
  }
  
  .card-face {
    padding: 1rem;
  }
}
</style>