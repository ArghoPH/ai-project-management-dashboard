<script setup lang="ts">
import { ref } from 'vue'
import { CalendarClock, GripVertical, MessageCircle } from 'lucide-vue-next'
import { useProjectStore } from '@/stores/projects'
import type { TaskStatus } from '@/types/project'

const projectStore = useProjectStore()
const draggingTaskId = ref<string | null>(null)
const overColumn = ref<TaskStatus | null>(null)

const columns: { title: string; status: TaskStatus; subtitle: string; tone: string }[] = [
  { title: 'To Do', status: 'todo', subtitle: 'Planned work', tone: 'bg-slate-950' },
  { title: 'In Progress', status: 'progress', subtitle: 'Currently building', tone: 'bg-blue-600' },
  { title: 'Review', status: 'review', subtitle: 'Waiting feedback', tone: 'bg-orange-500' },
  { title: 'Done', status: 'done', subtitle: 'Completed', tone: 'bg-emerald-500' }
]

function onDrop(status: TaskStatus) {
  if (!draggingTaskId.value) return
  projectStore.moveTask(draggingTaskId.value, status)
  draggingTaskId.value = null
  overColumn.value = null
}
</script>

<template>
  <div class="-mx-3 overflow-x-auto px-3 pb-3 lg:mx-0 lg:px-0">
    <div class="grid min-w-[1080px] grid-cols-4 gap-4 xl:min-w-0">
      <section
        v-for="column in columns"
        :key="column.status"
        class="min-h-[560px] rounded-[2rem] border border-slate-200 bg-white/75 p-4 transition duration-200"
        :class="overColumn === column.status ? 'drag-over scale-[1.01]' : ''"
        @dragover.prevent="overColumn = column.status"
        @dragleave="overColumn = null"
        @drop="onDrop(column.status)"
      >
        <div class="mb-4 flex items-center justify-between gap-3 rounded-3xl bg-slate-50 p-3">
          <div class="flex items-center gap-3">
            <span class="h-10 w-2 rounded-full" :class="column.tone" />
            <div>
              <h3 class="text-lg font-black text-slate-950">{{ column.title }}</h3>
              <p class="text-xs font-bold text-slate-400">{{ column.subtitle }}</p>
            </div>
          </div>
          <span class="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm">
            {{ projectStore.tasksByStatus(column.status).length }}
          </span>
        </div>

        <div class="space-y-3">
          <article
            v-for="task in projectStore.tasksByStatus(column.status)"
            :key="task.id"
            draggable="true"
            class="cursor-grab rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:cursor-grabbing"
            @dragstart="draggingTaskId = task.id"
            @dragend="draggingTaskId = null; overColumn = null"
          >
            <div class="mb-3 flex items-center justify-between gap-2">
              <span class="rounded-full px-3 py-1 text-[11px] font-black"
                :class="task.priority === 'Urgent' ? 'bg-red-50 text-red-700' : task.priority === 'High' ? 'bg-orange-50 text-orange-700' : task.priority === 'Medium' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'">
                {{ task.priority }}
              </span>
              <GripVertical class="h-4 w-4 text-slate-300" />
            </div>
            <h4 class="font-black leading-5 text-slate-950">{{ task.title }}</h4>
            <p class="mt-2 text-sm leading-6 text-slate-500">{{ task.description }}</p>
            <div class="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400">
              <CalendarClock class="h-4 w-4" /> {{ task.dueDate }}
            </div>
            <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <div class="flex items-center gap-2">
                <div class="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-[10px] font-black text-white">
                  {{ task.assignee.split(' ').map(name => name[0]).join('') }}
                </div>
                <p class="text-xs font-black text-slate-600">{{ task.assignee }}</p>
              </div>
              <div class="flex items-center gap-1 text-xs font-bold text-slate-400">
                <MessageCircle class="h-4 w-4" /> {{ task.comments }}
              </div>
            </div>
          </article>

          <div v-if="projectStore.tasksByStatus(column.status).length === 0" class="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm font-bold text-slate-400">
            Drop tasks here
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
