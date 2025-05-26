<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  inputClass?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false
})

const modelValue = defineModel<string>()

const comProps = computed(() => {
  if (props.value !== undefined) return props
  const { value, ...rest } = props
  return rest
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <Password
      v-if="type === 'password'"
      v-model="modelValue"
      v-bind="comProps"
      :invalid="!!error"
      toggleMask
      :feedback="false"
    />
    <InputText
      v-else
      v-model="modelValue"
      v-bind="comProps"
      :invalid="!!error"
    />
    <small
      v-if="error"
      class="error-color"
      >{{ error }}</small
    >
  </div>
</template>

<style scoped lang="scss"></style>
