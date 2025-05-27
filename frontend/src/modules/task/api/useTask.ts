import { useFetchApi } from '@/app/composables/useFetchApi'
import { type GetListParams, REQUEST_STATUS } from '@/app/constants/app'
import { Task } from '@/modules/task/models/task'
import { type MaybeRefOrGetter, toValue } from 'vue'
import { ArrayModel } from '@/core/utils'
import type { UseFetchReturn } from '@/core/useFetch'

export const useGetTasks = (params: MaybeRefOrGetter<GetListParams>): UseFetchReturn<ArrayModel<Task>> => {
  return useFetchApi<ArrayModel<Task>>('tasks', { refetch: true, immediate: false, transform: (data: any) => Task.multiCast(data) }).get(params)
}

export const useGetTask = (id: string) => {
  return useFetchApi<Task>(`tasks/${id}`, {
    transform: (data: any) => Task.cast(data)
  }).get()
}

export const useCreateTask = async (task: Task) => {
  const { data, error, status } = await useFetchApi('tasks').post(task.toObject())
  if (status.value === REQUEST_STATUS.SUCCESS) {
    return Task.cast(data.value || {})
  } else {
    return toValue(error)
  }
}

export const useUpdateTask = async (task: Task) => {
  const { data, error, status } = await useFetchApi(`tasks/${task.id}`).put(task.toObject())
  if (status.value === REQUEST_STATUS.SUCCESS) {
    return Task.cast(data.value || {})
  } else {
    return toValue(error)
  }
}

export const useDeleteTask = async (id: number) => {
  const { error } = await useFetchApi(`tasks/${id}`).delete()
  return toValue(error)
}
