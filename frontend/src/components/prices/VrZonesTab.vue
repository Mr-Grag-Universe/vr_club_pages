<script setup lang="ts">
import PriceTable from './PriceTable.vue'

const tableData = {
  headers: ['VR-зоны', '15 минут', '30 минут', '1 час'],
  rows: [
    { days: 'ПН-ЧТ', m15: '200 ₽', m30: '300 ₽', m60: '550 ₽' },
    { days: 'ПТ-ВС', m15: '300 ₽', m30: '400 ₽', m60: '700 ₽' }
  ]
}
</script>

<template>
  <div class="vr-zones-tab">
    <PriceTable :data="tableData" />
  </div>
</template>

<style scoped>
.vr-zones-tab {
  padding: 2rem 0;
}
</style>