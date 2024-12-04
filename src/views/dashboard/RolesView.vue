<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import { BsTrash, ByEdit } from "@kalimahapps/vue-icons";

import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout.vue";
import useRolesStore from "@/stores/useRolesStore";
import BaseTable from "@/components/common/BaseTable.vue";
import type { Role } from "@/services/rolesServices";
import type { TableFetchData } from "@/components/common/types";

const rolesStore = useRolesStore();
const toast = useToast();

const roleData = ref({
  name: "",
  description: "",
  slug: "",
});

const pagination = ref({
  total: 0,
  currPage: 1,
})

const currentEditRoleId = ref<string | null>(null);

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
    rolesStore.addRole({
      ...roleData.value,
      createdBy: "Admin",
      permissions: []
    }).then(() => {
      toast.success("Role added successfully");
    })
  }
};

const deleteRole = async (role: Role) => {
  if (!confirm("Are you sure you want to delete this role?")) {
    return
  }

  currentEditRoleId.value = ''
  rolesStore.removeRole(role.id).then(() => {
    toast.success("Role deleted successfully");
  })
};

const updateRole = (role: Role) => {
  currentEditRoleId.value = role.id;
  roleData.value = {
    name: role.name,
    description: role.description,
    slug: role.slug,
  };
};

const fetchRoles = (params: TableFetchData) => {
  pagination.value = {
    total: 10, // We need a valeu to know total pages
    currPage: params.page
  }

  rolesStore.loadRoles({
    page: pagination.value.currPage,
    pageSize: 10,
    // @ts-expect-error TODO: fix this
    sortBy: params.sortBy || "name",
    sortDirection: params.sortDirection || "desc",
    search: params.query
  });
}

// show and hide error
watch(() => rolesStore.error, (error) => {
  if (error) {
    toast.error(error);
    rolesStore.resetError();
  }
})
</script>

<template>
  <DashboardLayout title="User Roles">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <form class="bg-gray-50 dark:bg-gray-900 rounded p-4 shadow-md space-y-4 w-full" @submit.prevent="saveRole">
        <BaseInput variant="secondary" v-model="roleData.name" name="title" type="text" label="Role Title"
          placeholder="Enter role title" required />

        <BaseInput variant="secondary" v-model="roleData.description" name="description" type="textarea"
          label="Description" placeholder="Enter role description" required />

        <BaseInput variant="secondary" v-model="roleData.slug" name="slug" type="text" label="Slug"
          placeholder="Enter slug (alphabets only)" pattern="[A-Za-z]+" required />

        <BaseButton type="submit" class="w-full" :label="currentEditRoleId ? 'Update Role' : 'Add Role'"
          variant="primary" />
      </form>

      <BaseTable :headers="[
        { key: 'name', label: 'Name', sortable: true },
        { key: 'description', label: 'Description' },
        { key: 'slug', label: 'Slug' },
        { key: 'action', label: 'Action' },
      ]" title="Roles List" class="col-span-3" searchable :items="rolesStore.roles" @fetch="fetchRoles" :pagination="pagination" :is-loading="rolesStore.isLoading">
        <template #header-action="{ item }">
          <div class="flex items-center gap-2">
            <BaseButton :icon="ByEdit" variant="tertiary" class="!px-2" @click="updateRole(item)" />
            <BaseButton :icon="BsTrash" variant="tertiary" class="!px-2 text-red-500" @click="deleteRole(item)" />
          </div>
        </template>
      </BaseTable>
    </div>
  </DashboardLayout>
</template>
