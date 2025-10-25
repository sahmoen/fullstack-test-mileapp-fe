<template>
  <div class="flex min-h-screen">
    <!-- Left section -->
    <div
      class="hidden md:flex w-1/2 bg-cover bg-center relative"
      style="background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')"
    >
      <div class="absolute inset-0 bg-black/60 flex items-end p-12">
        <h2 class="text-white text-3xl font-bold leading-snug">
          Verify your reset token to continue.
        </h2>
      </div>
    </div>

    <!-- Right section -->
    <div
      class="flex flex-col justify-center items-center w-full md:w-1/2 bg-black text-white p-8"
    >
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">Verify Token</h1>

        <form @submit.prevent="verifyToken" class="space-y-4">
          <input
            v-model="token"
            type="text"
            placeholder="Enter verification token"
            class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
          />

          <button
            type="submit"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition"
          >
            Verify Token
          </button>

          <div class="text-center mt-4">
            <router-link to="/login" class="text-gray-400 hover:underline">
              Back to Login
            </router-link>
          </div>

          <p v-if="error" class="text-red-500 text-center mt-3">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const token = ref('')
const error = ref('')
const router = useRouter()

const verifyToken = async () => {
  try {
    await axios.get(`https://fullstack-test-mileapp-be-production.up.railway.app/login/verify-reset-token/${token.value}`)
    router.push(`/reset-password?token=${token.value}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Invalid or expired token.'
  }
}
</script>
