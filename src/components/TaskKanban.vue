<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="status in statuses" :key="status" class="bg-gray-100 p-3 rounded-lg">
      <h3 class="font-semibold mb-2">{{ status }}</h3>
      <draggable :list="groupedTasks[status]" group="tasks" @end="onDragEnd" item-key="_id">
        <template #item="{ element }">
          <div class="bg-white shadow rounded p-3 mb-2 border">
            <p class="font-medium">{{ element.title }}</p>
            <p class="text-sm text-gray-500">{{ element.description }}</p>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { computed } from 'vue'

const props = defineProps({ tasks: Array })
const emit = defineEmits(['move'])

const statuses = ['pending', 'in progress', 'completed']

const groupedTasks = computed(() => {
  const groups = { pending: [], 'in progress': [], completed: [] }
  props.tasks.forEach((t) => groups[t.status || 'pending'].push(t))
  return groups
})

const onDragEnd = (evt) => {
  const moved = evt.item.__draggable_context.element
  const newStatus = evt.to.parentNode.querySelector('h3').textContent
  emit('move', moved._id, newStatus.toLowerCase())
}
</script>
