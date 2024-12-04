import { type RouteRecordRaw } from 'vue-router'

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: 'Dashboard | RBAC',
        }
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'users',
            component: () => import('@/views/dashboard/UsersListView.vue'),
            meta: {
              title: 'Users | RBAC',
            },
          },
          {
            path: 'new',
            name: 'new-user',
            component: () => import('@/views/dashboard/NewUserView.vue'),
            meta: {
              title: 'New user | RBAC',
            }
          },
          {
            path: 'edit/:id',
            name: 'edit-user',
            component: () => import('@/views/dashboard/EditUserView.vue'),
            meta: {
              title: 'Edit user | RBAC',
            }
          },
          {
            path: ':id',
            name: 'single-user',
            component: () => import('@/views/dashboard/ProfileView.vue'),
            meta: {
              title: 'Single user | RBAC',
            }
          },
          {
            path: 'permissions',
            name: 'permissions',
            component: () => import('@/views/dashboard/PermissionView.vue'),
            meta: {
              title: 'Permissions | RBAC',
            },
          },
          {
            path: 'roles',
            name: 'roles',
            component: () => import('@/views/dashboard/RolesView.vue'),
            meta: {
              title: 'Roles | RBAC',
            },
          },
        ]
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/dashboard/ActivityView.vue'),
        meta: {
          title: 'Activities | RBAC',
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/dashboard/ProfileView.vue'),
        meta: {
          title: 'Profile | RBAC',
        }
      },
    ]
  },
]

export default privateRoutes
