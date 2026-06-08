export type Role = 'Admin' | 'Manager' | 'Team Member'
export type TaskStatus = 'todo' | 'progress' | 'review' | 'done'
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
}

export interface Project {
  id: string
  name: string
  client: string
  deadline: string
  progress: number
  riskScore: number
  budget: number
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  assignee: string
  dueDate: string
  priority: Priority
  comments: number
}
