<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <header class="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:flex-row md:items-end">
    <div>
      <p class="mb-2 text-xs font-black uppercase tracking-[0.32em] text-blue-300">{{ eyebrow }}</p>
      <h2 class="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{{ title }}</h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">{{ description }}</p>
    </div>
    <div class="rounded-3xl bg-white/10 p-4 text-right">
      <p class="text-xs uppercase tracking-[0.2em] text-slate-300">Smart Risk</p>
      <p class="text-3xl font-black text-orange-300">Live</p>
    </div>
  </header>
</template>
