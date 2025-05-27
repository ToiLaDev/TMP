<script setup lang="ts">
interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Title',
})
</script>

<template>
  <div class="flex mb-5">
    <h1 class="font-bold text-[32px] mb-2 flex-1">
      <span>{{ props.title }}</span>
    </h1>
    <div>
    <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>