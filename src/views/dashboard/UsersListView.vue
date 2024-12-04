<script setup lang="ts">
import { ref } from 'vue' ;
import BaseTable from '@/components/common/BaseTable.vue';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue';
import BaseButton from '@/components/common/BaseButton.vue';

import { ByEdit, BsTrash } from '@kalimahapps/vue-icons';

const pagination = ref({
  total: 4,
  currPage: 1
})

const usersList = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'sHl9D@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'bM7oJ@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'David Lee',
    email: '4m0bI@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Emma Brown',
    email: '2dXJf@example.com',
    role: 'Admin',
    status: 'Inactive',
  },
])

const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const deleteUser = (id: string) => {
  //
}
</script>

<template>
  <DashboardLayout title="Users">
    <BaseTable
      :headers="[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ]"
      title="Users List"
      :items="usersList"
      :pagination="pagination"
      :perPageLimit="[10, 25, 50]"
      :isLoading="isLoading"
      searchable
      @fetch="fetchData"
    >
      <template #header-action="{ item }">
        <div class="flex items-center gap-2">
          <BaseButton :icon="ByEdit" variant="tertiary" class="!px-2" @click="$router.push({ name: 'edit-user', params: { id: item.id }})" />
          <BaseButton :icon="BsTrash" variant="tertiary" class="!px-2 text-red-500" @click="deleteUser(item.id)" />
        </div>
      </template>
    </BaseTable>
  </DashboardLayout>
</template>
