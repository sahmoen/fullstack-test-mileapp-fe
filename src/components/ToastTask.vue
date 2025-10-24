<template>
  <transition-group name="toast" tag="div" class="fixed top-5 right-5 space-y-2 z-50">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="flex items-center space-x-3 px-4 py-3 text-white rounded-lg shadow-lg max-w-sm"
      :class="typeStyles[t.type] || typeStyles.info"
    >
      <div>
        <component :is="iconMap[t.type]" class="w-5 h-5" />
      </div>
      <div class="flex-1">{{ t.message }}</div>
    </div>
  </transition-group>
</template>

<script setup>
import { useToast } from '../composables/useToast'
import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-vue-next'

const { toasts, typeStyles } = useToast()

const iconMap = {
  success: CircleCheck,
  error: CircleX,
  info: Info,
  warning: TriangleAlert,
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.toast-leave-from {
  opacity: 1;
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
