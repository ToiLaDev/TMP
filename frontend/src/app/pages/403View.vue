<script setup lang="ts"></script>

<template>
  <div class="text-center lg:text-right">
    <div class="mt-12 mb-4 font-bold text-6xl text-surface-900 dark:text-surface-0">{{ $t('error.403_title') }}</div>
    <p class="text-surface-700 dark:text-surface-100 text-3xl mt-0 mb-12">{{ $t('error.403_message') }}</p>
    <router-link
      to="/"
      class="p-button p-component p-button-outlined"
      >{{ $t('error.back_home') }}</router-link
    >
  </div>
  <div>
    <img
      src="/assets/images/covers/404-rocket.png"
      alt="Image"
      class="w-full md:w-[28rem]"
    />
  </div>
</template>

<style scoped lang="scss"></style>
