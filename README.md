# RBAC Admin

RBAC Admin is a role-based user management system built as an assignment to demonstrate the creation of roles, permissions, user management, and other admin functionalities. This project uses Vue.js, TypeScript, and Tailwind CSS for the frontend, while JSON Server is used as a mock API for simulating server responses.

## Features

- **User Authentication**: Register, login, and manage user authentication.
- **Password Reset**: Users can reset their passwords via a token-based URL (No backend email functionality, check token in `db.json` for testing).
- **Email Verification**: Email verification is required to log in (simulated using a token stored in `db.json`).
- **Role-Based Access Control**: Admin can create roles, assign permissions, and manage users.
- **User Management**: Admin can create, edit, delete users, activate/deactivate user accounts, and manage user profiles.
- **Activity Tracking**: Track and manage user activities.
- **Admin Dashboard**: Provides an overview of system management with the ability to view users, roles, and other settings.
- **Light/Dark Support**: User can toggle between light and dark theme using header button.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/wtricks/frontend-rbac-ui
cd frontend-rbac-ui
```

### 2. Install Dependencies

This project uses `pnpm` as the package manager. Install the dependencies by running:

```bash
pnpm install
```

### 3. Start the Frontend Server

To start the frontend Vue.js application:

```bash
pnpm dev
```

This will run the app at `https://localhost:5173`.

### 4. Start the Mock API Server

To run the mock server using JSON Server, use the following command:

```bash
pnpm start
```

This will start the JSON Server at `http://localhost:5000`.

### 5. Testing Forgot Password Functionality

For testing the forgot password functionality, you need to manually check the `db.json` file for the token since there is no backend email functionality in place. Look for the `tokens` array in the file and find the token associated with the email that needs to reset the password.

Then, manually enter the following URL in your browser:

```plaintext
https://localhost:5173/auth/reset-password/:token
```

Replace `:token` with the actual token from the `db.json` file.

### 6. Testing Email Verification

Email verification is required for users to log in. Similar to password reset, check the `db.json` file for the `tokens` array and find the token associated with the email that needs to be verified.

Manually enter the following URL in your browser:

```plaintext
https://localhost:5173/auth/verify-email/:token
```

Replace `:token` with the actual token from the `db.json` file.

## Project Structure

### `src/router/publicRoutes.ts`

Defines the public routes for unauthenticated users such as login, registration, password reset, and email verification.

### `src/router/privateRoutes.ts`

Defines the private routes for authenticated users, including the admin dashboard, user management, roles management, and profile editing.

### `src/router/index.ts`

Configures Vue Router with both public and private routes and handles setting the page title dynamically.

## Routes Overview

### Public Routes

- `/auth/login`: Login page.
- `/auth/register`: Register page.
- `/auth/forgot-password`: Forgot password page.
- `/auth/reset-password/:token`: Reset password page.
- `/auth/verify-email/:token`: Email verification page.

### Private Routes (Authenticated)

- `/dashboard`: Admin dashboard.
- `/dashboard/users`: Manage users.
- `/dashboard/users/new`: Create a new user.
- `/dashboard/users/edit/:id`: Edit user details.
- `/dashboard/roles`: Manage roles.
- `/dashboard/roles/new`: Create a new role.
- `/dashboard/roles/:id`: Edit role details.
- `/dashboard/activity`: View activity log.
- `/dashboard/profile`: View and edit user profile.

## Run in Different Package Managers

This project supports multiple package managers:

- **pnpm**: Run `pnpm dev` for the frontend and `pnpm start` for the mock server.
- **npm**: Run `npm run dev` for the frontend and `npm run start` for the mock server.
- **yarn**: Run `yarn dev` for the frontend and `yarn start` for the mock server.

## Conclusion

This RBAC Admin project serves as a demonstration of role-based user management, with features such as user authentication, role creation, permission management, and activity tracking. By using Vue.js, TypeScript, Tailwind CSS, and JSON Server, this project simulates an admin dashboard and demonstrates essential user management features that can be used in real-world applications.
