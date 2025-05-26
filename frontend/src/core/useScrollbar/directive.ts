import type { ObjectDirective } from 'vue'
import { useScrollbar, type UseScrollbarOptions } from '@/core/useScrollbar'

export const vScrollbar: ObjectDirective<HTMLElement, UseScrollbarOptions> = {
  mounted(el: any, binding) {
    el._useScrollbar = useScrollbar(el, binding.value)
  },
  unmounted(el: any) {
    el._useScrollbar?.stop()
    delete el._useScrollbar
  }
}
