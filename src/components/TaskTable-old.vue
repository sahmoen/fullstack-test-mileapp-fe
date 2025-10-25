<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow rounded-xl">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Status</th>
          <th v-if="userRole === 'admin'" class="px-4 py-2">Owner</th>
          <th class="px-4 py-2">Created</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="t in tasks"
          :key="t._id"
          class="border-t hover:bg-gray-50 transition"
        >
          <td class="px-4 py-2">{{ t.title }}</td>
          <td class="px-4 py-2">{{ t.description }}</td>
          <td class="px-4 py-2 capitalize text-blue-600">{{ t.status }}</td>
          <td v-if="userRole === 'admin'" class="px-4 py-2 text-gray-600">
            {{ t.user?.username || t.user?.email || '-' }}
          </td>
          <td class="px-4 py-2 text-gray-500">
            {{ new Date(t.createdAt).toLocaleDateString() }}
          </td>
          <td class="px-4 py-2 space-x-2">
            <button @click="$emit('edit', t)" class="text-yellow-500 hover:text-yellow-600">✏️</button>
            <button @click="$emit('delete', t._id)" class="text-red-500 hover:text-red-600">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  tasks: { type: Array, required: true },
  userRole: { type: String, required: true },
})
defineEmits(["edit", "delete"])
</script>
