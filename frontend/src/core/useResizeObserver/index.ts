import { computed, type MaybeRef, toValue, watch } from 'vue'
import { isSupported } from '@/core/utils'
import { tryOnScopeDispose } from '@/core/utils'

export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void

export interface UseResizeObserverOptions {
  /**
   * Sets which box model the observer will observe changes to. Possible values
   * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
   *
   * @default 'content-box'
   */
  box?: ResizeObserverBoxOptions
}

export const useResizeObserver = (target: MaybeRef<HTMLElement>[] | MaybeRef<HTMLElement | null>, callback: ResizeObserverCallback, options?: UseResizeObserverOptions) => {
  let observer: ResizeObserver | undefined
  const supported = isSupported(() => window && 'ResizeObserver' in window)

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const targets = computed(() => {
    const _targets = toValue(target)
    return Array.isArray(_targets) ? _targets.map((el) => toValue(el)) : [toValue(_targets)]
  })

  const stopWatch = watch(
    targets,
    (els) => {
      cleanup()
      if (supported.value && window) {
        observer = new ResizeObserver(callback)
        for (const _el of els) {
          if (_el) observer!.observe(_el, options)
        }
      }
    },
    { immediate: true, flush: 'post' }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return { stop }
}
