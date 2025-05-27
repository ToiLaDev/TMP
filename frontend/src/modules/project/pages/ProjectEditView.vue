<script setup lang="ts">
import TitleBar from '@/app/components/panel/TitleBar.vue'
import ProjectForm from '@/modules/project/components/ProjectForm.vue'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { useGetProject } from '@/modules/project/api/useProject'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const popState = reactive({
  loading: false
})

const {data: project, pending} = useGetProject('1')

const handleSubmit = async () => {
  popState.loading = true
  popState.loading = false
}

</script>

<template>
  <TitleBar :title="t('project.detail')" />
  <ProjectForm
    v-model="project"
    @submit="handleSubmit"
    :loading="popState.loading || pending"
  />
</template>

<style scoped lang="scss">

</style>