<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import AuthLayout from '@/components/layout/AuthLayout.vue';
import useAuthStore from '@/stores/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

// interface LoginFormData {
//   email: string;
//   password: string;
// }

const handleSign = (formdata: Record<string, string>) => {
  if (!formdata.email || !formdata.password) {
    toast.error('Both Email and Password are required');
    return;
  }

  authStore
    .loginUser(formdata.email, formdata.password)
    .then(() => {
      toast.success('Logged in successfully');
      router.push('/dashboard');
    }).catch((err) => {
    toast.error(err)
  })
};
</script>

<template>
  <AuthLayout title="Welcome back!" subtitle="Enter your credentials to sign in to your account"
    form-action="/auth/login" :fields="{
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
    }" form-submit-text="Log in" bottom-text="Don't have an account?" bottom-link="/auth/register"
    bottom-link-text="Create one" :loading="authStore.loading" @submit="handleSign">
    <template #before-submit>
      <p class="text-slate-600 dark:text-slate-400 font-parkinsans text-end mt-2">
        <RouterLink to="/auth/forgot-password" class="hover:opacity-50 text-primary-600">
          Forgot password?
        </RouterLink>
      </p>
    </template>
  </AuthLayout>
</template>
