// src/composables/useToast.js
import { reactive } from 'vue'

// reactive global array
const toasts = reactive([])

// toast types + colors mapping
const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500 text-gray-900',
}

/**
 * useToast composable
 * @returns { toasts, showToast }
 */
export function useToast() {
  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    const toast = { id, message, type }
    toasts.push(toast)

    setTimeout(() => {
      const idx = toasts.findIndex((t) => t.id === id)
      if (idx !== -1) toasts.splice(idx, 1)
    }, duration)
  }

  return { toasts, showToast, typeStyles }
}
