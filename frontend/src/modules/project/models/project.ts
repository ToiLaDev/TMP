import { BaseModel } from '@/core/utils'
import { ProjectStatus } from '@/modules/project/constants'

export class Project extends BaseModel {
  id: number | null = null
  title: string = ''
  description: string = ''
  status: ProjectStatus = ProjectStatus.ACTIVE
}
