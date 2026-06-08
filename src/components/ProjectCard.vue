<script setup lang="ts">
import type { Project } from '@/types/project'
import RiskBadge from './RiskBadge.vue'

const props = defineProps<{ project: Project }>()

function healthLabel(score: number) {
  if (score >= 70) return 'Needs action'
  if (score >= 45) return 'Watch closely'
  return 'Healthy'
}

function daysLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
</script>

<template>
  <article class="glass-card group relative overflow-hidden rounded-[1.7rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
    <div class="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-blue-500/5" />
    <div class="relative flex items-start justify-between gap-4">
      <div class="min-w-0">
        <div class="mb-3 flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full" :class="project.riskScore >= 70 ? 'bg-red-500' : project.riskScore >= 45 ? 'bg-orange-500' : 'bg-emerald-500'" />
          <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{{ healthLabel(project.riskScore) }}</p>
        </div>
        <h3 class="truncate text-lg font-black text-slate-950">{{ project.name }}</h3>
        <p class="text-sm font-semibold text-slate-500">{{ project.client }}</p>
      </div>
      <RiskBadge :score="project.riskScore" />
    </div>

    <div class="mt-6">
      <div class="mb-2 flex justify-between text-xs font-bold text-slate-500">
        <span>Progress</span>
        <span>{{ project.progress }}%</span>
      </div>
      <div class="h-3 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-gradient-to-r from-blue-600 to-orange-400 transition-all duration-500" :style="{ width: `${project.progress}%` }" />
      </div>
    </div>

    <div class="mt-5 grid grid-cols-3 gap-3 text-sm">
      <div class="rounded-2xl bg-slate-50 p-3">
        <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Days Left</p>
        <p class="mt-1 font-black text-slate-900">{{ daysLeft(props.project.deadline) }}</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-3">
        <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Budget</p>
        <p class="mt-1 font-black text-slate-900">${{ Math.round(project.budget / 1000) }}k</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-3">
        <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Deadline</p>
        <p class="mt-1 truncate font-black text-slate-900">{{ project.deadline.slice(5) }}</p>
      </div>
    </div>
  </article>
</template>
