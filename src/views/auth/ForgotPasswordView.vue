<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import AuthLayout from '@/components/layout/AuthLayout.vue'
import useAuthStore from '@/stores/useAuthStore';

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

// interface FormData {
//   email: string
// }

const handleForgotPassword = (formdata: Record<string, string>) => {
  if (!formdata.email) {
    toast.error('Email is required')
    return
  }
  authStore.requestPasswordReset(formdata.email).then(() => {
    toast.success('Password reset link sent to your email')
    router.push({ name: 'login' })
  }).catch((err) => {
    toast.error(err)
  })
}
</script>

<template>
  <AuthLayout
    title="Forgot Password ?"
    subtitle="Enter your email address and we will send you an password reset link on your email"
    form-action="/auth/forgot-password"
    :fields="{
      email: {
        type: 'email',
        label: 'Email',
        variant: 'secondary',
        name: 'email',
      },
    }"
    form-submit-text="Reset Password"
    bottom-text="Back to"
    bottom-link="/auth/login"
    bottom-link-text="Login"
    :loading="authStore.loading"
    @submit="handleForgotPassword"
  />
</template>
