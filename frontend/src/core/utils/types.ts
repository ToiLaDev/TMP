import type { Ref } from 'vue'

export type Fn = () => void

export type AnyFn = (...args: any[]) => any

export type Arrayable<T> = T[] | T

export interface Stoppable<StartFnArgs extends any[] = any[]> {
  isPending: Readonly<Ref<boolean>>
  stop: Fn
  start: (...args: StartFnArgs) => void
}

export interface Pausable {
  isActive: Readonly<Ref<boolean>>
  pause: Fn
  resume: Fn
}
