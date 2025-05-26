<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoadingBar from '@/app/components/misc/LoadingBar.vue'
import { LAYOUT } from '@/app/constants/theme'
import { layoutComponents } from '@/app/layouts'

const route = useRoute()

const layout = computed(() => {
  return layoutComponents[(route.meta.layout as string) || LAYOUT.DEFAULT]
})
</script>

<template>
  <LoadingBar />
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style lang="scss"></style>
