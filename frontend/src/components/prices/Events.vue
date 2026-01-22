<script setup lang="ts">
import PriceCard from './PriceCard.vue'
import { useBookingModal } from '@/composables/useBookingModal'

const { openModal } = useBookingModal()

const packages = [
  {
    id: 'event-s',
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
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      'Чай и кофе бесплатно'
    ]
  },
  {
    id: 'event-m',
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
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      'Чай и кофе бесплатно'
    ]
  },
  {
    id: 'event-l',
    title: 'ПАКЕТ L',
    description: '2 часа арены на 10 чел. + 1 час VR-зон + 2 часа 45 мин. лаунж. Общее время 2:45. Количество гостей: до 20 человек.',
    price: 18000,
    hit: false,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 18000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 21000 }
    ],
    features: [
      'Игра на арене Metaforce',
    //   'Team Force или Star Force',
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      '2 часа игры в VR-зонах',
      'Чай и кофе бесплатно'
    ]
  },
  {
    id: 'event-xl',
    title: 'ПАКЕТ XL',
    description:    '3 часа арены на 10 чел. + 2 часа VR-зон + 3 часа 45 мин. лаунж.\n'+
                    'Общее время 3:45. Количество гостей: до 20 человек. ',
    price: 22000,
    hit: false,
    options: [
      { label: 'ПН-ЧТ', value: 'weekdays', price: 22000 },
      { label: 'ПТ-ВС', value: 'weekend', price: 26000 }
    ],
    features: [
      'Игра на арене Metaforce',
    //   'Team Force или Star Force',
      'Отдельная лаунж зона',
      'PlayStation 5 и настольные игры',
      '3 часа игры в VR-зонах',
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}
</style>