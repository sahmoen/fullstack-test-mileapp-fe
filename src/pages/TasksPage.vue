<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Tasks</h1>
      <div class="space-x-2">
        <button @click="openModal()" class="bg-green-500 text-white px-3 py-2 rounded">
          + Task
        </button>
        <button @click="view = 'table'" :class="btnClass('table')">Table</button>
        <button @click="view = 'card'" :class="btnClass('card')">Card</button>
        <button @click="view = 'kanban'" :class="btnClass('kanban')">Kanban</button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="view === 'table'">
        <TaskTable :tasks="tasks" @edit="openModal" @delete="deleteTask" />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="view === 'card'" class="grid grid-cols-3 gap-4">
        <TaskCard
          v-for="t in tasks"
          :key="t._id"
          :task="t"
          @edit="openModal"
          @delete="deleteTask"
        />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="view === 'kanban'">
        <TaskKanban :tasks="tasks" @move="moveTask" />
      </div>
    </transition>

    <TaskModal
      :open="modalOpen"
      :editMode="!!selected"
      :task="selected"
      @save="saveTask"
      @close="closeModal"
    />
    <ToastTask />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../stores/tasks'
import { useToast } from '../composables/useToast'
import TaskTable from '../components/TaskTable.vue'
import TaskCard from '../components/TaskCard.vue'
import TaskKanban from '../components/TaskKanban.vue'
import TaskModal from '../components/TaskModal.vue'
import ToastTask from '../components/ToastTask.vue'

const store = useTaskStore()
const { showToast } = useToast()
const tasks = computed(() => store.tasks)
const view = ref('kanban')

const modalOpen = ref(false)
const selected = ref(null)

const btnClass = (v) =>
  `px-3 py-1 rounded ${view.value === v ? 'bg-blue-500 text-white' : 'bg-gray-200'}`

onMounted(() => store.fetchTasks())

const openModal = (task = null) => {
  selected.value = task
  modalOpen.value = true
}
const closeModal = () => {
  modalOpen.value = false
  selected.value = null
}
const saveTask = async (data) => {
  if (selected.value) {
    await store.updateTask(selected.value._id, data)
    showToast('Task updated successfully!', 'success')
  } else {
    await store.createTask(data)
    showToast('Task created!', 'success')
  }
  closeModal()
}
const deleteTask = async (id) => {
  await store.deleteTask(id)
  showToast('Task deleted!', 'success')
}
const moveTask = async (id, status) => {
  await store.moveTask(id, status)
  showToast(`Task moved to ${status}`, 'success')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
