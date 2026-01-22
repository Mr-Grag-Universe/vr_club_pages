<script setup lang="ts">
import PriceCard from './PriceCard.vue'
import { useBookingModal } from '@/composables/useBookingModal'

const { openModal } = useBookingModal()

const packages = [
  {
    id: 'adult-s',
    title: 'ПАКЕТ S',
    description: 'Час арены на 8 чел. + 1 час 45 мин. лаунж. Общее время 1:45. До 10 человек.',
    price: 11000,
    hit: false,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 11000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 13000 }
    ],
    features: [
      'Игра на арене Metaforce',
    //   'Team Force или Star Force',
    //   'Лаунж зона',
    //   'PlayStation 5 и настольные игры',
    //   'Чай и кофе'
    ]
  },
  {
    id: 'adult-m',
    title: 'ПАКЕТ M',
    description: '2 часа арены на 8 чел. + 2 часа 45 мин. лаунж. Общее время 2:45. До 16 человек.',
    price: 14000,
    hit: true,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 14000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 17000 }
    ],
    features: [
      'Игра на арене Metaforce',
    //   'Team Force или Star Force',
    //   'Лаунж зона',
    //   'PlayStation 5 и настольные игры',
    //   'Чай и кофе'
    ]
  }
  // ... можно добавить L и XL
]
</script>

<template>
  <div class="tab-content">
    <div class="packages-grid">
      <PriceCard
        v-for="pkg in packages"
        :key="pkg.id"
        v-bind="pkg"
        @book="openModal(pkg.title, $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}
</style>