<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-2xl shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="identifier"
          placeholder="Username or Email"
          class="w-full border rounded px-3 py-2"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border rounded px-3 py-2"
        />
        <button class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const identifier = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  await auth.login(identifier.value, password.value)
  router.push('/tasks')
}
</script>
