import apiClient from "@/utils/apiClient";

export interface Role {
  id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export interface QueryRole {
  page: number;
  pageSize?: number;
  search?: string;
  sortBy?: keyof Role;
  sortDirection?: "asc" | "desc";
}

/**
 * Fetches roles with pagination, search, and sorting options.
 *
 * @param {QueryRole} params - Query parameters for roles
 * @returns {Promise<Role[]>} A promise that resolves with an array of roles
 */
export const fetchRoles = async (params: QueryRole): Promise<Role[]> => {
  const { page, pageSize = 10, search = "", sortBy = "name", sortDirection = "asc" } = params;
  const response = await apiClient.get("/roles", {
    params: {
      _page: page,
      _limit: pageSize,
      q: search,
      _sort: sortBy,
      _order: sortDirection,
    },
  });
  return response.data;
};

/**
 * Fetches a single role by ID
 *
 * @param {string} id - The ID of the role
 * @returns {Promise<Role>} A promise that resolves with the role
 */
export const fetchRoleById = async (id: string): Promise<Role> => {
  const response = await apiClient.get(`/roles/${id}`);
  return response.data;
};

/**
 * Creates a new role
 *
 * @param {Omit<Role, "id" | "createdAt" | "updatedAt">} role - Role data to create
 * @returns {Promise<Role>} A promise that resolves with the created role
 */
export const createRole = async (
  role: Omit<Role, "id" | "createdAt" | "updatedAt">
): Promise<Role> => {
  const response = await apiClient.post("/roles", {
    ...role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

/**
 * Updates an existing role
 *
 * @param {string} id - The ID of the role to update
 * @param {Partial<Role>} role - Role data to update
 * @returns {Promise<Role>} A promise that resolves with the updated role
 */
export const updateRole = async (id: string, role: Partial<Role>): Promise<Role> => {
  const response = await apiClient.patch(`/roles/${id}`, {
    ...role,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

/**
 * Deletes a role by ID
 *
 * @param {string} id - The ID of the role to delete
 * @returns {Promise<void>} A promise that resolves when the role is deleted
 */
export const deleteRole = async (id: string): Promise<void> => {
  await apiClient.delete(`/roles/${id}`);
};
