<script setup lang="ts">
import { ref } from 'vue'
import PermissionList from '@/components/views/permissions/PermissionList.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

interface PermissionGroup {
  id: number
  title: string
  description: string
  checked: boolean
  children?: PermissionGroup[]
}

const permissions = ref<PermissionGroup[]>([
  {
    id: 1,
    title: 'User Management',
    description: 'Manage user-related permissions',
    checked: false,
    children: [
      { id: 11, title: 'View Users', description: 'Permission to view users', checked: false },
      { id: 12, title: 'Edit Users', description: 'Permission to edit users', checked: false },
    ],
  },
  {
    id: 2,
    title: 'Content Management',
    description: 'Manage content-related permissions',
    checked: false,
    children: [
      { id: 21, title: 'View Content', description: 'Permission to view content', checked: false },
      { id: 22, title: 'Edit Content', description: 'Permission to edit content', checked: false },
    ],
  },
])

const removePermissionGroup = (groupId: number) => {
  permissions.value = permissions.value.filter((group) => group.id !== groupId)
}

const removePermission = (groupId: number, permissionId: number) => {
  const group = permissions.value.find((group) => group.id === groupId)
  if (group) {
    group.children = group.children.filter((perm) => perm.id !== permissionId)
  }
}
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="bg-white dark:bg-gray-800 shadow rounded p-4">
      <h2 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Permissions</h2>
      <PermissionList
        :permissions="permissions"
        @remove-group="removePermissionGroup"
        @remove-permission="removePermission"
      />
    </div>

    <!-- Add Permission Form -->
    <div class="bg-white dark:bg-gray-800 shadow rounded p-4">
      <h2 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Add Permission</h2>
      <form @submit.prevent="() => console.log('Permission added!')" class="space-y-4">
        <BaseInput
          name="title"
          type="text"
          label="Permission Title"
          placeholder="Enter permission title"
          required
        />
        <BaseInput
          name="description"
          type="textarea"
          label="Description"
          placeholder="Enter permission description"
          required
        />
        <BaseInput
          name="parent"
          type="text"
          label="Parent Group"
          placeholder="Enter parent group"
        />
        <BaseInput
          name="key"
          type="text"
          label="Key (slug)"
          placeholder="Enter unique key"
          required
        />
        <BaseButton type="submit" class="w-full">Add Permission</BaseButton>
      </form>
    </div>
  </div>
</template>
