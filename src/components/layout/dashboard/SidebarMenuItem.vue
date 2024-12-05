<template>
  <ul class="space-y-2">
    <template v-for="item in items" :key="item.label">
      <li v-if="item.canBeShown">
        <component :is="item.path ? 'router-link' : 'div'" :to="item.path"
          class="flex items-center gap-4 px-4 py-2.5 mb-2 text-gray-600 transition-all duration-200 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer"
          :exact-active-class="'bg-gray-200 dark:bg-gray-700 dark:text-white'" @click="isShowing = !isShowing">
          <component :is="item.icon" class="text-lg" />
          <span class="select-none" :class="{ 'md:hidden': collapsed }">{{ item.label
            }}</span>
          <BsArrowRightShort v-if="item.children" class="text-lg ml-auto"
            :class="{ 'rotate-90': isShowing, 'md:hidden': collapsed }" />
        </component>

        <Transition name="slide-fade">
          <SidebarMenuItem v-if="item.children && isShowing" :items="item.children" :collapsed="collapsed"
            class="ml-4" />
        </Transition>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BsArrowRightShort } from '@kalimahapps/vue-icons'

import type { SidebarMenuItem } from './types'

const p = defineProps<{
  items: SidebarMenuItem[]
  collapsed: boolean
}>()

const isShowing = ref(false)
</script>
