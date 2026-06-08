import { defineStore } from 'pinia'
import { apiRequest } from '@/lib/api'
import type { Role, User } from '@/types/project'

interface AuthResponse {
  token: string
  user: User
}

const demoUsers: User[] = [
  { id: 'u1', name: 'Ariyan Rahman', email: 'admin@demo.com', role: 'Admin', avatar: 'AR' },
  { id: 'u2', name: 'Nusrat Jahan', email: 'manager@demo.com', role: 'Manager', avatar: 'NJ' },
  { id: 'u3', name: 'Tanvir Hasan', email: 'member@demo.com', role: 'Team Member', avatar: 'TH' }
]

function readUserFromStorage(): User | null {
  const rawUser = localStorage.getItem('auth_user')
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser) as User
  } catch {
    localStorage.removeItem('auth_user')
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: readUserFromStorage(),
    token: localStorage.getItem('auth_token'),
    users: demoUsers,
    loading: false,
    error: ''
  }),
  getters: {
    isAuthenticated: state => Boolean(state.user && state.token),
    role: state => state.user?.role ?? 'Team Member'
  },
  actions: {
    setSession(payload: AuthResponse) {
      this.user = payload.user
      this.token = payload.token
      localStorage.setItem('auth_user', JSON.stringify(payload.user))
      localStorage.setItem('auth_token', payload.token)
    },
    async login(email: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        const payload = await apiRequest<AuthResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })
        this.setSession(payload)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    async demoLogin(role: Role) {
      this.loading = true
      this.error = ''

      try {
        const payload = await apiRequest<AuthResponse>('/auth/demo-login', {
          method: 'POST',
          body: JSON.stringify({ role })
        })
        this.setSession(payload)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Demo login failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    async loadProfile() {
      if (!this.token) return

      try {
        const user = await apiRequest<User>('/auth/me', { token: this.token })
        this.user = user
        localStorage.setItem('auth_user', JSON.stringify(user))
      } catch {
        this.logout()
      }
    },
    async fetchUsers() {
      if (!this.token) return

      try {
        this.users = await apiRequest<User[]>('/users', { token: this.token })
      } catch {
        this.users = demoUsers
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.error = ''
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
    }
  }
})
