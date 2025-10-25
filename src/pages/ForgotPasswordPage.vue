<template>
  <div class="flex min-h-screen">
    <!-- Left section -->
    <div
      class="hidden md:flex w-1/2 bg-cover bg-center relative"
      style="background-image: url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')"
    >
      <div class="absolute inset-0 bg-black/60 flex items-end p-12">
        <h2 class="text-white text-3xl font-bold leading-snug">
          Forgot your password? Let’s get you back in.
        </h2>
      </div>
    </div>

    <!-- Right section -->
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 bg-black text-white p-8">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-8 text-center">Forgot Password</h1>

        <form @submit.prevent="submitEmail" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:border-teal-400"
          />

          <button
            type="submit"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition"
          >
            Send Reset Link
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
import {useRouter}  from 'vue-router'

const email = ref('')

const router = useRouter()

const submitEmail = async () => {
  try {
    await axios.post('https://fullstack-test-mileapp-be-production.up.railway.app/login/forgot-password', { email: email.value })
    alert('Password reset link sent to your email.')
    router.push('/verify-reset-token')
  } catch (err) {
    alert('Error sending reset link.')
    console.error(err)
  }
}
</script>
