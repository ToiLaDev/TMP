import { type _GettersTree, defineStore } from 'pinia'
import { User } from '@/app/models/user'
import type { LoginCredentials } from '@/app/api/useAuth'
import { userInfo, userLogin, userLogout } from '@/app/api/useAuth'

interface InterfaceState {
  user: User | null
  userToken: string | null
  lastError: Error | null
}

interface InterfaceGetters extends _GettersTree<InterfaceState> {}

interface InterfaceActions {
  syncUser: () => Promise<boolean>
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => Promise<void>
}

export const useAuthStore = defineStore<'auth', InterfaceState, InterfaceGetters, InterfaceActions>('auth', {
  state: () => ({
    user: null,
    userToken: null,
    lastError: null
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.userToken
    },
    isAuthorized: (state) => (permission: any) => {
      console.log(state.user, permission)
      return true
    },
    userAvatar: (state) => {
      return state.user?.avatar
    },
    userName: (state) => {
      return state.user?.name
    }
  },

  actions: {
    async syncUser() {
      if (!this.userToken || this.user) return new Promise((resolve) => resolve(true))
      const res = await userInfo()
      if (res instanceof Error) {
        this.userToken = null
        this.lastError = res
        return new Promise((resolve) => resolve(false))
      } else {
        this.user = res
        this.lastError = null
        return new Promise((resolve) => resolve(true))
      }
    },

    async login(credentials: LoginCredentials) {
      const res = await userLogin(credentials)
      if (res instanceof Error) {
        this.lastError = res
        return false
      } else {
        this.userToken = res
        this.lastError = null
        return true
      }
    },

    async logout() {
      const res = await userLogout()
      if (res instanceof Error) {
        this.lastError = res
      } else {
        this.user = null
        this.userToken = null
        this.lastError = null
      }
    }
  },

  persist: {
    paths: ['userToken']
  }
})
