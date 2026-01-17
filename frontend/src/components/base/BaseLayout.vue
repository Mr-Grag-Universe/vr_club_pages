<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'

defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="layout">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.main-content {
  flex: 1;
  margin-top: 80px; /* Под fixed header */
}
</style>