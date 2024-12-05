<script setup lang="ts">
import { ref } from 'vue'

import BaseTable from '@/components/common/BaseTable.vue'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue'

const isLoading = ref(false)
const pagination = ref({
  total: 10,
  currPage: 1,
})

// TODO: fetch data, maybe from api
// We can use JSON server for this, but for now we'll use a simple array
// beacuse now our main focus on RBAC
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
])

const fetchData = async () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 1000);
}
</script>

<template>
  <DashboardLayout title="Activity" :permissions="'view:activity-logs'">
    <BaseTable
      :headers="[
        { key: 'user', label: 'User', sortable: true },
        { key: 'action', label: 'Action' },
        { key: 'time', label: 'Time' },
      ]"
      :items="activities"
      :per-page-limit="[10, 25, 50]"
      searchable
      title="Recent Activities"
      :is-loading="isLoading"
      :pagination="pagination"
      @fetch="fetchData"
    />
  </DashboardLayout>
</template>
