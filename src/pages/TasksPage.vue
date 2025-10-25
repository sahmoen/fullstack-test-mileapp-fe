<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col p-6">
      <h2 class="text-2xl font-bold mb-8">MileTask</h2>
      <nav class="flex-1 space-y-2">
        <router-link
          to="/tasks"
          class="block py-2 px-3 rounded hover:bg-gray-800"
          >Tasks</router-link
        >
        <button
          v-if="user?.role === 'admin'"
          @click="router.push('/add-user')"
          class="w-full text-left py-2 px-3 rounded hover:bg-gray-800"
        >
          Add User
        </button>
      </nav>
      <button
        @click="logout"
        class="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
      >
        Logout
      </button>
    </aside>

    <!-- Main content -->
    <div class="flex-1 p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Tasks</h1>
        <div class="space-x-2">
          <button
            @click="openModal()"
            class="bg-green-500 text-white px-3 py-2 rounded"
          >
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../stores/tasks'
import { useToast } from '../composables/useToast'
import TaskTable from '../components/TaskTable-old.vue'
import TaskCard from '../components/TaskCard.vue'
import TaskKanban from '../components/TaskKanban-old.vue'
import TaskModal from '../components/TaskModal.vue'
import ToastTask from '../components/ToastTask.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTaskStore()
const { showToast } = useToast()
const tasks = computed(() => store.tasks)
const view = ref('kanban')
const modalOpen = ref(false)
const selected = ref(null)
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const btnClass = (v) =>
  `px-3 py-1 rounded ${view.value === v ? 'bg-blue-500 text-white' : 'bg-gray-200'}`

// onMounted(() => store.fetchTasks())

onMounted(async () => {
  try {
    await store.fetchTasks()
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    if (err.response?.status === 401) {
      localStorage.clear()
      router.push('/login')
    }
  }
})

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

// Logout handler
const logout = async () => {
  try {
    await axios.post('http://localhost:5000/login/logout')
  } catch (err) {
    console.error(err)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    router.push('/login')
  }
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
