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
]

export default privateRoutes
