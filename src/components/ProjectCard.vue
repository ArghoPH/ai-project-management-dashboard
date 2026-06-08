<script setup lang="ts">
import type { Project } from '@/types/project'
import RiskBadge from './RiskBadge.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="glass-card rounded-[1.7rem] p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-lg font-black text-slate-950">{{ project.name }}</h3>
        <p class="text-sm font-semibold text-slate-500">{{ project.client }}</p>
      </div>
      <RiskBadge :score="project.riskScore" />
    </div>

    <div class="mt-5">
      <div class="mb-2 flex justify-between text-xs font-bold text-slate-500">
        <span>Progress</span>
        <span>{{ project.progress }}%</span>
      </div>
      <div class="h-3 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-blue-600" :style="{ width: `${project.progress}%` }" />
      </div>
    </div>

    <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
      <div class="rounded-2xl bg-slate-50 p-3">
        <p class="text-xs font-bold uppercase text-slate-400">Deadline</p>
        <p class="font-black text-slate-900">{{ project.deadline }}</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-3">
        <p class="text-xs font-bold uppercase text-slate-400">Budget</p>
        <p class="font-black text-slate-900">${{ project.budget.toLocaleString() }}</p>
      </div>
    </div>
  </article>
</template>
