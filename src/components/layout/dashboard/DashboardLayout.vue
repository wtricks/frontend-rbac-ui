<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <SidebarLayout :isCollapsed="isCollapsed" @update:isCollapsed="isCollapsed = $event" />

    <div class="flex-1 flex flex-col">
      <header
        class="flex items-center justify-between h-16 px-2 md:px-4 bg-white shadow-sm dark:bg-gray-800"
      >
        <div class="flex items-center gap-2">
          <BaseButton
            type="button"
            :icon="AnOutlinedMenu"
            variant="tertiary"
            class="!px-2 mr-2"
            @click="isCollapsed = !isCollapsed"
          />
          <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ title }}</h1>
        </div>

        <div class="flex items-center">
          <BaseButton
            type="button"
            :icon="isDark ? AnOutlinedMoon : AnOutlinedSun"
            variant="tertiary"
            class="!px-2"
            @click="isDark = !isDark"
          />
          <span class="text-sm text-gray-600 dark:text-gray-400 select-none block mx-2">|</span>
          <BaseButton
            type="button"
            :icon="AkBell"
            variant="tertiary"
            class="!px-2 mr-2"
            @click="$router.push({ name: 'activity' })"
          />
          <div class="relative">
            <BaseButton
              type="button"
              :icon="BxUser"
              variant="tertiary"
              class="!px-2"
              @click="showProfileMenu = !showProfileMenu"
            />

            <div class="absolute top-0 right-0 size-1 bg-green-500 rounded-full">
              <span class="sr-only">Online</span>
            </div>

            <transition name="slide-fade">
              <ul
                v-if="showProfileMenu"
                ref="menuRef"
                class="absolute z-10 top-10 right-0 w-32 bg-white rounded shadow overflow-hidden bg-white dark:bg-gray-800"
              >
                <li
                  @click="$router.push({ name: 'profile' })"
                  class="px-4 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-2"
                >
                  <BxUser class="mr-2 size-5" />
                  <span>Profile</span>
                </li>
                <li
                  @click="onLogout"
                  class="px-4 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-300 flex items-center gap-2"
                >
                  <BxLogOutCircle class="mr-2 size-5" />
                  <span>Logout</span>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </header>

      <main class="flex-1 p-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { BxLogOutCircle } from '@kalimahapps/vue-icons'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'
import {
  AnOutlinedMenu,
  BxUser,
  AkBell,
  AnOutlinedMoon,
  AnOutlinedSun,
} from '@kalimahapps/vue-icons'

import SidebarLayout from './SidebarLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'

defineProps<{ title: string }>()

const isDark = useLocalStorage('_theme_', false)
const isCollapsed = ref(window.innerWidth < 768)
const showProfileMenu = ref(false)
const menuRef = ref<HTMLLIElement>()

onClickOutside(menuRef, () => {
  showProfileMenu.value = false
})

useEventListener(window, 'resize', () => {
  isCollapsed.value = window.innerWidth < 768
})

watch(isDark, () => {
  document.body.classList.toggle('dark')
})

const onLogout = () => {
  //
}
</script>
