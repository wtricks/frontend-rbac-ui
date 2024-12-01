<template>
  <div class="w-full overflow-x-auto">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <BaseInput
        v-if="searchable"
        v-model="searchQuery"
        placeholder="Search..."
        class="w-full max-w-sm"
        name="search"
        variant="secondary"
      />
      <slot name="options" />
    </div>

    <table class="table-auto w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <th
            v-for="header in headers"
            :key="header.key"
            class="py-2 px-4 cursor-pointer"
            @click="header.sortable ? sortData(header.key) : null"
          >
            <div class="flex items-center gap-2">
              <span>{{ header.label }}</span>
              <component
                v-if="header.sortable"
                :is="
                  sortedColumn === header.key
                    ? sortOrder === 'asc'
                      ? BsChevronUp
                      : BsChevronDown
                    : BsDash
                "
                class="text-sm"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in paginatedData"
          :key="row.id || rowIndex(row)"
          class="border-b dark:border-gray-700"
        >
          <td v-for="header in headers" :key="header.key" class="py-2 px-4">
            <slot name="row" :item="row[header.key]">{{ row[header.key] }}</slot>
          </td>
        </tr>
        <tr v-if="filteredData.length === 0">
          <td :colspan="headers.length" class="text-center py-4 text-gray-500 dark:text-gray-400">
            {{ emptyRowMessage || 'No data available.' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="paginatedData.length > 0 && paginated"
      class="flex justify-end mt-4 items-center gap-4 mb-10"
    >
      <BaseButton
        :disabled="currentPage === 1"
        @click="currentPage--"
        variant="tertiary"
        label="Previous"
      />
      <span class="text-gray-600 dark:text-gray-300">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <BaseButton
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        variant="tertiary"
        label="Next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { BsChevronUp, BsChevronDown, BsDash } from '@kalimahapps/vue-icons'

import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'

interface Header {
  label: string
  key: string
  sortable?: boolean
}

interface Props {
  headers: Header[]
  data: Record<string, string>[]
  searchable?: boolean
  paginated?: boolean
  rowsPerPage?: number
  emptyRowMessage?: string
}

const props = defineProps<Props>()
// const

const searchQuery = ref('')
const currentPage = ref(1)
const sortedColumn = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const filteredData = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) return props.data

  const query = searchQuery.value.toLowerCase()
  return props.data.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
  )
})

const sortedData = computed(() => {
  if (!sortedColumn.value) return filteredData.value

  return [...filteredData.value].sort((a, b) => {
    const aValue = a[sortedColumn.value!]
    const bValue = b[sortedColumn.value!]

    if (aValue === bValue) return 0
    if (sortOrder.value === 'asc') return aValue > bValue ? 1 : -1
    return aValue < bValue ? 1 : -1
  })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / props.rowsPerPage!))

const paginatedData = computed(() => {
  if (!props.paginated) return sortedData.value

  const start = (currentPage.value - 1) * props.rowsPerPage!
  return sortedData.value.slice(start, start + props.rowsPerPage!)
})

const sortData = (columnKey: string) => {
  if (sortedColumn.value === columnKey) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortedColumn.value = columnKey
    sortOrder.value = 'asc'
  }
}

const rowIndex = (row: Record<string, string>) => {
  return props.data.indexOf(row)
}
</script>
