<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  helper: string
}>()
</script>

<template>
  <article class="glass-card rounded-[1.7rem] p-5">
    <p class="text-sm font-bold text-slate-500">{{ label }}</p>
    <div class="mt-3 flex items-end justify-between gap-4">
      <p class="text-4xl font-black tracking-tight text-slate-950">{{ value }}</p>
      <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-orange-400" />
    </div>
    <p class="mt-4 text-xs font-semibold text-slate-500">{{ helper }}</p>
  </article>
</template>
