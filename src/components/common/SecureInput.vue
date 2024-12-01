<template>
  <BaseInput
    v-bind="$props"
    :icon-right="isPasswordVisible ? FeEyeOff : FeEye"
    :type="isPasswordVisible ? 'text' : 'password'"
    @right-icon-click="isPasswordVisible = !isPasswordVisible"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FeEyeOff, FeEye } from '@kalimahapps/vue-icons'

import BaseInput from '@/components/common/BaseInput.vue'
import type { InputProps } from './types'

defineProps<InputProps>()

const isPasswordVisible = ref(false)
</script>
