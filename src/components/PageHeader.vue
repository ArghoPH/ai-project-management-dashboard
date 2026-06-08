<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <header class="relative mb-6 overflow-hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-soft sm:p-6 lg:p-8">
    <div class="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl" />
    <div class="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
    <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

    <div class="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-blue-200">
          <span class="h-2 w-2 rounded-full bg-emerald-400" />
          {{ eyebrow }}
        </div>
        <h2 class="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{{ title }}</h2>
        <p class="mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">{{ description }}</p>
      </div>

      <div class="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-white/10 p-2 text-center backdrop-blur-xl sm:min-w-[300px]">
        <div class="rounded-2xl bg-white/10 p-3">
          <p class="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">Risk</p>
          <p class="mt-1 text-xl font-black text-orange-300">Live</p>
        </div>
        <div class="rounded-2xl bg-white/10 p-3">
          <p class="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">AI</p>
          <p class="mt-1 text-xl font-black text-blue-200">On</p>
        </div>
        <div class="rounded-2xl bg-white/10 p-3">
          <p class="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">Mode</p>
          <p class="mt-1 text-xl font-black text-emerald-300">Pro</p>
        </div>
      </div>
    </div>
  </header>
</template>
