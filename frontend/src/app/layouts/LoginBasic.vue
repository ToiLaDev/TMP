<script setup lang="ts"></script>

<template>
  <div class="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0">
    <Card class="w-[450px]">
      <template #content><slot></slot></template>
    </Card>
  </div>
</template>

<style scoped lang="scss"></style>
