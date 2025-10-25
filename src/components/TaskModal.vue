<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ editMode ? 'Edit Task' : 'Add Task' }}
      </h2>

      <form @submit.prevent="saveTask" class="space-y-3">
        <input
          v-model="form.title"
          placeholder="Title"
          class="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="w-full border rounded px-3 py-2"
        ></textarea>

        <select v-model="form.status" class="w-full border rounded px-3 py-2">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div class="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            {{ editMode ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  editMode: Boolean,
  task: Object,
})
const emit = defineEmits(['save', 'close'])

const form = reactive({
  title: '',
  description: '',
  status: 'pending',
})

watch(
  () => props.task,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true },
)

// const saveTask = () => {
//   emit('save', { ...form })
// }

const saveTask = () => {
  const payload = {
    title: form.title,
    description: form.description,
    status: form.status,
  }
  emit('save', payload)
}

</script>
