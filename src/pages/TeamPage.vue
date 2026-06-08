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
      description="This screen demonstrates access control. Team Member role cannot open this page."
    />

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="member in auth.users" :key="member.id" class="glass-card rounded-[2rem] p-5">
        <div class="mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-slate-950 text-xl font-black text-white">{{ member.avatar }}</div>
        <h3 class="text-xl font-black text-slate-950">{{ member.name }}</h3>
        <p class="text-sm font-semibold text-slate-500">{{ member.email }}</p>
        <span class="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{{ member.role }}</span>
      </article>
    </section>
  </AppShell>
</template>
