<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

import AuthLayout from '@/components/layout/AuthLayout.vue'
import useAuthStore from '@/stores/useAuthStore';

const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

const isVerifiedToken = ref(false)

onBeforeMount(() => {
  if (route.params.token) {
    authStore.verifyUserEmail(route.params.token as string).then(() => {
      isVerifiedToken.value = true
    }).catch((err) => {
    toast.error(err)
  })
  }
})
</script>

<template>
  <AuthLayout
    title="Verification"
    :subtitle="
      isVerifiedToken
        ? 'Your account has been verified'
        : 'Link is expired or invalid, please try to resend the verification email'
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
