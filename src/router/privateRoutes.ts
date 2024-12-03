import { type RouteRecordRaw } from 'vue-router'

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
      title: 'Dashboard | RBAC',
      authRequired: true,
    },
  },
  {
    path: '/dashboard/activity',
    name: 'activity',
    component: () => import('@/views/dashboard/ActivityView.vue'),
    meta: {
      title: 'Activities | RBAC',
      authRequired: true,
    },
  },
  {
    path: '/dashboard/users/permissions',
    name: 'permissions',
    component: () => import('@/views/dashboard/PermissionView.vue'),
    meta: {
      title: 'Permissions | RBAC',
      authRequired: true,
    },
  }
]

export default privateRoutes
