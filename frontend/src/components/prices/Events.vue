<script setup lang="ts">
import PriceCard from './PriceCard.vue'
import { useBookingModal } from '@/composables/useBookingModal'

const { openModal } = useBookingModal()

const packages = [
  {
    id: 'event-s',
    title: 'ПАКЕТ S',
    description: '',
    price: 11000,
    hit: false,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 11000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 13000 }
    ],
    features: [
      'Общее время 1:45',
      'До 10 человек',
      'Час арены на 8 человек',
    //   'Team Force или Star Force',
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      'Чай и кофе бесплатно'
    ]
  },
  {
    id: 'event-m',
    title: 'ПАКЕТ M',
    description: '',
    price: 14000,
    hit: true,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 14000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 17000 }
    ],
    features: [
      'Общее время 2:45',
      'До 16 человек',
      '2 часа арены на 8 человек',
    //   'Team Force или Star Force',
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      'Чай и кофе бесплатно'
    ]
  },
  {
    id: 'event-l',
    title: 'ПАКЕТ L',
    description: '',
    price: 18000,
    hit: false,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 18000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 21000 }
    ],
    features: [
      'Общее время 2:45',
      'До 20 человек',
      '2 часа арены на 10 человек',
    //   'Team Force или Star Force',
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      '1 часа игры в VR-зонах',
      'Чай и кофе бесплатно'
    ]
  },
  {
    id: 'event-xl',
    title: 'ПАКЕТ XL',
    description:    '',
    price: 22000,
    hit: false,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 22000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 26000 }
    ],
    features: [
      'Общее время 3:45',
      'До 20 человек',
      '3 часа арены на 10 человек',
    //   'Team Force или Star Force',
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      '2 часа игры в VR-зонах',
      'Чай и кофе бесплатно'
    ]
  }
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}
</style>