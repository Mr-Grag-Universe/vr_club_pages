<template>
  <div class="booking-item" :class="{ 'is-expanded': isExpanded }">
    <div class="item-header">
      <div class="item-preview">
        <div class="placeholder">
          <span class="icon">🎯</span>
          <span class="text">Новое бронирование</span>
        </div>
      </div>

      <div class="item-controls">
        <button 
          class="toggle-btn"
          @click="$emit('toggle')"
        >
          {{ isExpanded ? 'Свернуть ←' : 'Развернуть →' }}
        </button>
        <button class="delete-btn" @click.stop="$emit('delete')">×</button>
      </div>
    </div>

    <div v-if="isExpanded" class="item-body">
      <div class="empty-content">
        <p>Здесь будут настройки бронирования</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  booking: Object,
  isExpanded: Boolean
})

defineEmits(['toggle', 'delete'])
</script>

<style scoped>
@import '@/assets/styles/booking.css';

.booking-item {
  background: var(--bg-secondary);
  border: 2px solid var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.booking-item:hover {
  border-color: var(--accent);
}

.booking-item.is-expanded {
  border-color: var(--accent);
  box-shadow: 0 0 15px var(--glow);
  margin: 1rem 0; /* Отделение развёрнутых */
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.placeholder {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.5rem;
}

.text {
  color: var(--text-secondary);
  font-size: 1rem;
}

.item-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  background: var(--accent);
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-btn:hover {
  background: var(--accent-hover);
  box-shadow: 0 0 10px var(--glow);
}

.delete-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 2px solid var(--text-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.delete-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.item-body {
  padding: 2rem;
  border-top: 1px solid var(--bg-accent);
  animation: slideDown 0.3s ease;
}

.empty-content {
  text-align: center;
  color: var(--text-secondary);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>