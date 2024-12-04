<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { BsTrash, ByEdit } from "@kalimahapps/vue-icons";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout.vue";
import useRolesStore from "@/stores/useRolesStore";
import type { Permission } from "@/services/rolesServices";
import BaseTable from "@/components/common/BaseTable.vue";
import useAuthStore from "@/stores/useAuthStore";

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

  if (roleData.value.permissions.some((p) => p.slug === permissionData.value.slug)) {
    toast.error("Permission already exists");
    return;
  }

  roleData.value.permissions.push({ ...permissionData.value });
  permissionData.value = { name: "", description: "", slug: "" };
};

const updatePermission = (permission: Permission) => {
  if (!permissionData.value.name || !permissionData.value.description || !permissionData.value.slug) {
    toast.error("All permission fields are required");
    return;
  }

  if (roleData.value.permissions.some((p) => p.slug === permissionData.value.slug && permission !== p)) {
    toast.error("Permission already exists");
    return;
  }

  permission.name = permissionData.value.name;
  permission.description = permissionData.value.description;
  permission.slug = permissionData.value.slug;
  permissionData.value = { name: "", description: "", slug: "" };
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
    }).then(err => {
      toast.error(err);
    })
  } else {
    rolesStore.addRole({ ...roleData.value, createdBy: authStore.user?.name || "" }).then(() => {
      toast.success("Role added successfully");
    }).then(err => {
      toast.error(err);
    })
  }
};
</script>

<template>
  <DashboardLayout :title="currentEditRoleId ? 'Edit Role' : 'Add Role'">
    <form class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-6 w-full" @submit.prevent="saveRole">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <BaseInput variant="secondary" v-model="roleData.name" name="title" type="text" label="Role Title" placeholder="Enter role title" required />
          <BaseInput variant="secondary" v-model="roleData.description" name="description" type="textarea" label="Role Description" placeholder="Enter role description" required />
          <BaseInput variant="secondary" v-model="roleData.slug" name="slug" type="text" label="Slug" placeholder="Enter slug (alphabets only)" pattern="[A-Za-z]+" required />
        </div>

        <div class="space-y-4">
          <BaseInput variant="secondary" v-model="permissionData.name" name="title" type="text" label="Permission Title" placeholder="Enter permission title" required />
          <BaseInput variant="secondary" v-model="permissionData.description" name="description" type="textarea" label="Permission Description" placeholder="Enter permission description" required />
          <BaseInput variant="secondary" v-model="permissionData.slug" name="slug" type="text" label="Permission Slug" placeholder="Enter permission slug (alphabets only)" pattern="[A-Za-z]+" required />

          <div class="flex items-center gap-4">
            <BaseButton type="button" @click="addPermission" label="Add Permission" variant="secondary" class="!px-6 ml-auto" />
          </div>
        </div>
      </div>

      <BaseTable
        :headers="[{ key: 'name', label: 'Name' }, { key: 'description', label: 'Description' }, { key: 'slug', label: 'Slug' }, { key: 'action', label: 'Action' }]"
        :items="roleData.permissions"
        title="Existing Permissions"
      >
        <template #header-action="{ item }">
          <div class="flex items-center gap-2">
            <BaseButton :icon="ByEdit" variant="tertiary" class="!px-2" @click="updatePermission(item)" />
            <BaseButton :icon="BsTrash" variant="tertiary" class="!px-2 text-red-500" @click="removePermission(item)" />
          </div>
        </template>
      </BaseTable>

      <BaseButton type="submit" class="mt-6" :label="currentEditRoleId ? 'Update Role' : 'Add Role'" variant="primary" />
    </form>
  </DashboardLayout>
</template>
