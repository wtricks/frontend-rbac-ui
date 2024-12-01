<script setup lang="ts">
import { reactive } from 'vue'

import BaseButton from '@/components/common/BaseButton.vue'
import SecureInput from '@/components/common/SecureInput.vue'
import BaseInput from '@/components/common/BaseInput.vue'

import type { InputProps } from '@/components/common/types'

const props = defineProps<{
  title: string
  subtitle: string
  formAction?: string
  formSubmitText?: string
  bottomText?: string
  bottomLink?: string
  bottomLinkText?: string
  loading?: boolean
  fields: Record<string, InputProps>
}>()

const emit = defineEmits<{
  (e: 'submit', data: Record<keyof typeof props.fields, string>): void
}>()

const formData = reactive<Record<keyof typeof props.fields, string>>({})

const onSubmit = () => {
  emit('submit', formData)
}
</script>

<template>
  <div
    class="min-h-screen w-full flex justify-center items-center bg-slate-200 dark:bg-slate-800 px-4 py-8"
  >
    <div
      class="w-full max-w-md rounded shadow-md bg-white dark:bg-slate-800 p-6 border dark:border-slate-700"
    >
      <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-200 font-parkinsans text-center">
        {{ title }}
      </h2>
      <p class="text-slate-600 dark:text-slate-400 font-parkinsans text-center mt-1">
        {{ subtitle }}
      </p>

      <form :action="formAction" method="post" @submit.prevent="onSubmit" class="mt-8">
        <template v-for="(field, key) in fields" :key="key">
          <BaseInput
            v-if="field.type != 'password'"
            v-model="formData[key]"
            v-bind="field"
            class="mt-4"
          />
          <SecureInput v-else v-model="formData[key]" v-bind="field" class="mt-4" />
        </template>

        <slot name="before-submit"></slot>
        <BaseButton
          type="submit"
          variant="primary"
          class="mt-8 w-full"
          :label="formSubmitText"
          :disabled="loading"
        />
      </form>

      <p
        class="text-slate-600 dark:text-slate-400 font-parkinsans text-center mt-5"
        v-if="bottomLink"
      >
        {{ bottomText }}
        <RouterLink :to="bottomLink" class="hover:opacity-70 text-primary-500">{{
          bottomLinkText
        }}</RouterLink>
      </p>
    </div>
  </div>
</template>
