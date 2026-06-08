<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Team Management"
      title="Role-based team visibility."
      description="This screen demonstrates access control. Team Member role cannot open this page. Cards are responsive for portfolio presentation."
    />

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="member in auth.users" :key="member.id" class="glass-card group overflow-hidden rounded-[2rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
        <div class="mb-5 flex items-center justify-between gap-4">
          <div class="grid h-16 w-16 place-items-center rounded-3xl bg-slate-950 text-xl font-black text-white shadow-lg shadow-slate-900/20">{{ member.avatar }}</div>
          <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{{ member.role }}</span>
        </div>
        <h3 class="text-xl font-black text-slate-950">{{ member.name }}</h3>
        <p class="mt-1 text-sm font-semibold text-slate-500">{{ member.email }}</p>

        <div class="mt-5 grid grid-cols-3 gap-2 text-center">
          <div class="rounded-2xl bg-white p-3 shadow-sm">
            <p class="text-lg font-black text-slate-950">8</p>
            <p class="text-[10px] font-bold uppercase text-slate-400">Tasks</p>
          </div>
          <div class="rounded-2xl bg-white p-3 shadow-sm">
            <p class="text-lg font-black text-slate-950">3</p>
            <p class="text-[10px] font-bold uppercase text-slate-400">Projects</p>
          </div>
          <div class="rounded-2xl bg-white p-3 shadow-sm">
            <p class="text-lg font-black text-slate-950">92%</p>
            <p class="text-[10px] font-bold uppercase text-slate-400">Focus</p>
          </div>
        </div>
      </article>
    </section>
  </AppShell>
</template>
