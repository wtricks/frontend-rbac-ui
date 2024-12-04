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
            component: () => import('@/views/dashboard/SingleUserView.vue'),
            meta: {
              title: 'New user | RBAC',
            }
          },
          {
            path: 'edit/:id',
            name: 'edit-user',
            component: () => import('@/views/dashboard/SingleUserView.vue'),
            meta: {
              title: 'Edit user | RBAC',
            }
          },
          {
            path: 'roles',
            children: [
              {
                path: '',
                name: 'roles',
                component: () => import('@/views/dashboard/RolesView.vue'),
                meta: {
                  title: 'Roles | RBAC',
                },
              },
              {
                path: 'new',
                name: 'new-role',
                component: () => import('@/views/dashboard/SingleRoleView.vue'),
                meta: {
                  title: 'New role | RBAC',
                }
              },
              {
                path: ':id',
                name: 'edit-role',
                component: () => import('@/views/dashboard/SingleRoleView.vue'),
                meta: {
                  title: 'Update role | RBAC',
                }
              }
            ]
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
        component: () => import('@/views/dashboard/SingleUserView.vue'),
        meta: {
          title: 'Profile | RBAC',
        }
      },
    ]
  },
]

export default privateRoutes
