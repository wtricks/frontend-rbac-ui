<script setup lang="ts">
import { useToast } from 'vue-toastification';
import BaseTable from '@/components/common/BaseTable.vue';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue';
import BaseButton from '@/components/common/BaseButton.vue';

import { ByEdit, BsTrash } from '@kalimahapps/vue-icons';
import useUsersStore from '@/stores/useUsersStore';
import type { User } from '@/services/authServices';
import type { TableFetchData } from '@/components/common/types';
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore()
const usersStore = useUsersStore()
const toast = useToast()

const fetchUser = (params: TableFetchData) => {
  usersStore.fetchAllUsers({
    page: params.page,
    pageSize: params.perPage,
    sortBy: params.sortBy || "name",
    sortDirection: params.sortDirection || "desc",
    search: params.query
  }).catch((err) => {
    toast.error(err)
  })
}

const deleteUser = (user: User) => {
  if (!window.confirm('Are you sure you want to delete this user?')) {
    return
  }

  if (authStore.user?.id === user.id) {
    toast.error('You cannot delete your own account')
    return
  }

  usersStore.deleteUserAccount(user.id)
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
      :items="usersStore.users"
      :pagination="usersStore.pagination"
      :perPageLimit="[10, 25, 50]"
      :isLoading="usersStore.loading"
      searchable
      @fetch="fetchUser"
    >
      <template #header-action="{ item }">
        <div class="flex items-center gap-2">
          <BaseButton type="button" :icon="ByEdit" variant="tertiary" class="!px-2" @click="$router.push({ name: 'edit-user', params: { id: (item as User).id }})" />
          <BaseButton type="button" :icon="BsTrash" variant="tertiary" class="!px-2 text-red-500" @click="deleteUser(item as User)" />
        </div>
      </template>
    </BaseTable>
  </DashboardLayout>
</template>
