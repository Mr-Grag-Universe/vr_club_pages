<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

// ====== TypeScript Interfaces ======
export interface BukzaWidgetInstance {
  // Добавьте здесь известные методы/свойства виджета Bukza
  // Например:
  // refresh?: () => void
  // destroy?: () => void
  [key: string]: any
}

export interface BukzaLoadedEvent {
  widget?: BukzaWidgetInstance
  iframe?: boolean
}

export interface BukzaErrorEvent {
  type: 'script_load_error' | 'widget_init_error' | 'widget_open_error'
  message: string
}

export interface BukzaOpenedEvent {
  config: Record<string, any>
}

// ====== Props Interface ======
interface Props {
  widgetId: string
  mode?: 'embedded' | 'button' | 'iframe'
  displayType?: 'popup' | 'panel'
  widgetUrl?: string | null
  buttonText?: string
  buttonClass?: string
  buttonStyle?: Record<string, string>
  iframeStyle?: Record<string, string>
  options?: Record<string, any>
  autoLoadScript?: boolean
}

// ====== Component Props ======
const props = withDefaults(defineProps<Props>(), {
  mode: 'embedded',
  displayType: 'popup',
  widgetUrl: null,
  buttonText: 'Забронировать время',
  buttonClass: 'bukza-booking-button',
  buttonStyle: () => ({}),
  iframeStyle: () => ({
    width: '100%',
    height: '1000px',
    border: 'none'
  }),
  options: () => ({}),
  autoLoadScript: true
})

// ====== Emits ======
const emit = defineEmits<{
  loaded: [event: BukzaLoadedEvent]
  error: [event: BukzaErrorEvent]
  opened: [event: BukzaOpenedEvent]
}>()

// ====== Component State ======
const loading = ref<boolean>(true)
const iframeLoading = ref<boolean>(true)
const scriptLoaded = ref<boolean>(false)
const widgetInstance = ref<BukzaWidgetInstance | null>(null)
const bukzaContainer = ref<HTMLElement | null>(null)

// ====== Computed ======
const fullWidgetUrl = computed((): string => {
  if (props.widgetUrl) return props.widgetUrl
  return `https://widget.bukza.com/${props.widgetId}`
})

const scriptUrl = computed((): string => {
  return `https://widget.bukza.com/${props.widgetId}.js`
})

// ====== Type Declarations for Global Bukza Object ======
declare global {
  interface Window {
    bukza_widgets?: {
      create: (config: any) => BukzaWidgetInstance
      open: (config: any) => void
    }
    bukzaOpenWidget?: () => void
  }
}

// ====== Watchers ======
watch(() => props.widgetId, (newId) => {
  if (newId && props.mode === 'embedded' && props.autoLoadScript) {
    loadBukzaScript()
  }
}, { immediate: true })

// ====== Lifecycle Hooks ======
onMounted(() => {
  if (props.mode === 'embedded' && props.widgetId && props.autoLoadScript) {
    loadBukzaScript()
  }
  
  if (props.mode === 'button') {
    window.bukzaOpenWidget = openBukzaWidget
  }
})

onBeforeUnmount(() => {
  // Очистка при удалении компонента
  if (widgetInstance.value) {
    // Дополнительная логика очистки если нужно
  }
})

// ====== Methods ======
const loadBukzaScript = (): void => {
  if (scriptLoaded.value || document.getElementById('bukza-script')) {
    initEmbeddedWidget()
    return
  }

  loading.value = true

  const script = document.createElement('script')
  script.id = 'bukza-script'
  script.src = scriptUrl.value
  script.async = true

  script.onload = () => {
    scriptLoaded.value = true
    initEmbeddedWidget()
  }

  script.onerror = (error: Event | string) => {
    console.error('Ошибка загрузки скрипта Bukza:', error)
    emit('error', {
      type: 'script_load_error',
      message: 'Не удалось загрузить виджет бронирования'
    })
    loading.value = false
  }

  document.head.appendChild(script)
}

const initEmbeddedWidget = (): void => {
  nextTick(() => {
    const container = bukzaContainer.value
    if (!container || !window.bukza_widgets) return

    try {
      container.innerHTML = ''

      const widgetElement = document.createElement('div')
      widgetElement.id = `bukza-widget-${props.widgetId}`
      container.appendChild(widgetElement)

      widgetInstance.value = window.bukza_widgets.create({
        container: widgetElement.id,
        widget: props.widgetId,
        ...props.options
      })

      loading.value = false
      emit('loaded', { widget: widgetInstance.value })
    } catch (error) {
      console.error('Ошибка инициализации виджета:', error)
      emit('error', {
        type: 'widget_init_error',
        message: 'Не удалось инициализировать виджет'
      })
      loading.value = false
    }
  })
}

