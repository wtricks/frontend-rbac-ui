import apiClient from "@/utils/apiClient";

export interface Permission {
  name: string
  description: string
  slug: string
}

export interface Role {
  id: string;
  name: string;
  description: string;
  slug: string;
  permissions: Permission[];
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
export const fetchRoles = async (params: QueryRole): Promise<{ data: Role[]; total: number }> => {
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
  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"] || "10"), // Default to 10
  };
};

/**
 * Fetches all roles
 *
 * @returns {Promise<Role[]>} A promise that resolves with an array of all roles
 */
export const getAllRoles = async (): Promise<Role[]> => {
  const response = await apiClient.get("/roles");
  return response.data;
}

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
 * Fetches a single role by slug
 *
 * @param {string} slug - The slug of the role to fetch
 * @returns {Promise<Role>} A promise that resolves with the role
 */
export const fetchRoleBySlug = async (slug: string): Promise<Role> => {
  const response = await apiClient.get(`/roles?slug=${slug}`);
  return response.data[0];
}

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
    id: Math.random().toString(36).substring(2, 22),
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

/**
 * Checks if a role with the given slug exists
 *
 * @param {string} slug - The slug of the role to check
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the role exists
 */
export const existsRoleBySlug = async (slug: string): Promise<boolean> => {
  const response = await apiClient.get(`/roles?slug=${slug}`);
  return response.data.length > 0;
};
