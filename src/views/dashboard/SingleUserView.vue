<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import useAuthStore from '@/stores/useAuthStore';
import { type User } from '@/services/authServices';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseInput from '@/components/common/BaseInput.vue';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const route = useRoute();

const userForm = ref<Partial<User>>({
  id: '',
  name: '',
  email: '',
  avatar: '',
  password: '',
  emailVerified: false,
  role: '',
});

const handleSubmit = () => {
  if (!userForm.value.name || !userForm.value.email || !userForm.value.avatar) {
    toast.error('All fields are required');
    return;
  }


};

</script>

<template>
  <DashboardLayout :title="route.name == 'profile' ? 'Profile' : route.params.id ? 'Edit User' : 'Add User'">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      <div class="space-y-4 p-6 bg-white rounded shadow dark:bg-gray-800">
        <h2 class="text-2xl font-bold dark:text-gray-300">{{ route.name == 'profile' ? 'Profile' : route.params.id ? 'Edit User' : 'Add User' }}</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <BaseInput v-model="userForm.name" label="Name" type="text" name="name" placeholder="Enter your name" required />
          <BaseInput v-model="userForm.email" label="Email" type="email" name="email" placeholder="Enter your email" required />
          <BaseInput v-model="userForm.avatar" label="Avatar URL" type="text" name="avatar" placeholder="Enter avatar URL" />
          <BaseInput v-model="(userForm.emailVerified as any)" type="select" label="Email Verified" name="emailVerified">
            <template #options>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </template>
          </BaseInput>
          <BaseInput v-model="userForm.role" type="select" label="Role" name="role">
            <template #options></template>
          </BaseInput>

          <BaseButton type="submit" :label="userForm.id ? 'Update User' : 'Create User'" variant="primary" class="!px-6" />
        </form>
      </div>

      <div class="flex flex-col items-center justify-center p-6 bg-gray-100 rounded space-y-4 bg-white dark:bg-gray-800 max-w-md">
        <h3 class="text-xl font-semibold mb-4">User Preview</h3>

        <div class="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
          <img v-if="userForm.avatar" :src="userForm.avatar" alt="Avatar"
            class="w-full h-full rounded-full object-cover" />
          <span v-else class="text-white text-3xl">{{ userForm.name?.[0]?.toUpperCase() }}</span>
        </div>

        <div class="text-center">
          <p class="font-semibold text-lg">{{ userForm.name || 'No Name' }}</p>
          <p class="text-sm text-gray-600">{{ userForm.email || 'No Email' }}</p>
          <p class="text-sm text-gray-500 mt-2">
            <span :class="userForm.emailVerified ? 'text-green-500' : 'text-red-500'">
              {{ userForm.emailVerified ? 'Verified' : 'Not Verified' }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
