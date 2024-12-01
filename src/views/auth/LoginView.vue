<script setup lang="ts">
import AuthLayout from '@/components/layout/AuthLayout.vue'

const handleSign = () => {
  //
}
</script>

<template>
  <AuthLayout
    title="Welcome back!"
    subtitle="Enter your credentials to sign in to your account"
    form-action="/auth/login"
    :fields="{
      email: {
        type: 'email',
        label: 'Email',
        variant: 'secondary',
        name: 'email',
      },
      password: {
        type: 'password',
        label: 'Password',
        variant: 'secondary',
        name: 'password',
      },
    }"
    form-submit-text="Log in"
    bottom-text="Don't have an account?"
    bottom-link="/auth/register"
    bottom-link-text="Create one"
    @submit="handleSign"
  >
    <template #before-submit>
      <p class="text-slate-600 dark:text-slate-400 font-parkinsans text-end mt-2">
        <RouterLink to="/auth/forgot-password" class="hover:opacity-50 text-primary-600"
          >Forgot password?</RouterLink
        >
      </p>
    </template>
  </AuthLayout>
</template>
