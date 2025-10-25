<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col p-6">
      <h2 class="text-2xl font-bold mb-8">MileTask</h2>
      <nav class="flex-1 space-y-2">
        <router-link to="/tasks" class="block py-2 px-3 rounded hover:bg-gray-800">Tasks</router-link>
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

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Tasks</h1>
        <div class="space-x-2">
          <input
            v-model="search"
            placeholder="Search..."
            class="border px-3 py-1 rounded"
          />
          <select v-model="status" class="border px-2 py-1 rounded">
            <option value="">All Status</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button @click="fetchTasks" class="bg-blue-500 text-white px-3 py-1 rounded">
            Filter
          </button>
          <button
            @click="openModal()"
            class="bg-green-500 text-white px-3 py-1 rounded"
          >
            + Task
          </button>
        </div>
      </div>

      <!-- Table -->
      <TaskTable
        :tasks="tasks"
        :user-role="user.role"
        @edit="openModal"
        @delete="deleteTask"
      />

      <!-- Pagination -->
      <div class="flex justify-between mt-4">
        <button
          :disabled="meta.page === 1"
          @click="prevPage"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {{ meta.page }} of {{ meta.pages }}</span>
        <button
          :disabled="meta.page === meta.pages"
          @click="nextPage"
          class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import TaskTable from "../components/TaskTable-old.vue"
import TaskModal from "../components/TaskModal.vue"
import ToastTask from "../components/ToastTask.vue"

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem("user") || "{}"))
const token = localStorage.getItem("token")

const tasks = ref([])
const meta = ref({ page: 1, limit: 10, pages: 1 })
const search = ref("")
const status = ref("")

const modalOpen = ref(false)
const selected = ref(null)

const fetchTasks = async () => {
  try {
    const res = await axios.get("https://fullstack-test-mileapp-be-production.up.railway.app/task", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: meta.value.page,
        limit: meta.value.limit,
        search: search.value,
        status: status.value,
        sort: "-createdAt",
      },
    })
    tasks.value = res.data.data
    meta.value = res.data.meta
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchTasks)

const prevPage = () => {
  if (meta.value.page > 1) {
    meta.value.page--
    fetchTasks()
  }
}
const nextPage = () => {
  if (meta.value.page < meta.value.pages) {
    meta.value.page++
    fetchTasks()
  }
}

const openModal = (task = null) => {
  selected.value = task
  modalOpen.value = true
}
const closeModal = () => {
  modalOpen.value = false
  selected.value = null
}
const saveTask = async () => {
  await fetchTasks()
  closeModal()
}
const deleteTask = async () => {
  await fetchTasks()
}

// Logout
const logout = async () => {
  try {
    await axios.post("https://fullstack-test-mileapp-be-production.up.railway.app/login/logout")
  } catch (err) {
    console.error(err)
  } finally {
    localStorage.clear()
    router.push("/login")
  }
}
</script>
