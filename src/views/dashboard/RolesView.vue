<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { BsTrash, ByEdit } from "@kalimahapps/vue-icons";

import BaseButton from "@/components/common/BaseButton.vue";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout.vue";
import useRolesStore from "@/stores/useRolesStore";
import BaseTable from "@/components/common/BaseTable.vue";
import type { Role } from "@/services/rolesServices";
import type { TableFetchData } from "@/components/common/types";
import useAuthStore from "@/stores/useAuthStore";
import { matchArray } from "@/utils/helper";

const authStore = useAuthStore()
const rolesStore = useRolesStore();
const toast = useToast();

const currentEditRoleId = ref<string | null>(null);

const deleteRole = async (role: Role) => {
  if (!confirm("Are you sure you want to delete this role?")) {
    return
  }

  currentEditRoleId.value = ''
  rolesStore.removeRole(role.id).then(() => {
    toast.success("Role deleted successfully");
  })
};

const fetchRoles = (params: TableFetchData) => {
  rolesStore.loadRoles({
    page: params.page,
    pageSize: params.perPage,
    // @ts-expect-error TODO: fix this
    sortBy: params.sortBy || "name",
    sortDirection: params.sortDirection || "desc",
    search: params.query
  });
}

const canDeleteRoles = computed(() => matchArray(authStore.permissions, 'delete:roles'))
const canEditRoles = computed(() => matchArray(authStore.permissions, 'edit:roles'))

// show and hide error
watch(() => rolesStore.error, (error) => {
  if (error) {
    toast.error(error);
    rolesStore.resetError();
  }
})
</script>

<template>
  <DashboardLayout title="User Roles"
    :permissions="['view:roles', 'create:roles', 'edit:roles', 'delete:roles', 'view:permissions', 'edit:permissions', 'delete:permissions', 'create:permissions']">
    <BaseTable :headers="[
      { key: 'name', label: 'Name', sortable: true },
      { key: 'description', label: 'Description' },
      { key: 'slug', label: 'Slug' },
      { key: 'action', label: 'Action' },
    ]" title="Roles List" class="col-span-3" searchable :items="rolesStore.roles" @fetch="fetchRoles"
      :pagination="rolesStore.pagination" :is-loading="rolesStore.isLoading">
      <template #header-action="{ item }">
        <div class="flex items-center gap-2">
          <BaseButton v-if="canEditRoles" type="button" :icon="ByEdit" variant="tertiary" class="!px-2"
            @click="$router.push({ name: 'edit-role', params: { id: (item as Role).id } })" />
          <BaseButton v-if="canDeleteRoles" type="button" :icon="BsTrash" variant="tertiary" class="!px-2 text-red-500"
            @click="deleteRole(item)" />
        </div>
      </template>
    </BaseTable>
  </DashboardLayout>
</template>
