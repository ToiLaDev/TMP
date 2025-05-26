/// <reference types="vite/client" />
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    layout: string
    guest?: boolean
    permission?: string[]
    title?: string
  }
}

export {}
