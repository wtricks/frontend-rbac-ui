<script setup lang="ts">
import { ref } from 'vue'

import BaseTable from '@/components/common/BaseTable.vue'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue'

const activities = ref([
  { user: 'John Doe', action: 'Created a new post', time: '2 hours ago' },
  { user: 'Jane Smith', action: 'Updated profile picture', time: '4 hours ago' },
  { user: 'David Lee', action: 'Commented on a post', time: '6 hours ago' },
  { user: 'Emma Brown', action: 'Joined the platform', time: '1 day ago' },
  { user: 'John Doe', action: 'Created a new post', time: '2 hours ago' },
  { user: 'Jane Smith', action: 'Updated profile picture', time: '4 hours ago' },
  { user: 'David Lee', action: 'Commented on a post', time: '6 hours ago' },
  { user: 'Emma Brown', action: 'Joined the platform', time: '1 day ago' },
  { user: 'John Doe', action: 'Created a new post', time: '2 hours ago' },
  { user: 'Jane Smith', action: 'Updated profile picture', time: '4 hours ago' },
  { user: 'David Lee', action: 'Commented on a post', time: '6 hours ago' },
  { user: 'Emma Brown', action: 'Joined the platform', time: '1 day ago' },
  { user: 'John Doe', action: 'Created a new post', time: '2 hours ago' },
  { user: 'Jane Smith', action: 'Updated profile picture', time: '4 hours ago' },
  { user: 'David Lee', action: 'Commented on a post', time: '6 hours ago' },
  { user: 'Emma Brown', action: 'Joined the platform', time: '1 day ago' },
])
</script>

<template>
  <DashboardLayout title="Activity">
    <BaseTable
      :headers="[
        { key: 'user', label: 'User', sortable: true },
        { key: 'action', label: 'Action' },
        { key: 'time', label: 'Time' },
      ]"
      :items="activities"
      title="Recent Activities"
      paginated
      :total-pages="10"
      :current-page="1"
    />
  </DashboardLayout>
</template>
