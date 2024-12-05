import { ref, watch } from "vue";
import { defineStore } from "pinia";

import {
  login,
  type User,
  forgetPassword,
  register,
  resetPassword,
  verifyEmail,
} from "@/services/authServices";
import { fetchRoleById, fetchRoleBySlug } from "@/services/rolesServices";

const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const permissions = ref<string[]>([]);

  const setUser = (newuser: User) => {
    isAuthenticated.value = true;
    user.value = newuser;
  };

  const loginUser = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await login(email, password);
      user.value = response.user;
      isAuthenticated.value = true;

      localStorage.setItem("__accessToken__", response.accessToken);
      getPermissions();
    } catch (err) {
      throw error.value = (err as Error).message || "Login failed. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  const logoutUser = () => {
    user.value = null;
    isAuthenticated.value = false;
    error.value = null;
    permissions.value = [];

    localStorage.removeItem("__accessToken__");
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await register({
        name,
        email,
        password,
        avatar: "",
        rememberMe,
        role: 'user'
      });
      user.value = response;
      isAuthenticated.value = false;
    } catch (err) {
      throw error.value = (err as Error).message || "Registration failed. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  const requestPasswordReset = async (email: string) => {
    loading.value = true;
    error.value = null;

    try {
      await forgetPassword(email);
    } catch (err) {
      throw error.value = (err as Error).message || "Request failed. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  const resetUserPassword = async (token: string, newPassword: string) => {
    loading.value = true;
    error.value = null;

    try {
      await resetPassword(token, newPassword);
    } catch (err) {
      throw error.value = (err as Error).message || "Password reset failed. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  const verifyUserEmail = async (token: string) => {
    loading.value = true;
    error.value = null;

    try {
      await verifyEmail(token);
    } catch (err) {
      throw error.value = (err as Error).message || "Email verification failed.";
    } finally {
      loading.value = false;
    }
  };

  const getPermissions = () => {
    if (user.value && user.value.role && permissions.value.length === 0) {
      fetchRoleById(user.value.role).then((role) => {
        if (role) {
          permissions.value = role.permissions.map((permission) => permission.slug);
        }
      })

      // If the user doesn't have a role, fetch the role by slug
      if (permissions.value.length === 0) {
        fetchRoleBySlug(user.value.role).then((role) => {
          if (role) {
            permissions.value = role.permissions.map((permission) => permission.slug);
          }
        })
      }

      return permissions.value
    }
    return permissions.value;
  };

  // We are using json server here, so we'll store the user data in local storage.
  // In a real application, we would use a database (e.g. Firebase, MongoDB, etc.).
  if (localStorage.getItem("__accessToken__")) {
    isAuthenticated.value = true;
    user.value = JSON.parse(localStorage.getItem("__user__") || "{}");
    getPermissions();
  }

  watch(user, () => {
    if (user.value) {
      localStorage.setItem("__user__", JSON.stringify(user.value));
    }
  })

  return {
    isAuthenticated,
    user,
    loading,
    error,
    permissions,
    loginUser,
    logoutUser,
    registerUser,
    requestPasswordReset,
    resetUserPassword,
    verifyUserEmail,
    getPermissions,
    setUser
  };
});

export default useAuthStore;
