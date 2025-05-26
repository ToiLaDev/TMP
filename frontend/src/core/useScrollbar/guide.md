# useScrollbar

Make elements perfectly scrollbar

## Usage

```vue
<script setup lang="ts">
import { useScrollbar } from '@/core/useScrollbar'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

useScrollbar(el)
</script>

<template>
  <div ref="el" style="height: 200px">
    <p v-for="n of 100">Line {{ n }}}</p>    
  </div>
</template>
```

## Component Usage

```vue
<template>
  <UseScrollbar>
    <p v-for="n of 100">Line {{ n }}}</p>    
  </UseScrollbar>
</template>
```