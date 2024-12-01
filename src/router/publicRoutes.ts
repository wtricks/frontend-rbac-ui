import { type RouteRecordRaw } from 'vue-router'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: {
          title: 'Login | RBAC',
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: {
          title: 'Register | RBAC',
        },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPasswordView.vue'),
        meta: {
          title: 'Forgot password ? | RBAC',
        },
      },
      {
        path: 'reset-password/:token',
        name: 'reset-password',
        component: () => import('@/views/auth/ResetPasswordView.vue'),
        meta: {
          title: 'Reset password ? | RBAC',
        },
      },
      {
        path: 'verify-email/:token',
        name: 'verify-email',
        component: () => import('../views/auth/VerifyEmailView.vue'),
        meta: {
          title: 'Email verification | RBAC',
        },
      },
    ],
  },
]

export default publicRoutes
