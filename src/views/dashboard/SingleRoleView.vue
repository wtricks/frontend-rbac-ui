<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout.vue";
import useRolesStore from "@/stores/useRolesStore";
import type { Permission, Role } from "@/services/rolesServices";

const rolesStore = useRolesStore();
const toast = useToast();
const route = useRoute()

const roleData = ref({
  name: "",
  description: "",
  slug: "",
  permissions: [] as Permission[],
});

const currentEditRoleId = ref<string | null>(route.params.id as string);

onMounted(async () => {
  const roleId = route.params.id;
  if (roleId) {
    await rolesStore.loadRoleById(roleId as string);
    roleData.value = roleData.
    rolesStore.loadRoleById(roleId as string).then((role) => {
      roleData.value = role as unknown as Role
    })
  }
});

// Handle adding permissions
const addPermission = () => {
  roleData.value.permissions.push({ name: "", description: "", slug: "" });
};

// Handle removing permission
const removePermission = (index: number) => {
  roleData.value.permissions.splice(index, 1);
};

// Handle saving role
const saveRole = async () => {
  if (!roleData.value.name || !roleData.value.description || !roleData.value.slug) {
    toast.error("All fields are required");
    return;
  }

  if (currentEditRoleId.value) {
    rolesStore.editRole(currentEditRoleId.value, { ...roleData.value }).then(() => {
      toast.success("Role updated successfully");
    })
  } else {
    rolesStore.addRole({ ...roleData.value }).then(() => {
      toast.success("Role added successfully");
    })
  }
};

</script>

<template>
  <DashboardLayout title="Create/Update Role">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <form class="bg-gray-50 dark:bg-gray-900 rounded p-4 shadow-md space-y-4 w-full" @submit.prevent="saveRole">
        <div class="space-y-4">
          <BaseInput variant="secondary" v-model="roleData.name" name="title" type="text" label="Role Title" placeholder="Enter role title" required />
          <BaseInput variant="secondary" v-model="roleData.description" name="description" type="textarea" label="Description" placeholder="Enter role description" required />
          <BaseInput variant="secondary" v-model="roleData.slug" name="slug" type="text" label="Slug" placeholder="Enter slug (alphabets only)" pattern="[A-Za-z]+" required />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Permissions</h3>
            <div v-for="(permission, index) in roleData.permissions" :key="index" class="flex items-center gap-4">
              <BaseInput v-model="permission.title" name="title" type="text" label="Permission Title" placeholder="Enter permission title" required />
              <BaseInput v-model="permission.description" name="description" type="text" label="Description" placeholder="Enter description" required />
              <BaseInput v-model="permission.slug" name="slug" type="text" label="Slug" placeholder="Enter slug" pattern="[A-Za-z]+" required />
              <BaseButton type="button" icon="BsTrash" class="text-red-500" @click="removePermission(index)" />
            </div>
            <BaseButton type="button" class="w-full mt-4" label="Add Permission" variant="secondary" @click="addPermission" />
          </div>

          <div class="overflow-y-auto">
            <h3 class="text-lg font-semibold">Permissions List</h3>
            <div v-for="(permission, index) in roleData.permissions" :key="index" class="border-b py-2">
              <p><strong>{{ permission.title }}</strong> - {{ permission.description }} ({{ permission.slug }})</p>
              <div class="flex gap-2">
                <BaseButton variant="tertiary" class="!px-2" :label="'Edit'" @click="updatePermission(index)" />
                <BaseButton variant="tertiary" class="!px-2 text-red-500" :label="'Delete'" @click="removePermission(index)" />
              </div>
            </div>
          </div>
        </div>

        <BaseButton type="submit" class="w-full mt-6" :label="currentEditRoleId ? 'Update Role' : 'Add Role'" variant="primary" />
      </form>
    </div>
  </DashboardLayout>
</template>
