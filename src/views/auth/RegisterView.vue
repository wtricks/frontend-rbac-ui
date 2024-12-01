<script setup lang="ts">
import AuthLayout from '@/components/layout/AuthLayout.vue'

const handleSignup = () => {}
</script>

<template>
  <AuthLayout
    title="Create an account"
    subtitle="Enter your details to create a new account"
    form-action="/auth/register"
    :fields="{
      fname: {
        type: 'text',
        label: 'Name',
        variant: 'secondary',
        name: 'name',
      },
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
      confirmpassword: {
        type: 'password',
        label: 'Confirm Password',
        variant: 'secondary',
        name: 'conformpassword',
      },
    }"
    form-submit-text="Create account"
    bottom-text="Already have an account?"
    bottom-link="/auth/login"
    bottom-link-text="Login"
    @submit="handleSignup"
  />
</template>
