<script setup lang="ts">
import TitleBar from '@/app/components/panel/TitleBar.vue'
import ProjectForm from '@/modules/project/components/ProjectForm.vue'
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import { Project } from '@/modules/project/models/project'
import { useCreateProject } from '@/modules/project/api/useProject'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const popState = reactive({
  loading: false
})
const project = ref<Project>(new Project())

const handleSubmit = async () => {
  popState.loading = true
  const res = await useCreateProject(project.value)
  popState.loading = false
  if (res instanceof Project) {
    // Handle success case, e.g., redirect to project view or show success message
    // Optionally, you can reset the form or redirect
    //project.value = res // Reset the form
    // Redirect to the project view or another page if needed
    await router.push({ name: 'project'})
  } else {
    // Handle error case, e.g., show an error message
    console.error('Failed to create project:', res)
  }
}

</script>

<template>
  <TitleBar :title="t('project.new')" />
  <ProjectForm
    v-model="project"
    @submit="handleSubmit"
    :loading="popState.loading"
  />
</template>

<style scoped lang="scss">

</style>