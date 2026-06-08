<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Task Workflow"
      title="Drag tasks across the delivery pipeline."
      description="A clean Kanban experience built without heavy drag libraries. Move work from planning to completion and track team activity."
    />
    <KanbanBoard />
  </AppShell>
</template>
