<!-- src/components/prices/PriceTable.vue -->
<script setup lang="ts">
interface Props {
  data: {
    headers: string[]
    rows: Array<Record<string, string>>
  }
}

defineProps<Props>()
</script>

<template>
  <div class="table-wrapper">
    <table class="price-table">
      <thead>
        <tr>
          <th v-for="header in data.headers" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data.rows" :key="index">
          <td v-for="(value, key) in row" :key="key">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--bg-accent);
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-secondary);
}

thead {
  background: var(--bg-accent);
}

th {
  padding: 1.5rem 1rem;
  text-align: left;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  font-size: 0.9rem;
}

td {
  padding: 1.5rem 1rem;
  border-top: 1px solid var(--bg-accent);
  color: var(--text-primary);
}

tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

tr:hover {
  background: rgba(99, 102, 241, 0.1);
}
</style>