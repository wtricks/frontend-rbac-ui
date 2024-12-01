import { createRouter, createWebHistory } from 'vue-router'

import privateRoutes from './privateRoutes'
import publicRoutes from './publicRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
    ...privateRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const meta = to.meta || {}

  if (meta.title) {
    document.title = meta.title as string
  }

  next()
})

export default router
