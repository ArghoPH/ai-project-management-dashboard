import { defineStore } from 'pinia'
import type { Role, User } from '@/types/project'

const demoUsers: User[] = [
  { id: 'u1', name: 'Ariyan Rahman', email: 'admin@demo.com', role: 'Admin', avatar: 'AR' },
  { id: 'u2', name: 'Nusrat Jahan', email: 'manager@demo.com', role: 'Manager', avatar: 'NJ' },
  { id: 'u3', name: 'Tanvir Hasan', email: 'member@demo.com', role: 'Team Member', avatar: 'TH' }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: demoUsers[1] as User | null,
    users: demoUsers
  }),
  getters: {
    isAuthenticated: state => Boolean(state.user),
    role: state => state.user?.role ?? 'Team Member'
  },
  actions: {
    login(role: Role) {
      this.user = this.users.find(user => user.role === role) ?? demoUsers[2]
    },
    logout() {
      this.user = null
    }
  }
})
