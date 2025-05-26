<script setup lang="ts">
import { useInterfaceStore } from '@/app/store/interface'

const IFS = useInterfaceStore()
</script>

<template>
  <ProgressBar
    v-if="IFS.loading"
    mode="indeterminate"
    class="loading-bar"
  ></ProgressBar>
</template>

<style scoped lang="scss">
.loading-bar {
  height: 2px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
</style>
