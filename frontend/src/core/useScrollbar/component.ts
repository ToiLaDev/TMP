import { defineComponent, h, ref } from 'vue'
import { useScrollbar } from '@/core/useScrollbar'

export const UseScrollbar = defineComponent({
  name: 'UseScrollbar',
  props: {
    target: { type: [String, HTMLElement] },
    offset: { type: Number, default: 0 }
  },
  setup(props, { slots }) {
    const target = ref()

    useScrollbar(target, { target: props.target, offset: props.offset })

    return () => {
      if (slots.default) return h('div', { ref: target }, slots.default())
    }
  }
})
