import apiClient from "@/utils/apiClient";
import { type User } from "./authServices";

/**
 * Query parameters for users
 */
export interface QueryUser {
  page: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
}

/**
 * Fetches users with pagination, search, and sorting options.
 *
 * @param {QueryUser} params - Query parameters for users
 * @returns {Promise<{ data: User[]; total: number }>} A promise that resolves with an object containing the users and the total amount of users in the database
 */

export const fetchUsers = async (params: QueryUser): Promise<{ data: User[]; total: number }> => {
  const { page, pageSize = 10, search = "", sortBy = "name", sortDirection = "asc" } = params;
  const response = await apiClient.get("/users", {
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
 * Fetches a single user by ID
 *
 * @param {string} id - The ID of the user to fetch
 * @returns {Promise<User>} A promise that resolves with the user
 */
export const fetchUser = async (id: string): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

/**
 * Deletes a user by ID
 *
 * @param {string} id - The ID of the user to delete
 * @returns {Promise<void>} A promise that resolves when the user is deleted
 */
export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};

/**
 * Creates a new user
 *
 * @param {Omit<User, "id" | "createdAt" | "updatedAt">} user - User data to create
 * @returns {Promise<User>} A promise that resolves with the created user
 */
export const createUser = async (user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
  const response = await apiClient.post("/users", {
    ...user,
    id: Math.random().toString(36).substring(2, 22),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};

/**
 * Updates an existing user
 *
 * @param {string} id - The ID of the user to update
 * @param {Partial<User>} user - User data to update
 * @returns {Promise<User>} A promise that resolves with the updated user
 */
export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const response = await apiClient.patch(`/users/${id}`, {
    ...user,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};
