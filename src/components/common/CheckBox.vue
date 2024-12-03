<template>
  <div class="flex items-center space-x-3">
    <div
      @click="toggleCheckbox"
      class="relative flex justify-center items-center w-4 h-4 border-2 rounded-md cursor-pointer select-none transition-colors duration-200"
      :class="{
        'bg-blue-500 border-blue-500': isChecked,
        'bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600': !isChecked
      }"
    >
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <label
      @click="toggleCheckbox"
      class="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()

const isChecked = defineModel<boolean>()

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value
}
</script>
