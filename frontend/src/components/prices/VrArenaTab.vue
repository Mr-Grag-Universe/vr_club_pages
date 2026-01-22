<script setup lang="ts">
import PriceTable from './PriceTable.vue'

const tableData = {
  headers: ['VR-арена 1 час', '1 игрок', 'Вся арена'],
  rows: [
    { days: 'ПН-ЧТ', player: '1 000 ₽', arena: '8 000 ₽' },
    { days: 'ПТ-ВС', player: '1 200 ₽', arena: '10 000 ₽' }
  ]
}
</script>

<template>
  <div class="vr-arena-tab">
    <PriceTable :data="tableData" />
  </div>
</template>

<style scoped>
.vr-arena-tab {
  padding: 2rem 0;
}
</style>