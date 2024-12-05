<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { BsTrash, ByEdit } from "@kalimahapps/vue-icons";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout.vue";
import useRolesStore from "@/stores/useRolesStore";
import { type Permission } from "@/services/rolesServices";
import BaseTable from "@/components/common/BaseTable.vue";
import useAuthStore from "@/stores/useAuthStore";
import { matchArray } from "@/utils/helper";

const authStore = useAuthStore();
const rolesStore = useRolesStore();
const toast = useToast();
const route = useRoute();

const roleData = ref({
  name: "",
  description: "",
  slug: "",
  permissions: [] as Permission[],
});

const permissionData = ref({
  name: "",
  description: "",
  slug: "",
});

const currentEditRoleId = ref<string | null>(route.params.id as string);
const currentEditPermissionIndex = ref<number>(-1);
const permissionNeeded = ['view:permissions', 'edit:permissions', 'delete:permissions', 'create:permissions']

const permissions = computed(() => {
  return {
    updatePermission: matchArray(authStore.permissions, 'edit:permissions'),
    deletePermission: matchArray(authStore.permissions, 'delete:permissions'),
    updateRole: matchArray(authStore.permissions, 'edit:roles'),
    createPermission: matchArray(authStore.permissions, 'create:permissions'),
    createRole: matchArray(authStore.permissions, 'create:roles'),
    viewPermissions: matchArray(authStore.permissions, 'view:permissions'),
  }
})

onMounted(async () => {
  const roleId = route.params.id;
  if (roleId) {
    roleData.value = await rolesStore.loadRoleById(roleId as string);
  }
});

const addPermission = () => {
  if (!permissionData.value.name || !permissionData.value.description || !permissionData.value.slug) {
    toast.error("All permission fields are required");
    return;
  }

  if (
    roleData.value.permissions.some((p) => p.slug === permissionData.value.slug) &&
    (currentEditPermissionIndex.value === -1 || roleData.value.permissions[currentEditPermissionIndex.value!].slug !== permissionData.value.slug)) {
    toast.error("Permission already exists");
    return;
  }

  if (currentEditPermissionIndex.value !== -1) {
    roleData.value.permissions[currentEditPermissionIndex.value!] = { ...permissionData.value };
    currentEditPermissionIndex.value = -1;
  } else {
    roleData.value.permissions.push({ ...permissionData.value });
  }

  permissionData.value = { name: "", description: "", slug: "" };
};

const updatePermission = (permission: Permission) => {
  currentEditPermissionIndex.value = roleData.value.permissions.indexOf(permission);
  permissionData.value = { ...permission };
};

const removePermission = (permission: Permission) => {
  const index = roleData.value.permissions.findIndex((p) => p.slug === permission.slug);
  roleData.value.permissions.splice(index, 1);
};

const saveRole = async () => {
  if (!roleData.value.name || !roleData.value.description || !roleData.value.slug) {
    toast.error("All fields are required");
    return;
  }

  if (currentEditRoleId.value) {
    rolesStore.editRole(currentEditRoleId.value, { ...roleData.value }).then(() => {
      toast.success("Role updated successfully");
    }).catch(err => {
      toast.error(err);
    })
  } else {
    rolesStore.addRole({ ...roleData.value, createdBy: authStore.user?.name || "" }).then(() => {
      toast.success("Role added successfully");
    }).catch(err => {
      toast.error(err);
    })
  }
};
</script>

<template>
  <DashboardLayout :title="currentEditRoleId ? 'Edit Role' : 'Add Role'" :permissions="[...permissionNeeded, currentEditRoleId ? 'edit:roles' : 'create:roles']">
    <form class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-6 w-full" @submit.prevent="saveRole">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4" v-if="permissions.updateRole || permissions.createRole">
          <BaseInput variant="secondary" v-model="roleData.name" name="title" type="text" label="Role Title"
            placeholder="Enter role title" required />
          <BaseInput variant="secondary" v-model="roleData.description" name="description" type="textarea"
            label="Role Description" placeholder="Enter role description" required />
          <BaseInput variant="secondary" v-model="roleData.slug" name="slug" type="text" label="Slug"
            placeholder="Enter slug (alphabets only)" pattern="[A-Za-z]+" required />
        </div>

        <div class="space-y-4" v-if="permissions.updatePermission || permissions.createPermission">
          <BaseInput variant="secondary" v-model="permissionData.name" name="title" type="text" label="Permission Title"
            placeholder="Enter permission title" required />
          <BaseInput variant="secondary" v-model="permissionData.description" name="description" type="textarea"
            label="Permission Description" placeholder="Enter permission description" required />
          <BaseInput variant="secondary" v-model="permissionData.slug" name="slug" type="text" label="Permission Slug"
            placeholder="Enter permission slug (alphabets only)" pattern="[A-Za-z]+" required />

          <div class="flex items-center gap-4">
            <BaseButton type="button" @click="addPermission" :label="currentEditPermissionIndex !== -1 ? 'Update Permission' : 'Add Permission'" variant="secondary"
              class="!px-6 ml-auto" />
          </div>
        </div>
      </div>

      <BaseTable
        v-if="permissions.deletePermission || permissions.updateRole || permissions.viewPermissions"
        :headers="[{ key: 'name', label: 'Name' }, { key: 'description', label: 'Description' }, { key: 'slug', label: 'Slug' }, { key: 'action', label: 'Action' }]"
        :items="roleData.permissions" title="Existing Permissions">
        <template #header-action="{ item }">
          <div class="flex items-center gap-2">
            <BaseButton v-if="permissions.updateRole" type="button" :icon="ByEdit" variant="tertiary" class="!px-2" @click="updatePermission(item)" />
            <BaseButton v-if="permissions.deletePermission" type="button" :icon="BsTrash" variant="tertiary" class="!px-2 text-red-500" @click="removePermission(item)" />
          </div>
        </template>
      </BaseTable>

      <BaseButton type="submit" class="mt-6" :label="currentEditRoleId ? 'Update Role' : 'Add Role'"
        variant="primary" />
    </form>
  </DashboardLayout>
</template>
