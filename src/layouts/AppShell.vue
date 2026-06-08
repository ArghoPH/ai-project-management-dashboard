<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { BarChart3, Bell, LayoutDashboard, LogOut, PanelTop, Search, UsersRound } from '@lucide/vue'
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

const visibleLinks = computed(() => links.value.filter(item => item.visible))

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen px-3 py-3 pb-24 sm:px-4 lg:p-6">
    <header class="glass-card sticky top-3 z-40 mb-4 flex items-center justify-between gap-3 rounded-[1.5rem] px-4 py-3 lg:hidden">
      <div class="flex min-w-0 items-center gap-3">
        <div class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/20">AI</div>
        <div class="min-w-0">
          <p class="truncate text-xs font-black uppercase tracking-[0.24em] text-blue-600">Project OS</p>
          <p class="truncate text-sm font-black text-slate-950">{{ auth.user?.name }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button class="grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-600 shadow-sm">
          <Search class="h-4 w-4" />
        </button>
        <button class="relative grid h-10 w-10 place-items-center rounded-2xl bg-white text-slate-600 shadow-sm">
          <Bell class="h-4 w-4" />
          <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
        </button>
      </div>
    </header>

    <div class="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[288px_1fr]">
      <aside class="glass-card sticky top-6 hidden h-[calc(100vh-48px)] overflow-hidden rounded-[2rem] p-5 lg:block">
        <div class="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />

        <div class="relative mb-8 flex items-center gap-3">
          <div class="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-xl font-black text-white shadow-lg shadow-slate-900/20">AI</div>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Vue</p>
            <h1 class="text-lg font-black text-slate-950">Project OS</h1>
          </div>
        </div>

        <div class="relative mb-5 rounded-3xl border border-slate-100 bg-white/70 p-3">
          <div class="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-400">
            <Search class="h-4 w-4" /> Search project, task...
          </div>
        </div>

        <nav class="relative space-y-2">
          <RouterLink
            v-for="link in visibleLinks"
            :key="link.to"
            :to="link.to"
            class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition duration-200"
            :class="route.path === link.to ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'"
          >
            <component :is="link.icon" class="h-5 w-5" />
            {{ link.title }}
          </RouterLink>
        </nav>

        <div class="relative mt-6 rounded-3xl border border-blue-100 bg-blue-50/80 p-4">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Plan</p>
          <p class="mt-1 text-lg font-black text-slate-950">Smart Sprint</p>
          <p class="mt-2 text-xs font-semibold leading-5 text-slate-500">AI risk scoring and Kanban workflow are active for this workspace.</p>
        </div>

        <div class="absolute bottom-5 left-5 right-5 rounded-3xl bg-slate-950 p-4 text-white shadow-2xl shadow-slate-900/20">
          <div class="flex items-center gap-3">
            <div class="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 font-black">{{ auth.user?.avatar }}</div>
            <div class="min-w-0">
              <p class="truncate font-bold">{{ auth.user?.name }}</p>
              <p class="text-xs text-slate-300">{{ auth.user?.role }}</p>
            </div>
          </div>
          <button class="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-2 text-sm font-bold transition hover:bg-white/15" @click="logout">
            <LogOut class="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <main class="min-w-0">
        <slot />
      </main>
    </div>

    <nav class="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-4 gap-2 rounded-[1.5rem] border border-white/70 bg-white/90 p-2 shadow-2xl shadow-slate-900/12 backdrop-blur-xl lg:hidden">
      <RouterLink
        v-for="link in visibleLinks"
        :key="link.to"
        :to="link.to"
        class="flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-black transition"
        :class="route.path === link.to ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'"
      >
        <component :is="link.icon" class="h-4 w-4" />
        <span class="truncate">{{ link.title }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
