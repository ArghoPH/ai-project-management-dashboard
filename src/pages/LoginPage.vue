<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LockKeyhole, Mail, ShieldCheck, Sparkles } from '@lucide/vue'
import { useAuthStore } from '@/stores/auth'
import type { Role } from '@/types/project'

const auth = useAuthStore()
const router = useRouter()

const email = ref('manager@demo.com')
const password = ref('password123')
const localError = ref('')

const demoAccounts: Array<{ role: Role; email: string; password: string; access: string }> = [
  { role: 'Admin', email: 'admin@demo.com', password: 'password123', access: 'Full team, analytics and admin view' },
  { role: 'Manager', email: 'manager@demo.com', password: 'password123', access: 'Project, analytics and team view' },
  { role: 'Team Member', email: 'member@demo.com', password: 'password123', access: 'Dashboard and Kanban view only' }
]

const errorMessage = computed(() => localError.value || auth.error)

function fillAccount(account: { email: string; password: string }) {
  email.value = account.email
  password.value = account.password
  localError.value = ''
}

async function submitLogin() {
  localError.value = ''

  if (!email.value || !password.value) {
    localError.value = 'Email and password are required.'
    return
  }

  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch {
    // Error is shown from the auth store.
  }
}

async function loginDemo(role: Role) {
  localError.value = ''

  try {
    await auth.demoLogin(role)
    router.push('/dashboard')
  } catch {
    // Error is shown from the auth store.
  }
}
</script>

<template>
  <main class="grid min-h-screen place-items-center p-4 sm:p-6">
    <section class="glass-card relative w-full max-w-6xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div class="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div class="relative grid lg:grid-cols-[1.02fr_0.98fr]">
        <div class="overflow-hidden bg-slate-950 p-7 text-white sm:p-9 lg:p-12">
          <div class="mb-8 flex items-center gap-3">
            <div class="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl font-black text-slate-950">AI</div>
            <div>
              <p class="text-xs font-black uppercase tracking-[0.28em] text-blue-300">Backend Auth Added</p>
              <p class="font-black">Project OS</p>
            </div>
          </div>

          <h1 class="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Secure Project Workspace Login</h1>
          <p class="mt-5 max-w-xl leading-7 text-slate-300">
            This step connects the Vue interface to a Node + Express authentication API using JWT, protected routes and role-based access control.
          </p>

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="rounded-3xl bg-white/10 p-4">
              <ShieldCheck class="mb-3 h-6 w-6 text-blue-300" />
              <p class="text-lg font-black">JWT</p>
              <p class="text-xs leading-5 text-slate-300">Token session</p>
            </div>
            <div class="rounded-3xl bg-white/10 p-4">
              <LockKeyhole class="mb-3 h-6 w-6 text-blue-300" />
              <p class="text-lg font-black">Password</p>
              <p class="text-xs leading-5 text-slate-300">Hashed backend check</p>
            </div>
            <div class="rounded-3xl bg-white/10 p-4">
              <Sparkles class="mb-3 h-6 w-6 text-blue-300" />
              <p class="text-lg font-black">RBAC</p>
              <p class="text-xs leading-5 text-slate-300">Admin / Manager / Member</p>
            </div>
          </div>

          <div class="mt-8 rounded-3xl border border-white/10 bg-white/10 p-4">
            <p class="text-sm font-black text-blue-200">Backend running at http://localhost:4000</p>
            <p class="mt-1 text-sm leading-6 text-slate-300">Start the API and Vue app together with <span class="font-black text-white">npm run dev:full</span>.</p>
          </div>
        </div>

        <div class="p-7 sm:p-9 lg:p-12">
          <div class="mb-7">
            <p class="text-xs font-black uppercase tracking-[0.24em] text-blue-600">Secure Access</p>
            <h2 class="mt-2 text-3xl font-black text-slate-950">Login</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">Use any demo account below. Password for all demo users is <strong>password123</strong>.</p>
          </div>

          <form class="space-y-4" @submit.prevent="submitLogin">
            <label class="block">
              <span class="mb-2 block text-sm font-black text-slate-700">Email</span>
              <span class="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-400">
                <Mail class="h-5 w-5 text-slate-400" />
                <input v-model="email" type="email" class="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none" placeholder="manager@demo.com" />
              </span>
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-black text-slate-700">Password</span>
              <span class="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-400">
                <LockKeyhole class="h-5 w-5 text-slate-400" />
                <input v-model="password" type="password" class="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none" placeholder="password123" />
              </span>
            </label>

            <p v-if="errorMessage" class="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{{ errorMessage }}</p>

            <button class="w-full rounded-3xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70" :disabled="auth.loading">
              {{ auth.loading ? 'Checking credentials...' : 'Login with backend' }}
            </button>
          </form>

          <div class="my-6 flex items-center gap-3">
            <div class="h-px flex-1 bg-slate-200" />
            <span class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Demo users</span>
            <div class="h-px flex-1 bg-slate-200" />
          </div>

          <div class="space-y-3">
            <article
              v-for="account in demoAccounts"
              :key="account.role"
              class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-lg"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button class="text-left" @click="fillAccount(account)">
                  <p class="font-black text-slate-950">{{ account.role }}</p>
                  <p class="mt-1 text-xs font-semibold text-slate-500">{{ account.email }} • {{ account.access }}</p>
                </button>
                <button class="rounded-2xl bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:bg-blue-600" @click="loginDemo(account.role)">
                  Quick Login
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
