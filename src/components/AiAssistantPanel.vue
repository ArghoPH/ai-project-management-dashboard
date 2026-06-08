<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bot, Sparkles } from 'lucide-vue-next'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
const prompt = ref('Which project needs attention today?')

const insights = computed(() => {
  const highRisk = projectStore.projects.filter(project => project.riskScore >= 65)
  const urgentTasks = projectStore.tasks.filter(task => task.priority === 'Urgent' && task.status !== 'done')
  const activeTasks = projectStore.tasks.filter(task => task.status !== 'done')

  return [
    highRisk.length ? `${highRisk[0].name} needs attention because risk is ${highRisk[0].riskScore}%.` : 'All projects are currently within a healthy risk range.',
    urgentTasks.length ? `Start with “${urgentTasks[0].title}” because it is urgent and not completed.` : 'No urgent open task right now.',
    `${activeTasks.length} active tasks are still moving through the workflow.`
  ]
})
</script>

<template>
  <section class="glass-card rounded-[2rem] p-5">
    <div class="mb-4 flex items-center justify-between gap-3">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.24em] text-blue-600">AI Copilot</p>
        <h3 class="text-xl font-black text-slate-950">Smart Recommendations</h3>
      </div>
      <div class="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white">
        <Bot class="h-6 w-6" />
      </div>
    </div>

    <div class="rounded-3xl bg-slate-950 p-4 text-white">
      <div class="mb-3 flex items-center gap-2 text-sm font-bold text-blue-200">
        <Sparkles class="h-4 w-4" /> Prompt
      </div>
      <input v-model="prompt" class="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-slate-400" />
    </div>

    <div class="mt-4 space-y-3">
      <div v-for="insight in insights" :key="insight" class="rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">
        {{ insight }}
      </div>
    </div>
  </section>
</template>
