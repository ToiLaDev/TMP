import { useFetchApi } from '@/app/composables/useFetchApi'
import { type GetListParams, REQUEST_STATUS } from '@/app/constants/app'
import { Project } from '@/modules/project/models/project'
import { type MaybeRefOrGetter, toValue } from 'vue'
import { ArrayModel } from '@/core/utils'
import type { UseFetchReturn } from '@/core/useFetch'

export const useGetProjects = (params: MaybeRefOrGetter<GetListParams>): UseFetchReturn<ArrayModel<Project>> => {
  return useFetchApi<ArrayModel<Project>>('projects', { refetch: true, immediate: false, transform: (data: any) => Project.multiCast(data) }).get(params)
}

export const useGetProject = (id: string) => {
  return useFetchApi<Project>(`projects/${id}`, {
    transform: (data: any) => Project.cast(data)
  }).get()
}

export const useCreateProject = async (project: Project) => {
  const { data, error, status } = await useFetchApi('projects').post(project.toObject())
  if (status.value === REQUEST_STATUS.SUCCESS) {
    return Project.cast(data.value || {})
  } else {
    return toValue(error)
  }
}

export const useUpdateProject = async (project: Project) => {
  const { data, error, status } = await useFetchApi(`projects/${project.id}`).put(project.toObject())
  if (status.value === REQUEST_STATUS.SUCCESS) {
    return Project.cast(data.value || {})
  } else {
    return toValue(error)
  }
}

export const useDeleteProject = async (id: number) => {
  const { error } = await useFetchApi(`projects/${id}`).delete()
  return toValue(error)
}
