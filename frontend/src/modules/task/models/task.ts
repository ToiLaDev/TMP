import { BaseModel } from '@/core/utils'
import { TaskPriority, TaskStatus } from '@/modules/task/constants'

export class Task extends BaseModel {
  id: number | null = null
  title: string = ''
  due_date: string = ''
  priority: TaskPriority = TaskPriority.MEDIUM
  status: TaskStatus = TaskStatus.TODO
}
