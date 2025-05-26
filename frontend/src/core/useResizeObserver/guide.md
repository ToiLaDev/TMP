# useResizeObserver

Reports changes to the dimensions of an Element's content or the border-box

## Usage

```vue
<script setup lang="ts">
import { useResizeObserver } from '@/core/useResizeObserver'
import { ref } from 'vue'

const el = ref(null)
const text = ref('')

useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    text.value = `width: ${width}, height: ${height}`
})
</script>

<template>
  <div ref="el">
    {{ text }}
  </div>
</template>
```

## Directive Usage

```vue
<script setup lang="ts">
import { vResizeObserver } from '@/core/useResizeObserver/directive'
import { ref } from 'vue'

const text = ref('')

function onResizeObserver(entries) {
  const [entry] = entries
  const { width, height } = entry.contentRect
  text.value = `width: ${width}, height: ${height}`
}
</script>

<template>
  <div v-resize-observer="onResizeObserver">
    {{ text }}
  </div>
</template>
```