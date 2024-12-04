<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import AuthLayout from '@/components/layout/AuthLayout.vue'
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

// interface ResetPasswordFormData {
//   password: string;
//   confirmpassword: string;
// }

const handleResetPassword = (formdata: Record<string, string>) => {
  if (!formdata.password || !formdata.confirmpassword) {
    toast.error('All fields are required')
    return
  }

  if (formdata.password !== formdata.confirmpassword) {
    toast.error('Password and Confirm Password does not match')
    return
  }

  if (formdata.password.length < 6) {
    toast.error('Password must be at least 6 characters long')
    return
  }

  authStore.resetUserPassword(route.params.token as string, formdata.password).then(() => {
    toast.success('Password reset successfully')
    router.push('/auth/login')
  }).catch((err) => {
    toast.error(err)
  })
}
</script>

<template>
  <AuthLayout
    title="Reset Password"
    subtitle="Choose a difficult and unguessable password"
    form-action="/auth/reset-password"
    :fields="{
      password: {
        type: 'password',
        label: 'Password',
        variant: 'secondary',
        name: 'password',
      },
      confirmpassword: {
        type: 'password',
        label: 'Confirm Password',
        variant: 'secondary',
        name: 'confirmpassword',
      },
    }"
    form-submit-text="Reset Password"
    bottom-text="Back to"
    bottom-link="/auth/login"
    bottom-link-text="Login"
    :loading="authStore.loading"
    @submit="handleResetPassword"
  />
</template>
