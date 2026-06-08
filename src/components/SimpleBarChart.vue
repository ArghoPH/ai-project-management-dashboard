<script setup lang="ts">
defineProps<{
  title: string
  labels: string[]
  values: number[]
}>()
</script>

<template>
  <section class="glass-card rounded-[2rem] p-5">
    <h3 class="mb-5 text-xl font-black text-slate-950">{{ title }}</h3>
    <div class="space-y-4">
      <div v-for="(value, index) in values" :key="labels[index]" class="grid grid-cols-[96px_1fr_48px] items-center gap-3">
        <p class="truncate text-sm font-bold text-slate-500">{{ labels[index] }}</p>
        <div class="h-4 overflow-hidden rounded-full bg-slate-100">
          <div class="h-full rounded-full bg-blue-600" :style="{ width: `${value}%` }" />
        </div>
        <p class="text-right text-sm font-black text-slate-950">{{ value }}%</p>
      </div>
    </div>
  </section>
</template>
