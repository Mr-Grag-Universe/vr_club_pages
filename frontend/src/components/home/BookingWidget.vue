<!-- src/components/home/BookingWidget.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const terminalInput = ref('')
const terminalOutput = ref([
  '> VR Arena Terminal v2.1.4',
  '> Доступно 3 свободных слота на сегодня',
  '> Введите "help" для списка команд'
])
const showCursor = ref(true)

const commands = {
  help: () => [
    '> Доступные команды:',
    '>  slots - показать доступные слоты',
    '>  book <время> - забронировать',
    '>  games - список игр',
    '>  price - цены',
    '>  clear - очистить консоль'
  ],
  slots: () => [
    '> Сегодня доступно:',
    '>  14:00 - 15:00 (3 места)',
    '>  16:30 - 17:30 (2 места)',
    '>  19:00 - 20:00 (4 места)'
  ],
  book: (args: string) => {
    if (!args) return ['> Ошибка: укажите время (например: book 16:30)']
    return [`> Слот ${args} забронирован! Код: VR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`]
  },
  games: () => ['> 50+ игр доступно. Посмотрите секцию GAMES на странице'],
  price: () => ['> Будни: 1500₽/час | Выходные: 2000₽/час'],
  clear: () => {
    terminalOutput.value = ['> Консоль очищена']
    return []
  }
}

const processCommand = () => {
  const fullCommand = terminalInput.value.trim()
  if (!fullCommand) return
  
  terminalOutput.value.push(`> ${fullCommand}`)
  
  const [cmd, ...args] = fullCommand.split(' ')
  const handler = commands[cmd as keyof typeof commands]
  
  if (handler) {
    const result = handler(args.join(' '))
    terminalOutput.value.push(...result)
  } else {
    terminalOutput.value.push(`> Команда "${cmd}" не найдена. Введите "help"`)
  }
  
  terminalInput.value = ''
}

// Мигающий курсор
setInterval(() => {
  showCursor.value = !showCursor.value
}, 500)
</script>

<template>
  <section class="booking-section">
    <h2 class="section-title">$ booking.exe --terminal</h2>
    
    <div class="terminal-container">
      <div class="terminal-header">
        <div class="terminal-title">VR Arena Console</div>
        <div class="terminal-controls">
          <span></span><span></span><span></span>
        </div>
      </div>
      
      <div class="terminal-body">
        <div class="terminal-output">
          <div v-for="(line, idx) in terminalOutput" :key="idx">{{ line }}</div>
        </div>
        
        <div class="terminal-input-line">
          <span class="prompt">guest@vrarena:~$</span>
          <input 
            v-model="terminalInput"
            @keydown.enter="processCommand"
            type="text"
            class="terminal-input"
            spellcheck="false"
          />
          <span class="cursor" v-show="showCursor">_</span>
        </div>
      </div>
    </div>
    
    <div class="terminal-hint">
      <p>Нажмите Enter для выполнения команды</p>
    </div>
  </section>
</template>

<style scoped>
.booking-section {
  padding: 5rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.terminal-container {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--bg-accent);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--bg-accent);
  border-bottom: 1px solid var(--accent);
}

.terminal-controls span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
}

.terminal-controls span:nth-child(1) { background: #ff5f57; }
.terminal-controls span:nth-child(2) { background: #ffbd2e; }
.terminal-controls span:nth-child(3) { background: #28ca42; }

.terminal-body {
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
}

.terminal-output {
  min-height: 200px;
  margin-bottom: 1rem;
}

.terminal-output > div {
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt {
  color: var(--accent);
}

.terminal-input {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: inherit;
  font-size: inherit;
  outline: none;
}

.terminal-input:focus {
  outline: none;
}

.cursor {
  color: var(--accent);
}

.terminal-hint {
  margin-top: 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>