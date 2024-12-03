<script setup lang="ts">
import { BsX, BsChevronDown, BsChevronUp } from '@kalimahapps/vue-icons'

import CheckBox from '@/components/common/CheckBox.vue';

interface PermissionGroup {
  id: number
  title: string
  description: string
  checked: boolean
  expanded: boolean
  children: PermissionGroup[]
}

defineProps<{
  permissions: PermissionGroup[]
}>()

defineEmits(['remove-group', 'remove-permission'])

const toggleGroup = (group: PermissionGroup) => {
  group.expanded = !group.expanded
}

const toggleAllChildren = (group: PermissionGroup, checked: boolean) => {
  group.children.forEach((child) => (child.checked = checked))
}
</script>

<template>
  <div>
    <div v-for="group in permissions" :key="group.id" class="border rounded mb-4 overflow-hidden dark:border-gray-700">
      <div class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
        @click="toggleGroup(group)">
        <div class="flex items-center gap-2">
          <CheckBox v-model="group.checked" />
          <div>
            <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {{ group.title }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ group.description }}</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button @click.stop="$emit('remove-group', group.id)"
            class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
            <BsX class="w-5 h-5" />
          </button>
          <component :is="group.expanded ? BsChevronUp : BsChevronDown" class="w-5 h-5" />
        </div>
      </div>

      <div v-if="group.expanded" class="p-4 bg-gray-50 dark:bg-gray-800">
        <div v-for="child in group.children" :key="child.id" class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <CheckBox v-model="child.checked" />
            <div>
              <h4 class="text-sm text-gray-800 dark:text-gray-200">{{ child.title }}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ child.description }}</p>
            </div>
          </div>
          <button @click.stop="$emit('remove-permission', group.id, child.id)"
            class="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
            <BsX class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
