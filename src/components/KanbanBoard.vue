<script setup lang="ts">
import { ref } from 'vue'
import { CalendarClock, GripVertical, MessageCircle } from '@lucide/vue'
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
      <!-- Column Container -->
      <section v-for="column in columns" :key="column.status"
        class="flex min-h-[600px] flex-col rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 transition-all duration-300 backdrop-blur-sm"
        :class="overColumn === column.status ? 'bg-slate-100/80 ring-2 ring-slate-200 scale-[1.005]' : ''"
        @dragover.prevent="overColumn = column.status" @dragleave="overColumn = null" @drop="onDrop(column.status)">

        <!-- Column Header -->
        <div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2.5">
            <!-- Glow dot based on status color -->
            <span class="h-2.5 w-2.5 rounded-full" :class="[column.tone, 'ring-current opacity-70']" />
            <div>
              <h3 class="text-sm font-bold text-slate-800 tracking-tight">{{ column.title }}</h3>
              <p class="text-[10px] font-semibold text-slate-400">{{ column.subtitle }}</p>
            </div>
          </div>

          <!-- Task Count Badge -->
          <span
            class="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-slate-500 border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {{ projectStore.tasksByStatus(column.status).length }}
          </span>
        </div>

        <!-- Column Body / Task List -->
        <div class="flex-1 space-y-3">
          <article v-for="task in projectStore.tasksByStatus(column.status)" :key="task.id" draggable="true"
            class="group cursor-grab rounded-xl border border-slate-200/60 bg-white p-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] active:cursor-grabbing"
            @dragstart="draggingTaskId = task.id" @dragend="draggingTaskId = null; overColumn = null">
            <!-- Card Header: Priority & Handle -->
            <div class="mb-2.5 flex items-center justify-between gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                :class="task.priority === 'Urgent' ? 'bg-rose-50 text-rose-700 border border-rose-100/50' :
                  task.priority === 'High' ? 'bg-amber-50 text-amber-700 border border-amber-100/50' :
                    task.priority === 'Medium' ? 'bg-blue-50 text-blue-700 border border-blue-100/50' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-100/50'
                  ">
                <span class="h-1 w-1 rounded-full bg-current" />
                {{ task.priority }}
              </span>
              <GripVertical class="h-4 w-4 text-slate-300 opacity-0 transition group-hover:opacity-100" />
            </div>

            <!-- Card Content -->
            <h4 class="text-sm font-semibold leading-relaxed text-slate-800">{{ task.title }}</h4>
            <p class="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{{ task.description }}</p>

            <!-- Due Date -->
            <div class="mt-3.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <CalendarClock class="h-3.5 w-3.5 text-slate-300" />
              <span>{{ task.dueDate }}</span>
            </div>

            <!-- Card Footer -->
            <div class="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
              <!-- Assignee Avatar -->
              <div class="flex items-center gap-2">
                <div
                  class="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 text-[9px] font-bold text-white shadow-sm">
                  {{task.assignee.split(' ').map(name => name[0]).join('')}}
                </div>
                <p class="text-[11px] font-semibold text-slate-600 truncate max-w-[80px]">{{ task.assignee }}</p>
              </div>

              <!-- Comments count -->
              <div
                class="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-600 transition">
                <MessageCircle class="h-3.5 w-3.5 text-slate-300" />
                <span>{{ task.comments }}</span>
              </div>
            </div>
          </article>

          <!-- Empty Column State -->
          <div v-if="projectStore.tasksByStatus(column.status).length === 0"
            class="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-5 text-center text-xs font-semibold text-slate-400 transition hover:bg-slate-50/80">
            No tasks • Drop here
          </div>
        </div>

      </section>
    </div>
  </div>
</template>
