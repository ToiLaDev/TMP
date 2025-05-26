import type { Fn } from '@/core/utils'
import { computed, getCurrentInstance, getCurrentScope, nextTick, onBeforeMount, onBeforeUnmount, onMounted, onScopeDispose, onUnmounted, ref } from 'vue'

export function getLifeCycleTarget(target?: any) {
  return target || getCurrentInstance()
}

export const tryOnBeforeMount = (fn: Fn, sync = true, target?: any) => {
  const instance = getLifeCycleTarget(target)
  if (instance) {
    onBeforeMount(fn, target)
  } else if (sync) {
    fn()
  } else {
    nextTick(fn)
  }
}

export const tryOnMounted = (fn: Fn, sync = true, target?: any) => {
  const instance = getLifeCycleTarget(target)
  if (instance) {
    onMounted(fn, target)
  } else if (sync) {
    fn()
  } else {
    nextTick(fn)
  }
}

export const tryOnBeforeUnmount = (fn: Fn, target?: any) => {
  const instance = getLifeCycleTarget(target)
  if (instance) {
    onBeforeUnmount(fn, target)
  }
}

export const tryOnUnmounted = (fn: Fn, target?: any) => {
  const instance = getLifeCycleTarget(target)
  if (instance) {
    onUnmounted(fn, target)
  }
}

export const tryOnScopeDispose = (fn: Fn) => {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}

export const isMounted = () => {
  const isMounted = ref(false)

  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }

  return isMounted
}

export const isSupported = (callback: () => unknown) => {
  const mounted = isMounted()

  return computed(() => {
    mounted.value
    return Boolean(callback())
  })
}
