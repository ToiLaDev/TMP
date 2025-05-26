import { object, number, string } from 'yup'
import { BaseModel } from '@/core/utils'

export const UserSchema = object().shape({
  id: number().required(),
  name: string().required(),
  email: string().email().required()
})

export class User extends BaseModel {
  id: number | null = null
  name: string = ''
  email: string = ''
  label?: string
  avatar?: string

  // _hidden = ['label', 'email']

  _schema = UserSchema
}
