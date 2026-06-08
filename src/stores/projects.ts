import { defineStore } from 'pinia'
import { apiRequest } from '@/lib/api'
import type { Project, Task, TaskStatus } from '@/types/project'

const fallbackProjects: Project[] = [
  {
    id: 'p1',
    name: 'Village Finance AI',
    client: 'Shakti Foundation',
    deadline: '2026-07-08',
    progress: 68,
    riskScore: 42,
    budget: 28500
  },
  {
    id: 'p2',
    name: 'Smart Loan Workflow',
    client: 'Microcredit Ops',
    deadline: '2026-06-28',
    progress: 48,
    riskScore: 74,
    budget: 18800
  },
  {
    id: 'p3',
    name: 'Customer Trust Bot',
    client: 'Support Team',
    deadline: '2026-08-14',
    progress: 81,
    riskScore: 24,
    budget: 12400
  }
]

const fallbackTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Design AI insight dashboard',
    description: 'Create KPI cards and risk scoring UI.',
    status: 'todo',
    assignee: 'Ariyan Rahman',
    dueDate: '2026-06-18',
    priority: 'High',
    comments: 4
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Build role-based navigation',
    description: 'Admin, Manager and Team Member access layers.',
    status: 'progress',
    assignee: 'Nusrat Jahan',
    dueDate: '2026-06-15',
    priority: 'Medium',
    comments: 2
  },
  {
    id: 't3',
    projectId: 'p2',
    title: 'Prototype Kanban drag flow',
    description: 'Allow tasks to move across workflow columns.',
    status: 'review',
    assignee: 'Tanvir Hasan',
    dueDate: '2026-06-11',
    priority: 'Urgent',
    comments: 7
  },
  {
    id: 't4',
    projectId: 'p3',
    title: 'Create local dialect response samples',
    description: 'Prepare example intents for AI assistant.',
    status: 'done',
    assignee: 'Nusrat Jahan',
    dueDate: '2026-06-09',
    priority: 'Low',
    comments: 1
  }
]

interface TaskStatusResponse {
  task: Task
  activity: string[]
}

function getAuthToken() {
  return localStorage.getItem('auth_token')
}

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: fallbackProjects,
    tasks: fallbackTasks,
    activity: [
      'Connect the backend to load persistent project data.',
      'Move a task in Kanban and refresh to test persistence.',
      'AI flagged Smart Loan Workflow as high risk.'
    ],
    loading: false,
    error: '',
    loaded: false
  }),
  getters: {
    totalProjects: state => state.projects.length,
    completedTasks: state => state.tasks.filter(task => task.status === 'done').length,
    overdueTasks: state => state.tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'done').length,
    highRiskProjects: state => state.projects.filter(project => project.riskScore >= 65).length,
    taskCompletionRate: state => state.tasks.length ? Math.round((state.tasks.filter(task => task.status === 'done').length / state.tasks.length) * 100) : 0,
    tasksByStatus: state => (status: TaskStatus) => state.tasks.filter(task => task.status === status)
  },
  actions: {
    async fetchWorkspace(force = false) {
      const token = getAuthToken()
      if (!token || (this.loaded && !force)) return

      this.loading = true
      this.error = ''

      try {
        const [projects, tasks, activity] = await Promise.all([
          apiRequest<Project[]>('/projects', { token }),
          apiRequest<Task[]>('/tasks', { token }),
          apiRequest<string[]>('/activity', { token })
        ])

        this.projects = projects
        this.tasks = tasks
        this.activity = activity
        this.loaded = true
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Could not load workspace data'
      } finally {
        this.loading = false
      }
    },
    async moveTask(taskId: string, status: TaskStatus) {
      const task = this.tasks.find(item => item.id === taskId)
      if (!task) return

      const previousStatus = task.status
      task.status = status
      this.activity.unshift(`${task.title} moved to ${status.replace('progress', 'in progress')}.`)

      const token = getAuthToken()
      if (!token) return

      try {
        const payload = await apiRequest<TaskStatusResponse>(`/tasks/${taskId}/status`, {
          method: 'PATCH',
          token,
          body: JSON.stringify({ status })
        })

        const updatedIndex = this.tasks.findIndex(item => item.id === taskId)
        if (updatedIndex !== -1) this.tasks[updatedIndex] = payload.task
        this.activity = payload.activity
      } catch (error) {
        task.status = previousStatus
        this.error = error instanceof Error ? error.message : 'Could not update task status'
      }
    }
  }
})
