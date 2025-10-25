<template>
  <div class="flex min-h-screen">
    <!-- Left section with background image -->
    <div
      class="hidden md:flex w-1/2 bg-cover bg-center relative"
      style="background-image: url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')"
    >
      <div class="absolute inset-0 bg-black/60 flex items-end p-12">
        <h2 class="text-white text-3xl font-bold leading-snug">
          Make your work organized with MileTask.
        </h2>
      </div>
    </div>

    <!-- Right section with login form -->
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 bg-black text-white p-8">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">Sign in</h1>

        <button
          class="flex items-center justify-center w-full border rounded-md py-2 bg-white text-black mb-6 hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            class="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <div class="flex items-center my-4">
          <div class="flex-grow h-px bg-gray-700"></div>
          <span class="px-3 text-gray-400 text-sm">or</span>
          <div class="flex-grow h-px bg-gray-700"></div>
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <input
              v-model="identifier"
              type="text"
              placeholder="Username"
              class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
            />
          </div>

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

          <div class="flex justify-between items-center text-sm">
            <router-link to="/signup" class="text-gray-400 hover:underline"
              >Don't have an account? Sign Up</router-link
            >
            <router-link to="/forgot-password" class="text-gray-400 hover:underline"
              >Forgot Password?</router-link
            >
          </div>

          <button
            type="submit"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition"
          >
            Sign in
          </button>
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

const identifier = ref('')
const password = ref('')
const router = useRouter()
const showPassword = ref(false)

const togglePassword = () => (showPassword.value = !showPassword.value)

const login = async () => {
  try {
    const res = await axios.post('https://fullstack-test-mileapp-be-production.up.railway.app/login/login', {
      identifier: identifier.value,
      password: password.value,
    })
    localStorage.setItem('user', JSON.stringify(res.data.user))
    localStorage.setItem('role', res.data.user.role)
    localStorage.setItem('token', res.data.accessToken)
    router.push('/tasks')
  } catch (err) {
    alert('Invalid email, username or password')
    console.error(err)
  }
}
</script>
