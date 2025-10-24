import { defineStore } from 'pinia'
import api from '../api/axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    viewMode: 'kanban', // "table" | "card" | "kanban"
  }),
  actions: {
    async fetchTasks(params = {}) {
      const res = await api.get('/tasks', { params })
      this.tasks = res.data.data
    },
    async createTask(task) {
      await api.post('/tasks', task)
      await this.fetchTasks()
    },
    async updateTask(id, updates) {
      await api.put(`/tasks/${id}`, updates)
      await this.fetchTasks()
    },
    async deleteTask(id) {
      await api.delete(`/tasks/${id}`)
      await this.fetchTasks()
    },
    async moveTask(id, status) {
      await this.updateTask(id, { status })
    },
  },
})
