import { type _GettersTree, defineStore } from 'pinia'
import { ELeftSidebarState } from '@/app/constants/key'
import { setLocale as i18nSetLocal } from '@/core/useI18n'
import { LANG_DEFAULT } from '@/app/constants/app'
import { fetchController } from '@/core/useFetch'
import { DARK_MODE_CLASS } from '@/app/constants/theme'
import { moment } from '@/core/useMoment'

interface InterfaceState {
  breadcrumbs: Array<{ label: string; route?: string }>
  menus: Array<any>
  leftSidebar: number
  locale: string
  darkMode: boolean
}

interface InterfaceGetters extends _GettersTree<InterfaceState> {}

interface InterfaceActions {
  init: () => Promise<void>
  setBreadcrumbs: (data: Array<{ label: string; route?: string }>) => void
  setMenus: (data: Array<any>) => void
  setLocale: (code: string) => Promise<void>
  toggleSidebar: () => void
  toggleDarkMode: () => void
}

export const useInterfaceStore = defineStore<'interface', InterfaceState, InterfaceGetters, InterfaceActions>('interface', {
  state: () => ({
    breadcrumbs: [],
    menus: [],
    leftSidebar: ELeftSidebarState.Full,
    locale: LANG_DEFAULT,
    darkMode: false
  }),

  getters: {
    loading: () => {
      return !fetchController.value.isEmpty()
    },
    getMenus: ({ menus }) => {
      return menus.map((menu) => {
        return {
          ...menu,
          class: menu.route && menu.route === window.location.pathname ? 'active' : '' + (menu.class || '')
        }
      })
    }
  },

  actions: {
    async init() {
      if (this.darkMode) {
        document.documentElement.classList.add(DARK_MODE_CLASS)
      }
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light')
      await this.setLocale(this.locale)
    },
    setBreadcrumbs(data: Array<{ label: string; route?: string }>) {
      this.breadcrumbs = data
    },
    setMenus(data: Array<any>) {
      this.menus = data
    },
    async setLocale(code: string) {
      this.locale = code
      moment.locale(code)
      await i18nSetLocal(code)
    },
    toggleSidebar() {
      this.leftSidebar = this.leftSidebar === ELeftSidebarState.Mini ? ELeftSidebarState.Full : ELeftSidebarState.Mini
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle(DARK_MODE_CLASS)
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light')
    }
  },

  persist: {
    paths: ['locale', 'leftSidebar', 'darkMode']
  }
})
