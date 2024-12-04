<template>
  <div class="bg-white rounded shadow p-6 dark:bg-gray-800 overflow-x-auto relative">
    <div v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-800 z-10">
      <div class="flex items-center gap-2">
        <span class="rounded-full w-6 h-6 border-4 border-t-transparent border-gray-500 animate-spin"></span>
        <span class="text-gray-600 dark:text-gray-400">Loading...</span>
      </div>
    </div>

    <div class="grid items-center mb-4 grid-cols-1 md:grid-cols-2">
      <h2 v-if="title" class="text-xl font-semibold dark:text-white">
        {{ title }}
      </h2>

      <div v-if="searchable" class="flex items-center gap-4 ml-auto mt-2 md:mt-0 w-full md:w-auto">
        <BaseInput v-model="searchQuery" type="search" placeholder="Search..." class="md:max-w-64" name="search"
          variant="secondary" @input="onSearch" />
        <BaseInput v-if="perPageLimit" v-model="perPage" type="select" name="perPage" variant="secondary"
          class="max-w-20">
          <template #options>
            <option v-for="limit in perPageLimit" :key="limit" :value="limit">{{ limit }}</option>
          </template>
        </BaseInput>
      </div>
    </div>

    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="text-left text-gray-500 border-b dark:text-gray-400 dark:border-gray-700">
          <th v-for="header in headers" :key="header.key" class="py-2 px-4 font-medium cursor-pointer"
            @click="header.sortable && onSort(header.key)">
            <div class="flex items-center gap-2">
              <span>{{ header.label }}</span>
              <div v-if="header.sortable"
                class="w-4 h-4 mt-1 ml-auto transition-transform duration-200 text-xs flex flex-col gap-1 items-center text-gray-500 dark:text-gray-400"
                style="line-height: 0.5; font-size: 8px;">
                <span class="transition-colors" :class="{
                  'text-primary-500': sortBy === header.key && sortDirection === 'asc'
                }">
                  ▲
                </span>
                <span class="transition-colors" :class="{
                  'text-primary-500': sortBy === header.key && sortDirection === 'desc'
                }">
                  ▼
                </span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="(item.id || index) as string"
          class="border-b last:border-0 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
          <td v-for="header in headers" :key="header.key" class="py-2 px-4 text-gray-800 dark:text-gray-300">
            <template v-if="$slots[`header-${header.key}`]">
              <slot :name="`header-${header.key}`" :item="item" :header="header.key"></slot>
            </template>
            <span>{{ item[header.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="pagination" class="mt-4 flex justify-end gap-2">
      <BaseButton class="px-4 py-2" :disabled="pagination.currPage === 1" @click="changePage(pagination.currPage - 1)"
        variant="tertiary" label="Previous" />
      <span class="px-4 py-2 text-gray-500 dark:text-gray-400">
        Page {{ pagination.currPage }} of {{ pagination.total }}
      </span>
      <BaseButton class="px-4 py-2" :disabled="pagination.currPage === pagination.total"
        @click="changePage(pagination.currPage + 1)" variant="tertiary" label="Next" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, onBeforeMount } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'

defineSlots<{
  [key: string]: {
    item: T
    header: string
  }
}>();

const props = defineProps<{
  headers: { label: string; key: string; sortable?: boolean }[]
  items?: T[]
  title?: string
  searchable?: boolean
  isLoading?: boolean
  perPageLimit?: number[]
  pagination?: {
    total: number
    currPage: number
  }
}>()

const emit = defineEmits<{
  (e: 'fetch', { query, page, perPage, sortBy, sortDirection }: { query: string; page: number; perPage: number; sortBy: string | null, sortDirection: 'asc' | 'desc' | null }): void
  (e: 'change-limit', perPage: number): void
}>()

const perPage = ref(10)
const searchQuery = ref('')
const sortBy = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc' | null>(null);

const fetchData = (params?: Record<string, unknown>) => {
  emit('fetch', {
    query: searchQuery.value,
    page: props.pagination?.currPage || 1,
    perPage: perPage.value,
    sortBy: sortBy.value,
    sortDirection: sortDirection.value,
    ...(params || {}),
  })
}

const onSearch = useDebounceFn(fetchData, 300)

const onSort = (key: string) => {
  if (sortBy.value === key) {
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc';
    } else if (sortDirection.value === 'desc') {
      sortBy.value = null;
      sortDirection.value = null;
    } else {
      sortDirection.value = 'asc';
    }
  } else {
    sortBy.value = key;
    sortDirection.value = 'asc';
  }

  fetchData()
}

const changePage = (page: number) => {
  if (props.pagination) {
    fetchData({ page })
  }
}

onBeforeMount(fetchData)
</script>
