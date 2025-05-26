import AppSidebar from '@/app/layouts/AppSidebar.vue'
import LoginBasic from '@/app/layouts/LoginBasic.vue'
import Empty from '@/app/layouts/Empty.vue'
import Error from '@/app/layouts/Error.vue'
import type { Component } from 'vue'

interface LayoutComponents {
  [key: string]: Component
}

export const layoutComponents: LayoutComponents = {
  AppSidebar,
  LoginBasic,
  Empty,
  Error
}