const openBukzaWidget = (): void => {
  if (!props.widgetId) {
    console.error('Не указан ID виджета Bukza')
    return
  }

  if (!window.bukza_widgets) {
    loadBukzaScriptForPopup()
    return
  }

  openWidget()
}

const loadBukzaScriptForPopup = (): void => {
  const script = document.createElement('script')
  script.id = 'bukza-script-popup'
  script.src = scriptUrl.value
  script.async = true

  script.onload = () => {
    openWidget()
  }

  script.onerror = (error: Event | string) => {
    console.error('Ошибка загрузки скрипта Bukza:', error)
    emit('error', {
      type: 'script_load_error',
      message: 'Не удалось загрузить виджет бронирования'
    })
  }

  document.head.appendChild(script)
}

const openWidget = (): void => {
  try {
    const config = {
      widget: props.widgetId,
      display: props.displayType,
      ...props.options
    }

    if (window.bukza_widgets) {
      window.bukza_widgets.open(config)
      emit('opened', { config })
    }
  } catch (error) {
    console.error('Ошибка открытия виджета:', error)
    emit('error', {
      type: 'widget_open_error',
      message: 'Не удалось открыть виджет'
    })
  }
}

const onIframeLoad = (): void => {
  iframeLoading.value = false
  emit('loaded', { iframe: true })
}

// Public API для родительского компонента
defineExpose({
  show: openBukzaWidget,
  refresh: initEmbeddedWidget,
  widgetInstance: computed(() => widgetInstance.value)
})
</script>

