import { createRouter, createWebHistory } from 'vue-router'
import { LAYOUT } from '@/app/constants/theme'
import { useAuthStore } from '@/app/store/auth'

const autoLoadRoute = async () => {
  const loadModules = async (): Promise<any> => {
    return new Promise((resolve) => {
      const modules = import.meta.glob('/**/*.route.ts')
      if (Object.keys(modules).length === 0) {
        resolve([])
        return
      }
      const promises: any = []
      for (const path in modules) {
        promises.push(modules[path]())
      }
      Promise.all(promises).then((values) => {
        resolve(
          values.reduce((acc, cur) => {
            acc.push(cur.default)
            return acc
          }, [])
        )
      })
    })
  }

  const routes = await loadModules()

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/app/pages/HomeView.vue'),
        meta: {
          layout: LAYOUT.SIDEBAR
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/app/pages/LoginView.vue'),
        meta: {
          guest: true,
          layout: LAYOUT.LOGIN
        }
      },
      ...routes,
      //403
      {
        path: '/not-authorized',
        name: 'not-authorized',
        component: () => import('@/app/pages/403View.vue'),
        meta: {
          layout: LAYOUT.ERROR
        }
      },
      // 404
      {
        path: '/:catchAll(.*)',
        component: () => import('@/app/pages/404View.vue'),
        meta: {
          guest: true,
          layout: LAYOUT.ERROR
        }
      }
    ]
  })

  router.beforeEach(async (to, from, next) => {
    const AUTH = useAuthStore()

    await AUTH.syncUser()

    if (!to.meta.guest && !AUTH.isAuthenticated) {
      next('/login')
    } else if (to.meta.permission && !AUTH.isAuthorized(to.meta.permission)) {
      next('/not-authorized')
    } else if (to.name == 'login' && AUTH.isAuthenticated) {
      next('/')
    }
    return next()
  })

  return router
}
export default autoLoadRoute
