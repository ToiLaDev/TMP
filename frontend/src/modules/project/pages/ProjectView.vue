<script setup lang="ts">
import { type GetListParams, PER_PAGE } from '@/app/constants/app'
import { onMounted, ref } from 'vue'
import { useDeleteProject, useGetProjects } from '@/modules/project/api/useProject'
import { useI18n } from '@/core/useI18n'
import TitleBar from '@/app/components/panel/TitleBar.vue'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

const { t } = useI18n()
const router = useRouter()
const confirm = useConfirm()

const getListParams = ref<GetListParams>({
  page: 1,
  limit: PER_PAGE[0]
})

const { data: projects, total, pending, execute } = useGetProjects(getListParams)

const pageHandle = (event: any) => {
  getListParams.value.page = event.page + 1
}

const viewHandler = (id: number) => {
  router.push({ name: 'project-detail', params: { id } })
}

const editHandler = (id: number) => {
  router.push({ name: 'project-edit', params: { id } })
}

const deleteHandler = (id: number) => {
  confirm.require({
    message: t('project.dialogs.delete.message'),
    header: t('project.dialogs.delete.title'),
    icon: 'app-icon icon-triangle-exclamation warning-color',
    rejectProps: {
      label: t('buttons.cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('buttons.ok'),
      severity: 'warn'
    },
    defaultFocus: 'accept',
    accept: async () => {
      await useDeleteProject(id)
      await execute()
    }
  })
}

onMounted(() => {
  execute()
})
</script>

<template>
  <main>
    <TitleBar :title="t('project.title')">
      <Button
        asChild
        v-slot="slotProps"
      >
        <RouterLink
          to="/projects/new"
          :class="slotProps.class"
          >{{ t('project.buttons.new') }}
        </RouterLink>
      </Button>
    </TitleBar>
    <DataTable
      :value="projects"
      :total-records="total"
      :loading="pending"
      paginator
      :always-show-paginator="false"
      :rows="getListParams.limit"
      :rows-per-page-options="PER_PAGE"
      lazy
      @page="pageHandle"
    >
      <Column
        field="id"
        :header="t('project.table.id')"
      ></Column>
      <Column
        field="title"
        :header="t('project.table.title')"
      >
        <template #body="slotProps">
          <Button
            variant="text"
            :label="slotProps.data.title"
            @click="viewHandler(slotProps.data.id)"
          />
        </template>
      </Column>
      <Column
        field="description"
        :header="t('project.table.description')"
      ></Column>
      <Column
        field="status"
        :header="t('project.table.status')"
      ></Column>
      <Column
        field="created_at"
        :header="t('project.table.createdAt')"
      ></Column>
      <Column
        field="updated_at"
        :header="t('project.table.updatedAt')"
      ></Column>
      <Column>
        <template #body="slotProps">
          <Button
            variant="text"
            :label="t('project.buttons.edit')"
            @click="editHandler(slotProps.data.id)"
          />
          <Button
            variant="text"
            :label="t('project.buttons.delete')"
            severity="danger"
            @click="deleteHandler(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<style scoped lang="scss"></style>
