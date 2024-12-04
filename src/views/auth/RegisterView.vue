<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import AuthLayout from '@/components/layout/AuthLayout.vue'
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

// interface FormData {
//   fname: string
//   email: string
//   password: string
//   conformpassword: string
// }

const handleSignup = (formdata: Record<string, string>) => {
  if (!formdata.fname || !formdata.email || !formdata.password || !formdata.confirmpassword) {
    toast.error('All fields are required')
    return
  }

  if (formdata.password.length < 6) {
    toast.error('Password must be at least 6 characters long')
    return
  }

  if (formdata.password !== formdata.confirmpassword) {
    toast.error('Password and Confirm Password does not match')
    return
  }

  authStore.registerUser(
    formdata.fname,
    formdata.email,
    formdata.password,
    true, // usually this is in login page
  ).then(() => {
    toast.success('Account created successfully')
    router.push('/auth/login')
  }).catch((err) => {
    toast.error(err)
  })
}
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
    :loading="authStore.loading"
    @submit="handleSignup"
  />
</template>
