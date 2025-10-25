<template>
  <div class="flex min-h-screen">
    <!-- Left section -->
    <div
      class="hidden md:flex w-1/2 bg-cover bg-center relative"
      style="background-image: url('https://images.unsplash.com/photo-1587614382346-ac7c2b7a9a9b')"
    >
      <div class="absolute inset-0 bg-black/60 flex items-end p-12">
        <h2 class="text-white text-3xl font-bold leading-snug">
          Set a new password and continue with MileTask.
        </h2>
      </div>
    </div>

    <!-- Right section -->
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 bg-black text-white p-8">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">Reset Password</h1>

        <form @submit.prevent="resetPassword" class="space-y-4">
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="New Password"
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

          <button
            type="submit"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition"
          >
            Reset Password
          </button>

          <div class="text-center mt-4">
            <router-link to="/login" class="text-gray-400 hover:underline">
              Back to Login
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
import { useRoute, useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const password = ref('')
const showPassword = ref(false)
const route = useRoute()
const router = useRouter()

const togglePassword = () => (showPassword.value = !showPassword.value)

const resetPassword = async () => {
  try {
    const token = route.query.token

    await axios.post('https://fullstack-test-mileapp-be-production.up.railway.app/login/reset-password', { token, password: password.value })
    alert('Password reset successful. You can now log in.')
    router.push('/login')
  } catch (err) {
    alert('Error resetting password.')
    console.error(err)
  }
}
</script>
