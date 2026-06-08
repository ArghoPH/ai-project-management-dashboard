<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  LogOut,
  PanelTop,
  Search,
  UsersRound,
  ChevronLeft,
  ChevronRight
} from '@lucide/vue'
import { useAuthStore } from '@/stores/auth'
import { useProjectStore } from '@/stores/projects'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const projectStore = useProjectStore()

// Sidebar collapse state with localStorage persistence
const isCollapsed = ref(false)

const links = computed(() => [
  { title: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, visible: true },
  { title: 'Kanban', to: '/kanban', icon: PanelTop, visible: true },
  { title: 'Analytics', to: '/analytics', icon: BarChart3, visible: auth.role !== 'Team Member' },
  { title: 'Team', to: '/team', icon: UsersRound, visible: auth.role !== 'Team Member' }
])

const visibleLinks = computed(() => links.value.filter(item => item.visible))

onMounted(() => {
  projectStore.fetchWorkspace()

  // Load sidebar state from localStorage
  const savedState = localStorage.getItem('sidebar-collapsed')
  if (savedState !== null) {
    isCollapsed.value = JSON.parse(savedState)
  }
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed.value))
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/70 px-4 py-4 pb-28 antialiased sm:px-6 lg:p-8">

    <!-- Mobile Header -->
    <header
      class="sticky top-4 z-40 mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md lg:hidden">
      <div class="flex min-w-0 items-center gap-3">
        <div
          class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-white shadow-md shadow-slate-900/10">
          AI
        </div>
        <div class="min-w-0">
          <p class="text-[10px] font-bold uppercase tracking-widest text-blue-600">Project OS</p>
          <p class="truncate text-sm font-semibold text-slate-800">{{ auth.user?.name }}</p>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <button
          class="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200/70">
          <Search class="h-4 w-4" />
        </button>
        <button
          class="relative grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200/70">
          <Bell class="h-4 w-4" />
          <span class="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
        </button>
      </div>
    </header>

    <!-- Main Grid Layout (Dynamic grid-cols based on sidebar state) -->
    <div class="mx-auto grid max-w-[1440px] gap-6 transition-all duration-300 ease-in-out"
      :class="isCollapsed ? 'lg:grid-cols-[78px_1fr]' : 'lg:grid-cols-[280px_1fr]'">

      <!-- Desktop Sidebar (Collapsible) -->
      <aside
        class="sticky top-8 hidden h-[calc(100vh-64px)] flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out lg:flex relative"
        :class="isCollapsed ? 'w-[78px]' : 'w-[280px]'">
        <!-- Toggle Button (Positioned absolutely on the border) -->
        <button @click="toggleSidebar"
          class="absolute -right-3.5 top-8 z-50 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-800">
          <ChevronLeft v-if="!isCollapsed" class="h-4 w-4 transition-transform duration-300" />
          <ChevronRight v-else class="h-4 w-4 transition-transform duration-300" />
        </button>

        <!-- Top Section -->
        <div class="space-y-6">

          <!-- Logo Section -->
          <div class="flex items-center gap-3 px-1.5 overflow-hidden">
            <div
              class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-base font-bold text-white shadow-md shadow-slate-900/10">
              AI
            </div>
            <div class="transition-all duration-300 origin-left"
              :class="isCollapsed ? 'opacity-0 scale-95 w-0 pointer-events-none' : 'opacity-100 scale-100 w-auto'">
              <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Vue Dashboard
              </p>
              <h1 class="text-base font-bold text-slate-900 whitespace-nowrap">Project OS</h1>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="relative px-0.5">
            <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search..."
              :class="isCollapsed ? 'w-10 pl-10 pr-0 cursor-pointer' : 'w-full pl-10 pr-4'"
              class="h-10 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100" />
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1 px-0.5">
            <RouterLink v-for="link in visibleLinks" :key="link.to" :to="link.to"
              class="group flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200"
              :class="[
                route.path === link.to
                  ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                isCollapsed ? 'justify-center px-0 h-10 w-10' : 'px-3.5'
              ]" :title="isCollapsed ? link.title : ''">
              <component :is="link.icon" class="h-4.5 w-4.5 shrink-0 opacity-80 group-hover:opacity-100" />
              <span class="transition-all duration-200 origin-left whitespace-nowrap"
                :class="isCollapsed ? 'opacity-0 scale-90 w-0 pointer-events-none hidden' : 'opacity-100 scale-100 w-auto'">
                {{ link.title }}
              </span>
            </RouterLink>
          </nav>
        </div>

        <!-- Bottom Section -->
        <div class="space-y-4">

          <!-- Smart Sprint Plan Widget -->
          <div class="overflow-hidden rounded-xl border border-blue-100 bg-blue-50/40 transition-all duration-300"
            :class="isCollapsed ? 'p-0 h-0 border-0 opacity-0' : 'p-4 h-auto opacity-100'">
            <div class="flex items-center gap-2">
              <span class="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <p class="text-[11px] font-bold uppercase tracking-wider text-blue-600 whitespace-nowrap">Smart Sprint</p>
            </div>
            <p class="mt-1.5 text-xs text-slate-600 leading-relaxed">
              AI risk scoring and Kanban workflow are active for this workspace.
            </p>
          </div>

          <!-- User Profile Box -->
          <div class="rounded-xl border border-slate-100 bg-slate-50 transition-all duration-300"
            :class="isCollapsed ? 'p-1 bg-transparent border-0' : 'p-3.5'">
            <div class="flex items-center gap-3" :class="isCollapsed ? 'justify-center' : ''">
              <div
                class="grid shrink-0 place-items-center rounded-lg bg-slate-200 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300"
                :class="isCollapsed ? 'h-10 w-10' : 'h-9 w-9'" :title="isCollapsed ? auth.user?.name : ''">
                {{ auth.user?.avatar || 'U' }}
              </div>
              <div class="min-w-0 flex-1 transition-all duration-300 origin-left"
                :class="isCollapsed ? 'opacity-0 scale-90 w-0 pointer-events-none hidden' : 'opacity-100 scale-100 w-auto'">
                <p class="truncate text-sm font-semibold text-slate-800">{{ auth.user?.name }}</p>
                <p class="truncate text-xs text-slate-500">{{ auth.user?.role }}</p>
              </div>
            </div>

            <button @click="logout"
              class="mt-3 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              :class="isCollapsed ? 'w-10 h-10 mt-2 px-0 border-0 bg-slate-50 hover:bg-slate-100' : 'w-full'"
              :title="isCollapsed ? 'Logout' : ''">
              <LogOut class="h-3.5 w-3.5 shrink-0" />
              <span v-if="!isCollapsed">Logout</span>
            </button>
          </div>

        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="min-w-0">
        <slot />
      </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <nav
      class="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-around gap-1 rounded-2xl border border-slate-200/60 bg-white/90 p-1.5 shadow-xl shadow-slate-900/5 backdrop-blur-lg lg:hidden">
      <RouterLink v-for="link in visibleLinks" :key="link.to" :to="link.to"
        class="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-medium transition"
        :class="route.path === link.to ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'">
        <component :is="link.icon" class="h-4 w-4" />
        <span class="max-w-[64px] truncate">{{ link.title }}</span>
      </RouterLink>
    </nav>

  </div>
</template>