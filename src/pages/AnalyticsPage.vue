<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import PageHeader from '@/components/PageHeader.vue'
import SimpleBarChart from '@/components/SimpleBarChart.vue'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Analytics"
      title="Performance, workload and risk intelligence."
      description="Advanced analytics page for managers and admins. This can later be connected to real backend reporting endpoints."
    />

    <section class="grid gap-5 lg:grid-cols-2">
      <SimpleBarChart title="Project Progress" :labels="projectStore.projects.map(project => project.name)" :values="projectStore.projects.map(project => project.progress)" />
      <SimpleBarChart title="Project Risk Score" :labels="projectStore.projects.map(project => project.name)" :values="projectStore.projects.map(project => project.riskScore)" />
    </section>

    <section class="glass-card mt-5 rounded-[2rem] p-5">
      <h3 class="mb-4 text-xl font-black text-slate-950">Activity Feed</h3>
      <div class="space-y-3">
        <p v-for="item in projectStore.activity" :key="item" class="rounded-2xl bg-white p-4 text-sm font-bold text-slate-600">
          {{ item }}
        </p>
      </div>
    </section>
  </AppShell>
</template>
