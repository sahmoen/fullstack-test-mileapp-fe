<template>
  <div class="flex min-h-screen">
    <!-- Left section -->
    <div
      class="hidden md:flex w-1/2 bg-cover bg-center relative"
      style="background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')"
    >
      <div class="absolute inset-0 bg-black/60 flex items-end p-12">
        <h2 class="text-white text-3xl font-bold leading-snug">
          Add new users and manage your team easily.
        </h2>
      </div>
    </div>

    <!-- Right section -->
    <div
      class="flex flex-col justify-center items-center w-full md:w-1/2 bg-black text-white p-8"
    >
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">Add New User</h1>

        <form @submit.prevent="addUser" class="space-y-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
          />

          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
          />

          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Password"
              class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
            />
            <button
              type="button"
              class="absolute right-3 top-3 text-gray-400 hover:text-white"
              @click="togglePassword"
            >
              <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>

          <!-- Role Field -->
          <select
            v-model="role"
            class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
          >
            <option disabled value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition"
          >
            Add User
          </button>

          <div class="text-center mt-4">
            <router-link to="/tasks" class="text-gray-400 hover:underline">
              Back to Tasks
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const username = ref('')
const email = ref('')
const password = ref('')
const role = ref('')
const showPassword = ref(false)
const router = useRouter()

const togglePassword = () => (showPassword.value = !showPassword.value)

const addUser = async () => {
  try {
    const token = localStorage.getItem('token')

    await axios.post(
      'http://localhost:5000/login/register',
      {
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    alert('User added successfully!')
    router.push('/tasks')
  } catch (err) {
    if (err.response?.status === 403) {
      alert('You are not authorized to add users (403).')
    } else {
      alert('Failed to add user. Please try again.')
    }
    console.error(err)
  }
}

</script>
