<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="(list, status) in groupedTasks"
      :key="status"
      class="bg-gray-100 p-4 rounded-lg shadow"
      @dragover.prevent
      @drop="onDrop($event, status)"
    >
      <h3 class="text-lg font-bold mb-2 capitalize">{{ status }}</h3>
      <div
        v-for="task in list"
        :key="task._id"
        class="bg-white p-3 rounded mb-2 shadow cursor-move"
        draggable="true"
        @dragstart="onDragStart($event, task)"
      >
        <h4 class="font-semibold">{{ task.title }}</h4>
        <p class="text-sm text-gray-600">{{ task.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['move'])

let draggedTask = null

// ✅ Aman dari undefined error
const groupedTasks = computed(() => {
  const groups = {
    pending: [],
    'in-progress': [],
    done: [],
  }

  props.tasks.forEach((t) => {
    if (groups[t.status]) {
      groups[t.status].push(t)
    } else {
      // tangani task dengan status tidak dikenal
      groups.pending.push(t)
    }
  })
  return groups
})

const onDragStart = (e, task) => {
  draggedTask = task
}

const onDrop = (e, newStatus) => {
  if (draggedTask && newStatus && draggedTask.status !== newStatus) {
    emit('move', draggedTask._id, newStatus)
  }
  draggedTask = null
}
</script>

<style scoped>
.bg-gray-100 {
  min-height: 200px;
}
</style>
