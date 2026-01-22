import { ref } from 'vue'

export function useBookingModal() {
  const modalState = ref({
    open: false,
    title: '',
    price: 0
  })

  function openModal(title: string, price: number) {
    modalState.value = { open: true, title, price }
  }

  function closeModal() {
    modalState.value.open = false
  }

  return {
    modalState,
    openModal,
    closeModal
  }
}