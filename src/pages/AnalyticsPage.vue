<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import PageHeader from '@/components/PageHeader.vue'
import SimpleBarChart from '@/components/SimpleBarChart.vue'
import StatCard from '@/components/StatCard.vue'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Analytics"
      title="Performance, workload and risk intelligence."
      description="A responsive reporting page for managers and admins. Later this can connect to real backend analytics endpoints."
    />

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Avg. Progress" value="66%" helper="Across all active projects" />
      <StatCard label="Open Tasks" :value="projectStore.tasks.length - projectStore.completedTasks" helper="Remaining delivery work" />
      <StatCard label="Risk Alerts" :value="projectStore.highRiskProjects" helper="Needs manager attention" />
      <StatCard label="AI Notes" value="3" helper="Generated this week" />
    </section>

    <section class="mt-5 grid gap-5 lg:grid-cols-2">
      <SimpleBarChart title="Project Progress" :labels="projectStore.projects.map(project => project.name)" :values="projectStore.projects.map(project => project.progress)" />
      <SimpleBarChart title="Project Risk Score" :labels="projectStore.projects.map(project => project.name)" :values="projectStore.projects.map(project => project.riskScore)" />
    </section>

    <section class="glass-card mt-5 rounded-[2rem] p-5">
      <div class="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Timeline</p>
          <h3 class="text-xl font-black text-slate-950">Activity Feed</h3>
        </div>
        <span class="w-max rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">Real-time ready</span>
      </div>
      <div class="space-y-3">
        <div v-for="(item, index) in projectStore.activity" :key="item" class="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-blue-700">{{ index + 1 }}</div>
          <p class="text-sm font-bold leading-6 text-slate-600">{{ item }}</p>
        </div>
      </div>
    </section>
  </AppShell>
</template>
