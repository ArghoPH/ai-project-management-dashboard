<script setup lang="ts">
const props = defineProps<{ score: number }>()

function label(score: number) {
  if (score >= 70) return 'High Risk'
  if (score >= 45) return 'Medium Risk'
  return 'Low Risk'
}

function classes(score: number) {
  if (score >= 70) return 'bg-red-50 text-red-700 ring-red-200'
  if (score >= 45) return 'bg-orange-50 text-orange-700 ring-orange-200'
  return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
}
</script>

<template>
  <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1" :class="classes(props.score)">
    {{ label(props.score) }} · {{ props.score }}%
  </span>
</template>
