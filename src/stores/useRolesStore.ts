import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  fetchRoles,
  fetchRoleById,
  createRole,
  updateRole,
  deleteRole,
  type Role,
  type QueryRole,
} from "@/services/rolesServices";

const useRolesStore = defineStore("roles", () => {
  const roles = ref<Role[]>([]);
  const currentRole = ref<Role | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadRoles = async (query: QueryRole) => {
    try {
      loading.value = true;
      roles.value = await fetchRoles(query);
    } catch (err) {
      error.value = (err as Error).message || "Failed to load roles";
    } finally {
      loading.value = false;
    }
  };

  const loadRoleById = async (id: string) => {
    try {
      loading.value = true;
      currentRole.value = await fetchRoleById(id);
    } catch (err) {
      error.value = (err as Error).message || `Failed to load role with ID ${id}`;
    } finally {
      loading.value = false;
    }
  };

  const addRole = async (role: Omit<Role, "id" | "createdAt" | "updatedAt">) => {
    try {
      loading.value = true;
      const newRole = await createRole(role);
      roles.value.push(newRole);
    } catch (err) {
      error.value = (err as Error).message || "Failed to create role";
    } finally {
      loading.value = false;
    }
  };

  const editRole = async (id: string, updatedData: Partial<Role>) => {
    try {
      loading.value = true;
      const updatedRole = await updateRole(id, updatedData);
      const index = roles.value.findIndex((role) => role.id === id);
      if (index !== -1) roles.value[index] = updatedRole;
    } catch (err) {
      error.value = (err as Error).message || `Failed to update role with ID ${id}`;
    } finally {
      loading.value = false;
    }
  };

  const removeRole = async (id: string) => {
    try {
      loading.value = true;
      await deleteRole(id);
      roles.value = roles.value.filter((role) => role.id !== id);
    } catch (err) {
      error.value = (err as Error).message || `Failed to delete role with ID ${id}`;
    } finally {
      loading.value = false;
    }
  };

  const totalRoles = computed(() => roles.value.length);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  const resetError = () => {
    error.value = null;
  };

  return {
    roles,
    currentRole,
    loading,
    error,
    totalRoles,
    isLoading,
    hasError,
    loadRoles,
    loadRoleById,
    addRole,
    editRole,
    removeRole,
    resetError,
  };
});

export default useRolesStore;
