/// <reference types="vite/client" />
import { moment } from './src/core/useMoment'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $moment: typeof moment
  }
}

export {}
