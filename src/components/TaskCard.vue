<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
    <h3 class="font-semibold text-lg mb-1">{{ task.title }}</h3>
    <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>
    <div class="flex justify-between text-sm">
      <span class="text-blue-500 font-medium capitalize">{{ task.status }}</span>
      <div class="space-x-2">
        <button @click="$emit('edit', task)" class="text-yellow-500 hover:text-yellow-600">
          ✏️
        </button>
        <button @click="$emit('delete', task._id)" class="text-red-500 hover:text-red-600">
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: { type: Object, required: true },
})
defineEmits(['edit', 'delete'])
</script>
