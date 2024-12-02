<template>
  <div class="bg-white rounded shadow p-6 dark:bg-gray-800 overflow-x-auto">
    <h2 v-if="title" class="text-xl font-semibold mb-4 dark:text-white">
      {{ title }}
    </h2>

    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="text-left text-gray-500 border-b dark:text-gray-400 dark:border-gray-700">
          <th
            v-for="header in headers"
            :key="header.key"
            class="py-2 px-4 font-medium cursor-pointer"
            @click="header.sortable && onSortByClick(header.key)"
          >
            <div class="flex items-center gap-2">
              <span>{{ header.label }}</span>
              <!-- Sort Icon -->
              <ClArrowDownSm
                v-if="header.sortable"
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': sortBy === header.key }"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="(item.id || index) as string"
          class="border-b last:border-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="py-2 px-4 text-gray-800 dark:text-gray-300"
          >
            <slot name="item" :item="item[header.key]" :header="header.key">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="paginated" class="mt-4 flex justify-end gap-2">
      <BaseButton
        class="px-4 py-2"
        :disabled="currentPage === 1"
        @click="onPageChange((currentPage as number) - 1)"
        variant="tertiary"
      >
        Previous
      </BaseButton>
      <span class="px-4 py-2 text-gray-500 dark:text-gray-400">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <BaseButton
        class="px-4 py-2"
        :disabled="currentPage === totalPages"
        @click="onPageChange((currentPage as number) + 1)"
        variant="tertiary"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ClArrowDownSm } from '@kalimahapps/vue-icons'
import BaseButton from '@/components/common/BaseButton.vue'

defineProps<{
  headers: { label: string; key: string; sortable?: boolean }[]
  items: Record<string, unknown>[]
  title?: string
  paginated?: boolean
  totalPages?: number
  currentPage?: number
}>()

const emit = defineEmits<{
  (e: 'sort', key: string): void
  (e: 'page-change', page: number): void
}>()

const sortBy = ref('')

const onSortByClick = (key: string) => {
  sortBy.value = key
  emit('sort', key)
}

const onPageChange = (page: number) => {
  emit('page-change', page)
}
</script>
