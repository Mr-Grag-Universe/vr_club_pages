<script setup lang="ts">
type TabType = 'arena' | 'zones'

defineProps<{
  activeTab: TabType
}>()

const emit = defineEmits<{
  switch: [tab: TabType]
}>()
</script>

<template>
  <div class="tabs-container">
    <button 
      class="tab-button" 
      :class="{ active: activeTab === 'arena' }"
      @click="emit('switch', 'arena')"
    >
      <span class="tab-icon">◈</span>
      <span class="tab-text">VR-Арена</span>
      <span class="tab-badge">4 игры</span>
    </button>
    <button 
      class="tab-button" 
      :class="{ active: activeTab === 'zones' }"
      @click="emit('switch', 'zones')"
    >
      <span class="tab-icon">◉</span>
      <span class="tab-text">VR-Зоны</span>
      <span class="tab-badge">40+ игр</span>
    </button>
  </div>
</template>

<style scoped>
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0 3rem;
  position: relative;
  z-index: 10;
}

.tab-button {
  position: relative;
  padding: 1rem 2.5rem;
  background: var(--bg-secondary);
  border: 2px solid var(--bg-accent);
  border-radius: 12px;
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  overflow: hidden;
}

.tab-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.tab-button:hover {
  border-color: var(--accent);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.tab-button:hover::before {
  opacity: 1;
}

.tab-button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
  box-shadow: 0 0 30px var(--glow);
}

.tab-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

.tab-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-weight: 400;
}

.tab-button.active .tab-badge {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .tabs-container {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>