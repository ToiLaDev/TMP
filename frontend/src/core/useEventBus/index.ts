import { onScopeDispose } from 'vue'

export interface EventBusKey<T> extends Symbol {}
export type EventBusListener<T = unknown, P = any> = (event: T, payload?: P) => void
export type EventBusEvents<T, P = any> = Set<EventBusListener<T, P>>
export type EventBusIdentifier<T = unknown> = EventBusKey<T> | string | number

export const events = new Map<EventBusIdentifier<any>, EventBusEvents<any>>()

export interface UseEventBusReturn<T, P> {
  on: (listener: EventBusListener<T, P>) => void
  once: (listener: EventBusListener<T, P>) => void
  emit: (event?: T, payload?: P) => void
  off: (listener: EventBusListener<T>) => void
  reset: () => void
}

export const useEventBus = <T = unknown, P = any>(key: EventBusIdentifier<T>): UseEventBusReturn<T, P> => {
  const on = (listener: EventBusListener<T, P>) => {
    const listeners = events.get(key) || new Set()
    listeners.add(listener)
    events.set(key, listeners)

    const _off = () => off(listener)
    onScopeDispose(_off)
    return _off
  }

  const once = (listener: EventBusListener<T, P>) => {
    function _listener(...args: [T, P?]) {
      off(_listener)
      listener(...args)
    }
    return on(_listener)
  }

  const off = (listener: EventBusListener<T>): void => {
    const listeners = events.get(key)
    if (!listeners) return

    listeners.delete(listener)

    if (!listeners.size) reset()
  }

  const reset = () => {
    events.delete(key)
  }

  const emit = (event?: T, payload?: P) => {
    events.get(key)?.forEach((v) => v(event, payload))
  }

  return { on, once, off, emit, reset }
}
