<script setup lang="ts">
import AuthLayout from '@/components/layout/AuthLayout.vue'

const handleForgotPassword = () => {}
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
    @submit="handleForgotPassword"
  />
</template>
