<template>
  <div class="flex flex-col gap-2 w-full">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>

    <div
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded border transition-all duration-300 focus-within:ring-2',
        variantClass,
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm',
        fullWidth ? 'w-full' : 'inline-flex',
      ]"
    >
      <span v-if="iconLeft" class="text-lg text-gray-500 dark:text-gray-400">
        <component :is="iconLeft" />
      </span>

      <!-- TODO: v-model not working -->
      <component
        v-if="!isSelect && !isTextarea"
        :is="tag"
        v-bind="commonProps"
        :class="['flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300', inputClass]"
        :type="type"
        :value="inputValue"
        @input="inputValue = $event.target.value"
      />

      <select
        v-if="isSelect"
        v-bind="commonProps"
        :class="['flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300', inputClass]"
        v-model="inputValue"
      >
        <slot name="options" />
      </select>

      <textarea
        v-if="isTextarea"
        v-bind="commonProps"
        :class="['flex-1 bg-transparent outline-none resize-none text-gray-700 dark:text-gray-300', inputClass]"
        v-model="(inputValue as string)"
      />

      <span
        v-if="iconRight"
        class="text-lg text-gray-500 dark:text-gray-400 cursor-pointer hover:opacity-80"
        @click="emit('right-icon-click')"
      >
        <component :is="iconRight" />
      </span>
    </div>

    <p v-if="helperText" class="text-xs text-gray-500 dark:text-gray-400">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps } from './types'

const props = defineProps<InputProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'right-icon-click'): void
}>()

const isSelect = computed(() => props.type === 'select')
const isTextarea = computed(() => props.type === 'textarea')
const tag = computed(() => (isSelect.value || isTextarea.value ? 'div' : 'input'))

const inputValue = defineModel<string | number | boolean>()

const commonProps = {
  id: props.id,
  name: props.name,
  placeholder: props.placeholder,
  disabled: props.disabled
}

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'border-primary-500 focus-within:ring-primary-500 dark:border-primary-400 dark:focus-within:ring-primary-400'
    case 'secondary':
      return 'border-gray-300 focus-within:ring-gray-400 dark:border-gray-600 dark:focus-within:ring-gray-500'
    case 'outline':
      return 'border-gray-500 focus-within:ring-gray-600 dark:border-gray-500 dark:focus-within:ring-gray-300'
    default:
      return ''
  }
})

const inputClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm py-1'
    case 'md':
      return 'text-base py-2'
    case 'lg':
      return 'text-lg py-3'
    default:
      return ''
  }
})
</script>
