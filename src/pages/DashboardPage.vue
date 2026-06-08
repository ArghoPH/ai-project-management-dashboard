<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import AiAssistantPanel from '@/components/AiAssistantPanel.vue'
import PageHeader from '@/components/PageHeader.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SimpleBarChart from '@/components/SimpleBarChart.vue'
import StatCard from '@/components/StatCard.vue'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Smart Workspace"
      title="Project health, task flow and AI guidance in one dashboard."
      description="Monitor progress, risk score, productivity and next action from a polished responsive Vue project operating system."
    />

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Projects" :value="projectStore.totalProjects" helper="Active projects in workspace" />
      <StatCard label="Completed Tasks" :value="projectStore.completedTasks" helper="Tasks closed by team" />
      <StatCard label="Completion Rate" :value="`${projectStore.taskCompletionRate}%`" helper="Overall progress indicator" />
      <StatCard label="High Risk" :value="projectStore.highRiskProjects" helper="Projects needing attention" />
    </section>

    <section class="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
      <div class="space-y-5">
        <div class="glass-card rounded-[2rem] p-5">
          <div class="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p class="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Portfolio</p>
              <h3 class="text-2xl font-black text-slate-950">Active Project Health</h3>
            </div>
            <div class="flex gap-2 overflow-x-auto">
              <span class="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">All</span>
              <span class="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-sm">High risk</span>
              <span class="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-sm">Due soon</span>
            </div>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <ProjectCard v-for="project in projectStore.projects" :key="project.id" :project="project" />
          </div>
        </div>

        <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <SimpleBarChart title="Weekly Productivity" :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri']" :values="[44, 62, 58, 76, 68]" />
          <section class="glass-card rounded-[2rem] p-5">
            <p class="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Today Focus</p>
            <h3 class="mt-1 text-xl font-black text-slate-950">Priority actions</h3>
            <div class="mt-5 space-y-3">
              <div class="rounded-2xl bg-white p-4 shadow-sm">
                <p class="text-sm font-black text-slate-950">Review urgent Kanban task</p>
                <p class="mt-1 text-sm font-semibold text-slate-500">Reduce delivery risk before next sprint.</p>
              </div>
              <div class="rounded-2xl bg-white p-4 shadow-sm">
                <p class="text-sm font-black text-slate-950">Check Smart Loan Workflow</p>
                <p class="mt-1 text-sm font-semibold text-slate-500">Risk score is above safe range.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <AiAssistantPanel />
    </section>
  </AppShell>
</template>
