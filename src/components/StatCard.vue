<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  helper: string
}>()
</script>

<template>
  <article class="glass-card group relative overflow-hidden rounded-[1.7rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
    <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-orange-500/10" />
    <div class="relative flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-bold text-slate-500">{{ label }}</p>
        <p class="mt-3 text-4xl font-black tracking-tight text-slate-950">{{ value }}</p>
      </div>
      <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-400 shadow-lg shadow-blue-600/20">
        <div class="h-5 w-5 rounded-lg bg-white/90" />
      </div>
    </div>
    <div class="relative mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
      <p class="text-xs font-semibold leading-5 text-slate-500">{{ helper }}</p>
      <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">+12%</span>
    </div>
  </article>
</template>
