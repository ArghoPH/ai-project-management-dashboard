<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { BarChart3, LayoutDashboard, LogOut, PanelTop, UsersRound } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const links = computed(() => [
  { title: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, visible: true },
  { title: 'Kanban', to: '/kanban', icon: PanelTop, visible: true },
  { title: 'Analytics', to: '/analytics', icon: BarChart3, visible: auth.role !== 'Team Member' },
  { title: 'Team', to: '/team', icon: UsersRound, visible: auth.role !== 'Team Member' }
])

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen p-4 lg:p-6">
    <div class="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[280px_1fr]">
      <aside class="glass-card sticky top-6 hidden h-[calc(100vh-48px)] rounded-[2rem] p-5 lg:block">
        <div class="mb-8 flex items-center gap-3">
          <div class="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-xl font-black text-white">AI</div>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Vue</p>
            <h1 class="text-lg font-black text-slate-950">Project OS</h1>
          </div>
        </div>

        <nav class="space-y-2">
          <RouterLink
            v-for="link in links.filter(item => item.visible)"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition"
            :class="route.path === link.to ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-600 hover:bg-slate-100'"
          >
            <component :is="link.icon" class="h-5 w-5" />
            {{ link.title }}
          </RouterLink>
        </nav>

        <div class="absolute bottom-5 left-5 right-5 rounded-3xl bg-slate-950 p-4 text-white">
          <div class="flex items-center gap-3">
            <div class="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 font-black">{{ auth.user?.avatar }}</div>
            <div>
              <p class="font-bold">{{ auth.user?.name }}</p>
              <p class="text-xs text-slate-300">{{ auth.user?.role }}</p>
            </div>
          </div>
          <button class="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-2 text-sm font-bold hover:bg-white/15" @click="logout">
            <LogOut class="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <main class="min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>
