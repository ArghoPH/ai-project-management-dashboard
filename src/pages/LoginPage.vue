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
  <main class="grid min-h-screen place-items-center p-6">
    <section class="glass-card w-full max-w-5xl overflow-hidden rounded-[2.5rem]">
      <div class="grid md:grid-cols-[1.05fr_0.95fr]">
        <div class="bg-slate-950 p-8 text-white md:p-12">
          <p class="mb-4 text-xs font-black uppercase tracking-[0.35em] text-blue-300">Advanced Vue Project</p>
          <h1 class="text-4xl font-black leading-tight md:text-6xl">AI-Powered Project Management Dashboard</h1>
          <p class="mt-5 max-w-xl leading-7 text-slate-300">
            Role-based project workspace with smart risk scoring, Kanban workflow, analytics and AI recommendations.
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
        </div>

        <div class="p-8 md:p-12">
          <h2 class="text-2xl font-black text-slate-950">Demo Login</h2>
          <p class="mt-2 text-sm leading-6 text-slate-500">Choose a role to preview permissions and dashboard behavior.</p>

          <div class="mt-8 space-y-3">
            <button
              v-for="role in roles"
              :key="role"
              class="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:border-blue-400 hover:bg-blue-50"
              @click="login(role)"
            >
              <span class="block text-lg font-black text-slate-950">{{ role }}</span>
              <span class="text-sm font-semibold text-slate-500">
                {{ role === 'Admin' ? 'Full access to team and analytics.' : role === 'Manager' ? 'Manage projects, analytics and tasks.' : 'Task and Kanban access only.' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
