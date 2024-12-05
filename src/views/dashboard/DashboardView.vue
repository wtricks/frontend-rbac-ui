<script setup lang="ts">
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore()

// TODO: fetch data, maybe from api
// We can use JSON server for this, but for now we'll use a simple array
// beacuse now our main focus on RBAC
const stats = [
  { label: 'Users', value: 1250, icon: '👤' },
  { label: 'Revenue', value: '$45,700', icon: '💰' },
  { label: 'Active Subscriptions', value: 340, icon: '📈' },
  { label: 'Support Tickets', value: 15, icon: '🎫' },
]

// TODO: fetch data, maybe from api
// We can use JSON server for this, but for now we'll use a simple array
// beacuse now our main focus on RBAC
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

    <BaseTable
      :headers="[
        { key: 'user', label: 'User' },
        { key: 'action', label: 'Action' },
        { key: 'time', label: 'Time' },
      ]"
      :items="activities"
      title="Recent Activities"
    />
  </DashboardLayout>
</template>
