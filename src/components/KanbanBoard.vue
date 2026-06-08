<script setup lang="ts">
import { ref } from 'vue'
import { MessageCircle } from 'lucide-vue-next'
import { useProjectStore } from '@/stores/projects'
import type { TaskStatus } from '@/types/project'

const projectStore = useProjectStore()
const draggingTaskId = ref<string | null>(null)
const overColumn = ref<TaskStatus | null>(null)

const columns: { title: string; status: TaskStatus; subtitle: string }[] = [
  { title: 'To Do', status: 'todo', subtitle: 'Planned work' },
  { title: 'In Progress', status: 'progress', subtitle: 'Currently building' },
  { title: 'Review', status: 'review', subtitle: 'Waiting feedback' },
  { title: 'Done', status: 'done', subtitle: 'Completed' }
]

function onDrop(status: TaskStatus) {
  if (!draggingTaskId.value) return
  projectStore.moveTask(draggingTaskId.value, status)
  draggingTaskId.value = null
  overColumn.value = null
}
</script>

<template>
  <div class="grid gap-4 xl:grid-cols-4">
    <section
      v-for="column in columns"
      :key="column.status"
      class="min-h-[520px] rounded-[2rem] border border-slate-200 bg-white/70 p-4 transition"
      :class="overColumn === column.status ? 'drag-over' : ''"
      @dragover.prevent="overColumn = column.status"
      @dragleave="overColumn = null"
      @drop="onDrop(column.status)"
    >
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 class="text-lg font-black text-slate-950">{{ column.title }}</h3>
          <p class="text-xs font-bold text-slate-400">{{ column.subtitle }}</p>
        </div>
        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {{ projectStore.tasksByStatus(column.status).length }}
        </span>
      </div>

      <div class="space-y-3">
        <article
          v-for="task in projectStore.tasksByStatus(column.status)"
          :key="task.id"
          draggable="true"
          class="cursor-grab rounded-3xl border border-slate-100 bg-white p-4 shadow-sm active:cursor-grabbing"
          @dragstart="draggingTaskId = task.id"
          @dragend="draggingTaskId = null; overColumn = null"
        >
          <div class="mb-3 flex items-center justify-between gap-2">
            <span class="rounded-full px-3 py-1 text-[11px] font-black"
              :class="task.priority === 'Urgent' ? 'bg-red-50 text-red-700' : task.priority === 'High' ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'">
              {{ task.priority }}
            </span>
            <span class="text-xs font-bold text-slate-400">{{ task.dueDate }}</span>
          </div>
          <h4 class="font-black leading-5 text-slate-950">{{ task.title }}</h4>
          <p class="mt-2 text-sm leading-6 text-slate-500">{{ task.description }}</p>
          <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <p class="text-xs font-black text-slate-600">{{ task.assignee }}</p>
            <div class="flex items-center gap-1 text-xs font-bold text-slate-400">
              <MessageCircle class="h-4 w-4" /> {{ task.comments }}
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
