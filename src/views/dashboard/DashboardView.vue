<script setup lang="ts">
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue'

const stats = [
  { label: 'Users', value: 1250, icon: '👤' },
  { label: 'Revenue', value: '$45,700', icon: '💰' },
  { label: 'Active Subscriptions', value: 340, icon: '📈' },
  { label: 'Support Tickets', value: 15, icon: '🎫' },
]

const activities = [
  { user: 'John Doe', action: 'Created a new post', time: '2 hours ago' },
  { user: 'Jane Smith', action: 'Updated profile picture', time: '4 hours ago' },
  { user: 'David Lee', action: 'Commented on a post', time: '6 hours ago' },
  { user: 'Emma Brown', action: 'Joined the platform', time: '1 day ago' },
]
</script>

<template>
  <DashboardLayout title="Dashboard">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="flex items-center gap-4 p-4 bg-white rounded shadow dark:bg-gray-800"
      >
        <div class="text-4xl">{{ stat.icon }}</div>
        <div>
          <p class="text-xl font-semibold dark:text-gray-300">{{ stat.value }}</p>
          <p class="text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded shadow p-6 dark:bg-gray-800">
      <h2 class="text-xl font-semibold mb-4 dark:text-white">Recent Activities</h2>
      <table class="w-full table-auto">
        <thead>
          <tr class="text-left text-gray-500 border-b dark:text-gray-400 dark:border-gray-700">
            <th class="py-2">User</th>
            <th class="py-2">Action</th>
            <th class="py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="activity in activities"
            :key="activity.user + activity.time"
            class="border-b dark:border-gray-700 text-gray-800 dark:text-gray-500 last:border-0"
          >
            <td class="py-2">{{ activity.user }}</td>
            <td class="py-2">{{ activity.action }}</td>
            <td class="py-2 text-gray-500 dark:text-gray-400">{{ activity.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>
