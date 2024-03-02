import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes),
})

router.beforeEach((to, from, next) => {
  nProgress.start()

  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
