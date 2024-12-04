import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/services/authServices";

import {
  fetchUsers,
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
  type QueryUser
} from '@/services/usersServices';

const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const pagination = ref({
    currPage: 1,
    perPage: 10,
    total: 0,
  });

  const fetchAllUsers = async (params: QueryUser) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchUsers(params);
      users.value = response.data;
      pagination.value = {
        currPage: params.page,
        perPage: params.pageSize || 10,
        total: response.total
      }
    } catch (err) {
      throw error.value = (err as Error).message || "Failed to fetch users";
    } finally {
      loading.value = false;
    }
  };

  const fetchUserById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchUser(id);
      return response;
    } catch (err) {
      throw error.value = (err as Error).message || "Failed to fetch user";
    } finally {
      loading.value = false;
    }
  };

  const createUserAccount = async (user: Omit<User, "id" | 'createdAt' | 'updatedAt'>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await createUser(user);
      return response;
    } catch (err) {
      throw error.value = (err as Error).message || "Failed to create user";
    } finally {
      loading.value = false;
    }
  };

  const updateUserAccount = async (id: string, updatedData: Partial<User>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await updateUser(id, updatedData);
      return response;
    } catch (err) {
      throw error.value = (err as Error).message || "Failed to update user";
    } finally {
      loading.value = false;
    }
  };

  const deleteUserAccount = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await deleteUser(id);
      return response;
    } catch (err) {
      throw error.value = (err as Error).message || "Failed to delete user";
    } finally {
      loading.value = false;
    }
  };


  return { users, loading, error, pagination, fetchAllUsers, fetchUserById, createUserAccount, updateUserAccount, deleteUserAccount };
});

export default useUsersStore;
