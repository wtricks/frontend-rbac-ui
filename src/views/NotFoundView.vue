<script setup lang="ts">
import { FlFilledEmojiSad } from '@kalimahapps/vue-icons'
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
  >
    <div class="max-w-lg">
      <FlFilledEmojiSad class="size-28 text-gray-500 dark:text-gray-400" />
    </div>

    <div class="text-center mt-8">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="mt-4 text-lg">Oops! The page you’re looking for doesn’t exist.</p>
      <p class="mt-2 text-gray-500 dark:text-gray-400">It might have been moved or deleted.</p>

      <div class="mt-6">
        <RouterLink to="/">
          <BaseButton
            class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white mx-auto"
            label="Back to Homepage"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
