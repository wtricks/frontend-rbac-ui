<script setup lang="ts">
import AuthLayout from '@/components/layout/AuthLayout.vue'

const handleResetPassword = () => {}
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
    @submit="handleResetPassword"
  />
</template>
