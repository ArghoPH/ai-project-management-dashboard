import { defineStore } from 'pinia'
import type { Project, Task, TaskStatus } from '@/types/project'

const projects: Project[] = [
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

const tasks: Task[] = [
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
  },
  {
    id: 't5',
    projectId: 'p2',
    title: 'Add biometric verification mock API',
    description: 'Simulate verification score and error handling.',
    status: 'todo',
    assignee: 'Tanvir Hasan',
    dueDate: '2026-06-25',
    priority: 'High',
    comments: 3
  },
  {
    id: 't6',
    projectId: 'p1',
    title: 'Prepare analytics export layout',
    description: 'Weekly progress, workload and risk overview.',
    status: 'progress',
    assignee: 'Ariyan Rahman',
    dueDate: '2026-06-20',
    priority: 'Medium',
    comments: 2
  }
]

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects,
    tasks,
    activity: [
      'Nusrat moved “Build role-based navigation” to In Progress.',
      'AI flagged Smart Loan Workflow as high risk.',
      'Tanvir requested review for Kanban drag flow.'
    ]
  }),
  getters: {
    totalProjects: state => state.projects.length,
    completedTasks: state => state.tasks.filter(task => task.status === 'done').length,
    overdueTasks: state => state.tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'done').length,
    highRiskProjects: state => state.projects.filter(project => project.riskScore >= 65).length,
    taskCompletionRate: state => Math.round((state.tasks.filter(task => task.status === 'done').length / state.tasks.length) * 100),
    tasksByStatus: state => (status: TaskStatus) => state.tasks.filter(task => task.status === status)
  },
  actions: {
    moveTask(taskId: string, status: TaskStatus) {
      const task = this.tasks.find(item => item.id === taskId)
      if (!task) return
      task.status = status
      this.activity.unshift(`${task.title} moved to ${status.replace('progress', 'in progress')}.`)
    }
  }
})
