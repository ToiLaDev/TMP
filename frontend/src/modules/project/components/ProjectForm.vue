<script setup lang="ts">
import InputCustom from '@/app/components/form/InputCustom.vue'
import Select from 'primevue/select'
import { Project } from '@/modules/project/models/project'
import { useI18n } from '@/core/useI18n'

const { t } = useI18n()

interface Props {
  loading?: boolean
  errors?: {
    title?: string
    description?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const modelValue = defineModel<Project>({
  default: () => new Project()
})

const emit = defineEmits(['submit'])

const status = [
  { label: t('project.status.active'), value: 'active' },
  { label: t('project.status.inactive'), value: 'inactive' }
]

const submitHandle = () => {
  emit('submit', modelValue.value)
}

</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-[450px]">
      <div>
        <label
          for="project-title"
          class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >{{ t('project.table.title') }}</label
        >
        <InputCustom
          v-model="modelValue.title"
          id="project-title"
          type="text"
          class="w-full mb-4"
          :disabled="props.loading"
          :error="errors?.title"
        />
      </div>
      <div>
        <label
          for="project-title"
          class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >{{ t('project.table.description') }}</label
        >
        <InputCustom
          v-model="modelValue.description"
          id="project-description"
          type="text"
          class="w-full mb-4"
          :disabled="props.loading"
          :error="errors?.description"
        />
      </div>
      <div>
        <label
          for="project-status"
          class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >{{ t('project.table.status') }}</label
        >
        <Select
          v-model="modelValue.status"
          :options="status"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="mt-5">
        <Button
          @click="submitHandle"
          :label="t('project.buttons.save')"
          id="submit-button"
          class="w-full"
          :loading="props.loading"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
