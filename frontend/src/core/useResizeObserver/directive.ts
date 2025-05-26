import type { ObjectDirective } from 'vue'
import { useResizeObserver, type UseResizeObserverOptions, type ResizeObserverCallback as CustomResizeObserverCallback } from '@/core/useResizeObserver'

export const vResizeObserver: ObjectDirective<HTMLElement, CustomResizeObserverCallback | [CustomResizeObserverCallback, UseResizeObserverOptions]> = {
  mounted(el: any, binding) {
    if (typeof binding.value === 'function') {
      useResizeObserver(el, binding.value as CustomResizeObserverCallback)
    } else {
      useResizeObserver(el, ...(binding.value as [CustomResizeObserverCallback, UseResizeObserverOptions]))
    }
  }
}
