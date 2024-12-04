import apiClient from "@/utils/apiClient";

/**
 * Represents a user.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password?: string;
  role: string;
  emailVerified: boolean;
  rememberMe: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Registers a new user.
 *
 * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt'>} user - The data of the new user
 * @returns {Promise<User>} A promise that resolves with the created user
 */
export const register = async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'emailVerified'>): Promise<User> => {
  const newUser = {
    ...user,
    id: Date.now().toString(36).substring(2, 22),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    emailVerified: false,
  }

  // check if email already exists
  const emailExists = await apiClient.get('/users', { params: { email: user.email } });
  if (emailExists.data.length > 0) {
    throw new Error('Email already exists');
  }

  const userResponse = await apiClient.post('/users', newUser);
  const verificationToken = Date.now().toString(36).substring(2, 22); // Generate a unique token

  await apiClient.post('/tokens', {
    email: newUser.email,
    token: verificationToken,
  });

  return { ...userResponse.data, verificationToken };
};

/**
 * Logs in a user by verifying the provided email and password.
 *
 * @param {string} email - The email of the user attempting to log in
 * @param {string} password - The password of the user attempting to log in
 * @returns {Promise<User>} A promise that resolves with the user data if credentials are valid
 * @throws {Error} If the credentials are invalid
 */
export const login = async (email: string, password: string): Promise<{ user: User; accessToken: string; }> => {
  const response = await apiClient.get('/users', {
    params: { email, password },
  });

  if (response.data.length === 0) {
    throw new Error('Invalid credentials');
  }

  // Check if the user has verified their email
  if (!response.data[0].emailVerified) {
    throw new Error('Please verify your email before logging in');
  }

  return {
    user: response.data[0],
    accessToken: Date.now().toString(36).substring(2, 22), // Generate a unique token, usually returned by the server
  };
};


/**
 * Initiates the password reset process for a user.
 *
 * @param {string} email - The email address of the user requesting a password reset
 * @returns {Promise<{ token: string }>} A promise that resolves with an object containing the reset token
 * @throws {Error} If the user with the provided email is not found
 */
export const forgetPassword = async (email: string): Promise<{ token: string; }> => {
  const response = await apiClient.get('/users', {
    params: { email },
  });

  if (response.data.length === 0) {
    throw new Error('User not found');
  }

  const token = Date.now().toString();

  await apiClient.post('/tokens', { email, token });
  return { token };
};

/**
 * Resets the password for a user.
 *
 * @param {string} token - The token provided via email
 * @param {string} newPassword - The new password to set
 * @returns {Promise<void>} A promise that resolves when the password is reset
 * @throws {Error} If the token is invalid or expired, or if the user is not found
 */

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const tokenResponse = await apiClient.get('/tokens', { params: { token } });

  if (tokenResponse.data.length === 0) {
    throw new Error('Invalid or expired token');
  }

  const email = tokenResponse.data[0].email;

  const userResponse = await apiClient.get('/users', { params: { email } });

  if (userResponse.data.length === 0) {
    throw new Error('User not found');
  }

  const user = userResponse.data[0];

  await apiClient.patch(`/users/${user.id}`, { password: newPassword });
  await apiClient.delete(`/tokens/${tokenResponse.data[0].id}`);
};

/**
 * Verifies a user's email address using a token.
 *
 * @param {string} token - The token sent to the user's email for verification
 * @returns {Promise<void>} A promise that resolves when the email is successfully verified
 * @throws {Error} If the token is invalid or expired, or if the user is not found
 */
export const verifyEmail = async (token: string): Promise<void> => {
  const tokenResponse = await apiClient.get('/tokens', { params: { token } });

  if (tokenResponse.data.length === 0) {
    throw new Error('Invalid or expired token');
  }

  const email = tokenResponse.data[0].email;

  const userResponse = await apiClient.get('/users', { params: { email } });

  if (userResponse.data.length === 0) {
    throw new Error('User not found');
  }

  const user = userResponse.data[0];

  await apiClient.patch(`/users/${user.id}`, { emailVerified: true });
  await apiClient.delete(`/tokens/${tokenResponse.data[0].id}`); // Cleanup the token
};
