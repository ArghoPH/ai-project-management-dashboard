<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bot, CheckCircle2, Sparkles, Wand2 } from 'lucide-vue-next'
import { useProjectStore } from '@/stores/projects'

const projectStore = useProjectStore()
const prompt = ref('Which project needs attention today?')

const insights = computed(() => {
  const highRisk = projectStore.projects.filter(project => project.riskScore >= 65)
  const urgentTasks = projectStore.tasks.filter(task => task.priority === 'Urgent' && task.status !== 'done')
  const activeTasks = projectStore.tasks.filter(task => task.status !== 'done')

  return [
    {
      title: highRisk.length ? 'Risk Alert' : 'Stable Portfolio',
      text: highRisk.length ? `${highRisk[0].name} needs attention because risk is ${highRisk[0].riskScore}%.` : 'All projects are currently within a healthy risk range.'
    },
    {
      title: 'Next Best Action',
      text: urgentTasks.length ? `Start with “${urgentTasks[0].title}” because it is urgent and not completed.` : 'No urgent open task right now.'
    },
    {
      title: 'Workflow Summary',
      text: `${activeTasks.length} active tasks are still moving through the workflow.`
    }
  ]
})
</script>

<template>
  <section class="glass-card relative overflow-hidden rounded-[2rem] p-5">
    <div class="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
    <div class="relative mb-4 flex items-center justify-between gap-3">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.24em] text-blue-600">AI Copilot</p>
        <h3 class="text-xl font-black text-slate-950">Smart Recommendations</h3>
      </div>
      <div class="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <Bot class="h-6 w-6" />
      </div>
    </div>

    <div class="relative rounded-3xl bg-slate-950 p-4 text-white">
      <div class="mb-3 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 text-sm font-bold text-blue-200">
          <Sparkles class="h-4 w-4" /> Prompt
        </div>
        <span class="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-black text-emerald-300">92% confidence</span>
      </div>
      <input v-model="prompt" class="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-300" />
      <button class="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-blue-50">
        <Wand2 class="h-4 w-4" /> Generate insight
      </button>
    </div>

    <div class="relative mt-4 space-y-3">
      <div v-for="insight in insights" :key="insight.title" class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div class="mb-2 flex items-center gap-2 text-sm font-black text-slate-950">
          <CheckCircle2 class="h-4 w-4 text-emerald-500" /> {{ insight.title }}
        </div>
        <p class="text-sm font-semibold leading-6 text-slate-600">{{ insight.text }}</p>
      </div>
    </div>
  </section>
</template>
