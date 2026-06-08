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
      description="Monitor progress, risk score, productivity and next action from a single Vue-powered project operating system."
    />

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Projects" :value="projectStore.totalProjects" helper="Active projects in workspace" />
      <StatCard label="Completed Tasks" :value="projectStore.completedTasks" helper="Tasks closed by team" />
      <StatCard label="Completion Rate" :value="`${projectStore.taskCompletionRate}%`" helper="Overall progress indicator" />
      <StatCard label="High Risk" :value="projectStore.highRiskProjects" helper="Projects needing attention" />
    </section>

    <section class="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
      <div class="grid gap-5 lg:grid-cols-2">
        <ProjectCard v-for="project in projectStore.projects" :key="project.id" :project="project" />
        <SimpleBarChart title="Weekly Productivity" :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri']" :values="[44, 62, 58, 76, 68]" />
      </div>
      <AiAssistantPanel />
    </section>
  </AppShell>
</template>
