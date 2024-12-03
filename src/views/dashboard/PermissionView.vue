<script setup lang="ts">
import { ref } from 'vue'
// import PermissionList from '@/components/views/permissions/PermissionList.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue';

import type { Module, Permission } from '@/components/views/permissions/types'

const moduleData = ref<Module>({
  title: '',
  description: '',
  slug: '',
  permissions: []
})

const permissionData = ref<Permission>({
  title: '',
  description: '',
  module: '',
  slug: ''
})

const permissions = ref<Module[]>([])

const addModule = () => {
  console.log('Module added:', moduleData.value)
}

const addPermission = () => {
  console.log('Module added:', permissionData.value)
}
</script>

<template>
  <DashboardLayout title="Permissions">
    <div class="p-4 space-y-6">
      <div class="bg-white dark:bg-gray-800 shadow rounded p-4">
        <h2 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Add Module & Permissions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form
            @submit.prevent="addModule"
            class="bg-gray-50 dark:bg-gray-900 rounded p-4 shadow-md space-y-4"
          >
            <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200">Add Module</h3>
            <BaseInput variant="secondary" v-model="moduleData.title" name="title" type="text" label="Module Title" placeholder="Enter module title" required />
            <BaseInput variant="secondary" v-model="moduleData.description" name="description" type="textarea" label="Description" placeholder="Enter module description" required />
            <BaseInput variant="secondary" v-model="moduleData.slug" name="slug" type="text" label="Slug" placeholder="Enter slug (alphabet only)" pattern="[A-Za-z]+" required />
            <BaseButton type="submit" class="w-full" label="Add Module" variant="primary" />
          </form>

          <form
            @submit.prevent="addPermission"
            class="bg-gray-50 dark:bg-gray-900 rounded p-4 shadow-md space-y-4"
          >
            <h3 class="text-base font-semibold text-gray-800 dark:text-gray-200">Add Permission</h3>
            <BaseInput variant="secondary" v-model="permissionData.title" name="title" type="text" label="Permission Title" placeholder="Enter permission title" required />
            <BaseInput variant="secondary" v-model="permissionData.description" name="description" type="textarea" label="Description" placeholder="Enter permission description" required />
            <BaseInput variant="secondary" v-model="permissionData.slug" name="slug" type="text" label="Slug" placeholder="Enter slug (alphabet only)" pattern="[A-Za-z]+" required />
            <BaseInput variant="secondary" type="select" v-model="permissionData.module" name="module" label="Module" required>
              <template #options>
                <option v-for="module in permissions" :key="module.slug" :value="module.slug">{{ module.title }}</option>
              </template>
            </BaseInput>
            <BaseButton type="submit" class="w-full" label="Add Permission" variant="primary" />
          </form>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 shadow rounded p-4">
        <h2 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Permissions List</h2>
        <!-- <PermissionList :permissions="permissions" /> -->
      </div>
    </div>
  </DashboardLayout>
</template>
