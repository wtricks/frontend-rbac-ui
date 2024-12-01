<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'

const isVerifiedToken = ref(false)
</script>

<template>
  <AuthLayout
    title="Verification"
    :subtitle="
      isVerifiedToken
        ? 'Your account has been verified'
        : 'Link is expired or invalid, please try again later'
    "
    form-action="/auth/verification"
    :fields="{}"
    form-submit-text="Back to login"
    @submit="$router.push('/auth/login')"
  />
</template>

<style scoped>
:deep button {
  @apply max-w-max mx-auto;
}
</style>