<template>
  <div class="bukza-booking">
    <!-- Режим встроенного виджета -->
    <div v-if="mode === 'embedded'" ref="bukzaContainer" class="bukza-container">
      <div v-if="loading" class="bukza-loading">
        <slot name="loading">
          <div class="loading-spinner">Загрузка формы бронирования...</div>
        </slot>
      </div>
    </div>

    <!-- Режим кнопки (popup/panel) -->
    <div v-else-if="mode === 'button'" class="bukza-button-wrapper">
      <button 
        @click="openBukzaWidget" 
        :class="buttonClass"
        :style="buttonStyle"
      >
        <slot name="button-content">
          {{ buttonText }}
        </slot>
      </button>
    </div>

    <!-- Режим iframe -->
    <div v-else-if="mode === 'iframe'" class="bukza-iframe-wrapper">
      <iframe
        :src="widgetUrl"
        :style="iframeStyle"
        frameborder="0"
        @load="onIframeLoad"
      ></iframe>
      <div v-if="iframeLoading" class="iframe-loading">
        <slot name="iframe-loading">
          <div class="loading-spinner">Загрузка...</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BukzaBooking',
  
  props: {
    // ID виджета Bukza (обязательный)
    widgetId: {
      type: String,
      required: true
    },
    
    // Режим отображения: 'embedded', 'button', 'iframe'
    mode: {
      type: String,
      default: 'embedded',
      validator: (value) => ['embedded', 'button', 'iframe'].includes(value)
    },
    
    // Тип открытия для режима button: 'popup' или 'panel'
    displayType: {
      type: String,
      default: 'popup',
      validator: (value) => ['popup', 'panel'].includes(value)
    },
    
    // URL виджета (для режима iframe)
    widgetUrl: {
      type: String,
      default: null
    },
    
    // Текст кнопки (для режима button)
    buttonText: {
      type: String,
      default: 'Забронировать время'
    },
    
    // CSS класс для кнопки
    buttonClass: {
      type: String,
      default: 'bukza-booking-button'
    },
    
    // Inline стили для кнопки
    buttonStyle: {
      type: Object,
      default: () => ({})
    },
    
    // Inline стили для iframe
    iframeStyle: {
      type: Object,
      default: () => ({
        width: '100%',
        height: '1000px',
        border: 'none'
      })
    },
    
    // Параметры виджета
    options: {
      type: Object,
      default: () => ({})
    },
    
    // Автоматическая загрузка скрипта
    autoLoadScript: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      loading: true,
      iframeLoading: true,
      scriptLoaded: false,
      widgetInstance: null
    }
  },
  
  computed: {
    // Полный URL виджета для iframe
    fullWidgetUrl() {
      if (this.widgetUrl) return this.widgetUrl;
      return `https://widget.bukza.com/${this.widgetId}`;
    },
    
    // URL скрипта Bukza
    scriptUrl() {
      return `https://widget.bukza.com/${this.widgetId}.js`;
    }
  },
  
  watch: {
    widgetId: {
      immediate: true,
      handler(newId) {
        if (newId && this.mode === 'embedded' && this.autoLoadScript) {
          this.loadBukzaScript();
        }
      }
    }
  },
  
  mounted() {
    // Загружаем скрипт для embedded режима
    if (this.mode === 'embedded' && this.widgetId && this.autoLoadScript) {
      this.loadBukzaScript();
    }
    
    // Для button режима создаем глобальную функцию для обратного вызова
    if (this.mode === 'button') {
      window.bukzaOpenWidget = this.openBukzaWidget;
    }
  },
  
  beforeUnmount() {
    // Очищаем при удалении компонента
    if (window.bukza_widgets && this.widgetInstance) {
      // Логика очистки виджета
    }
  },
  
  methods: {
    // Загрузка скрипта Bukza
    loadBukzaScript() {
      if (this.scriptLoaded || document.getElementById('bukza-script')) {
        this.initEmbeddedWidget();
        return;
      }
      
      this.loading = true;
      
      const script = document.createElement('script');
      script.id = 'bukza-script';
      script.src = this.scriptUrl;
      script.async = true;
      
      script.onload = () => {
        this.scriptLoaded = true;
        this.initEmbeddedWidget();
      };
      
      script.onerror = (error) => {
        console.error('Ошибка загрузки скрипта Bukza:', error);
        this.$emit('error', {
          type: 'script_load_error',
          message: 'Не удалось загрузить виджет бронирования'
        });
        this.loading = false;
      };
      
      document.head.appendChild(script);
    },
    
    // Инициализация встроенного виджета
    initEmbeddedWidget() {
      this.$nextTick(() => {
        const container = this.$refs.bukzaContainer;
        if (!container || !window.bukza_widgets) return;
        
        try {
          // Очищаем контейнер
          container.innerHTML = '';
          
          // Создаем новый элемент для виджета
          const widgetElement = document.createElement('div');
          widgetElement.id = `bukza-widget-${this.widgetId}`;
          container.appendChild(widgetElement);
          
          // Инициализируем виджет
          this.widgetInstance = window.bukza_widgets.create({
            container: widgetElement.id,
            widget: this.widgetId,
            ...this.options
          });
          
          this.loading = false;
          this.$emit('loaded', { widget: this.widgetInstance });
          
        } catch (error) {
          console.error('Ошибка инициализации виджета:', error);
          this.$emit('error', {
            type: 'widget_init_error',
            message: 'Не удалось инициализировать виджет'
          });
          this.loading = false;
        }
      });
    },
    
    // Открытие виджета в popup/panel
    openBukzaWidget() {
      if (!this.widgetId) {
        console.error('Не указан ID виджета Bukza');
        return;
      }
      
      // Если скрипт еще не загружен, загружаем его
      if (!window.bukza_widgets) {
        this.loadBukzaScriptForPopup();
        return;
      }
      
      this.openWidget();
    },
    
    // Загрузка скрипта для popup режима
    loadBukzaScriptForPopup() {
      const script = document.createElement('script');
      script.id = 'bukza-script-popup';
      script.src = this.scriptUrl;
      script.async = true;
      
      script.onload = () => {
        this.openWidget();
      };
      
      script.onerror = (error) => {
        console.error('Ошибка загрузки скрипта Bukza:', error);
        this.$emit('error', {
          type: 'script_load_error',
          message: 'Не удалось загрузить виджет бронирования'
        });
      };
      
      document.head.appendChild(script);
    },
    
    // Открытие виджета
    openWidget() {
      try {
        const config = {
          widget: this.widgetId,
          display: this.displayType,
          ...this.options
        };
        
        if (window.bukza_widgets) {
          window.bukza_widgets.open(config);
          this.$emit('opened', { config });
        }
      } catch (error) {
        console.error('Ошибка открытия виджета:', error);
        this.$emit('error', {
          type: 'widget_open_error',
          message: 'Не удалось открыть виджет'
        });
      }
    },
    
    // Обработка загрузки iframe
    onIframeLoad() {
      this.iframeLoading = false;
      this.$emit('loaded', { iframe: true });
    },
    
    // Метод для программного открытия виджета
    show() {
      if (this.mode === 'button' || this.mode === 'embedded') {
        this.openBukzaWidget();
      }
    },
    
    // Метод для обновления виджета
    refresh() {
      if (this.mode === 'embedded' && this.widgetInstance) {
        this.initEmbeddedWidget();
      }
    }
  }
}
</script>

<style scoped>
.bukza-booking {
  width: 100%;
}

.bukza-container {
  min-height: 400px;
  position: relative;
}

.bukza-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #f5f5f5;
  border-radius: 8px;
}

.loading-spinner {
  text-align: center;
  color: #666;
}

.loading-spinner::after {
  content: '';
  display: block;
  width: 40px;
  height: 40px;
  margin: 10px auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bukza-button-wrapper {
  display: inline-block;
}

.bukza-booking-button {
  background: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.bukza-booking-button:hover {
  background: #45a049;
}

.bukza-iframe-wrapper {
  position: relative;
  width: 100%;
}

.iframe-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
</style>