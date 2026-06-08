<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Role } from '@/types/project'

const auth = useAuthStore()
const router = useRouter()
const roles: Role[] = ['Admin', 'Manager', 'Team Member']

function login(role: Role) {
  auth.login(role)
  router.push('/dashboard')
}
</script>

<template>
  <main class="grid min-h-screen place-items-center p-4 sm:p-6">
    <section class="glass-card relative w-full max-w-6xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div class="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div class="relative grid lg:grid-cols-[1.08fr_0.92fr]">
        <div class="overflow-hidden bg-slate-950 p-7 text-white sm:p-9 lg:p-12">
          <div class="mb-8 flex items-center gap-3">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl font-black text-slate-950">AI</div>
            <div>
              <p class="text-xs font-black uppercase tracking-[0.28em] text-blue-300">Advanced Vue Project</p>
              <p class="font-black">Project OS</p>
            </div>
          </div>

          <h1 class="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">AI-Powered Project Management Dashboard</h1>
          <p class="mt-5 max-w-xl leading-7 text-slate-300">
            Role-based project workspace with smart risk scoring, responsive Kanban workflow, analytics and AI recommendations.
          </p>

          <div class="mt-8 grid grid-cols-3 gap-3 text-center">
            <div class="rounded-3xl bg-white/10 p-4">
              <p class="text-2xl font-black">3</p>
              <p class="text-xs text-slate-300">Roles</p>
            </div>
            <div class="rounded-3xl bg-white/10 p-4">
              <p class="text-2xl font-black">4</p>
              <p class="text-xs text-slate-300">Boards</p>
            </div>
            <div class="rounded-3xl bg-white/10 p-4">
              <p class="text-2xl font-black">AI</p>
              <p class="text-xs text-slate-300">Copilot</p>
            </div>
          </div>

          <div class="mt-8 rounded-3xl border border-white/10 bg-white/10 p-4">
            <p class="text-sm font-black text-blue-200">Portfolio-ready UI polish</p>
            <p class="mt-1 text-sm leading-6 text-slate-300">Mobile navigation, responsive grids, glass cards, improved dashboards and refined interaction states.</p>
          </div>
        </div>

        <div class="p-7 sm:p-9 lg:p-12">
          <div class="mb-8">
            <p class="text-xs font-black uppercase tracking-[0.24em] text-blue-600">Preview Access</p>
            <h2 class="mt-2 text-3xl font-black text-slate-950">Demo Login</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">Choose a role to preview permissions and dashboard behavior.</p>
          </div>

          <div class="space-y-3">
            <button
              v-for="role in roles"
              :key="role"
              class="group w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg"
              @click="login(role)"
            >
              <span class="flex items-center justify-between gap-3">
                <span>
                  <span class="block text-lg font-black text-slate-950">{{ role }}</span>
                  <span class="text-sm font-semibold text-slate-500">
                    {{ role === 'Admin' ? 'Full access to team and analytics.' : role === 'Manager' ? 'Manage projects, analytics and tasks.' : 'Task and Kanban access only.' }}
                  </span>
                </span>
                <span class="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-blue-600">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
