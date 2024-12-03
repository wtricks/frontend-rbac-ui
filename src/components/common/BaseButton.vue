<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 px-4 py-2 font-medium rounded focus:outline-none transition-all duration-300',
      variantClass,
      sizeClass,
      fullWidth ? 'w-full' : 'inline-block',
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg',
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon && !label" class="text-lg">
      <component :is="icon" />
    </span>
    <span v-if="label && !icon">{{ label }}</span>
    <span v-if="icon && label" class="flex items-center gap-2">
      <component :is="icon" />
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './types'

const props = defineProps<ButtonProps>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500'
    case 'secondary':
      return 'bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200'
    case 'outline':
      return 'border border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900'
    case 'tertiary':
      return 'bg-transparent text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900'
    default:
      return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm py-1 px-2'
    case 'md':
      return 'text-md py-2 px-4'
    case 'lg':
      return 'text-lg py-3 px-6'
    default:
      return ''
  }
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
