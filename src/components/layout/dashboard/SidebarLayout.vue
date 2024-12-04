<template>
  <aside
    class="flex flex-col z-30 w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 fixed md:static top-0 left-0 h-screen"
    :class="{ 'md:w-20 -translate-x-full md:translate-x-0': isCollapsed }"
  >
    <div class="flex items-center justify-center h-16 border-b dark:border-gray-700 px-4">
      <img
        :src="Logo"
        alt="Logo"
        class="size-10 transition-all"
        :class="{ 'md:size-8': debounceCollapsed }"
      />
      <span
        class="ml-2 text-xl font-bold text-gray-800 dark:text-gray-200"
        :class="{ 'md:hidden': debounceCollapsed }"
      >
        Admin
      </span>

      <BaseButton
        :icon="RaCross2"
        @click="$emit('update:isCollapsed', !isCollapsed)"
        class="md:hidden !px-2 ml-auto"
        variant="tertiary"
      />
    </div>

    <nav class="flex flex-col flex-1 p-4">
      <SidebarMenuItem :items="menuItems" :collapsed="debounceCollapsed" />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import {
  AnOutlinedLock,
  CaUserSettings,
  AnOutlinedUserAdd,
  BsGrid1x2,
  LuUsers,
  RaCross2,
} from '@kalimahapps/vue-icons'

import SidebarMenuItem from './SidebarMenuItem.vue'
import Logo from '@/assets/logo.png'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps<{ isCollapsed: boolean }>()

const isMenuCollapsed = ref(props.isCollapsed)
const debounceCollapsed = computed(() => (props.isCollapsed ? true : isMenuCollapsed.value))
const debouncedRequest = useDebounceFn(() => (isMenuCollapsed.value = props.isCollapsed), 100)

watch(() => props.isCollapsed, debouncedRequest)

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: BsGrid1x2,
  },
  {
    label: 'Users',
    icon: LuUsers,
    children: [
      {
        label: 'New User',
        path: '/dashboard/users/new',
        icon: AnOutlinedUserAdd,
      },
      {
        label: 'View Users',
        path: '/dashboard/users',
        icon: LuUsers,
      },
      {
        label: 'Roles',
        path: '/dashboard/users/roles',
        icon: CaUserSettings,
      },
    ],
  },
]
</script>
