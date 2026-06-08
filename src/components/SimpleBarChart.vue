<script setup lang="ts">
defineProps<{
  title: string
  labels: string[]
  values: number[]
}>()
</script>

<template>
  <section class="glass-card rounded-[2rem] p-5">
    <div class="mb-5 flex items-center justify-between gap-3">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Report</p>
        <h3 class="text-xl font-black text-slate-950">{{ title }}</h3>
      </div>
      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">Live</span>
    </div>

    <div class="space-y-4">
      <div v-for="(value, index) in values" :key="labels[index]" class="grid grid-cols-[82px_1fr_44px] items-center gap-3 sm:grid-cols-[132px_1fr_52px]">
        <p class="truncate text-sm font-bold text-slate-500">{{ labels[index] }}</p>
        <div class="h-4 overflow-hidden rounded-full bg-slate-100 shadow-inner">
          <div class="h-full rounded-full bg-gradient-to-r from-blue-600 to-orange-400" :style="{ width: `${value}%` }" />
        </div>
        <p class="text-right text-sm font-black text-slate-950">{{ value }}%</p>
      </div>
    </div>
  </section>
</template>
