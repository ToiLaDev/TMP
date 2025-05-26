<script setup lang="ts">
interface Props {
  disabled?: boolean
  readonly?: boolean
  error?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false
})

const modelValue = defineModel<boolean>()
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox
      v-model="modelValue"
      v-bind="props"
      :binary="true"
      :invalid="!!error"
    />
    <label
      v-if="label"
      for="input-remember"
      :class="{ 'text-surface-500': props.disabled, 'error-color': !!error }"
      >{{ label }}</label
    >
  </div>
</template>

<style scoped lang="scss"></style>
