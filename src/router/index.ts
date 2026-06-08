import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardPage from '@/pages/DashboardPage.vue'
import KanbanPage from '@/pages/KanbanPage.vue'
import AnalyticsPage from '@/pages/AnalyticsPage.vue'
import TeamPage from '@/pages/TeamPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: LoginPage },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/kanban',
      name: 'kanban',
      component: KanbanPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsPage,
      meta: { requiresAuth: true, roles: ['Admin', 'Manager'] }
    },
    {
      path: '/team',
      name: 'team',
      component: TeamPage,
      meta: { requiresAuth: true, roles: ['Admin', 'Manager'] }
    }
  ]
})

router.beforeEach(async to => {
  const auth = useAuthStore()

  if (auth.token && !auth.user) {
    await auth.loadProfile()
  }

  if (to.path === '/login' && auth.isAuthenticated) return '/dashboard'
  if (to.meta.requiresAuth && !auth.isAuthenticated) return '/login'

  const allowedRoles = to.meta.roles as string[] | undefined
  if (allowedRoles && !allowedRoles.includes(auth.role)) return '/dashboard'

  return true
})

export default router
