import { createRouter, createWebHistory } from 'vue-router/auto'
import nProgress from 'nprogress'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

router.beforeEach((to, from, next) => {
  nProgress.start()

  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
