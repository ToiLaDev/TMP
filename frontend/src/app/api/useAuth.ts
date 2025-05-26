import { useFetchApi } from '@/app/composables/useFetchApi'
import { User } from '@/app/models/user'
import { LOGIN_API_URL, LOGOUT_API_URL, USER_API_URL } from '@/app/constants/api'
import { REQUEST_STATUS } from '@/app/constants/app'
import { toValue } from 'vue'

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export const userLogin = async (credentials: LoginCredentials) => {
  const { data, error, status } = await useFetchApi<any>(LOGIN_API_URL).post(credentials)
  if (status.value === REQUEST_STATUS.SUCCESS) {
    return data.value?.token
  } else {
    return toValue(error)
  }
}

export const userLogout = async () => {
  const { error } = await useFetchApi(LOGOUT_API_URL).post({})
  return error.value
}

export const userInfo = async () => {
  const { data, error, status } = await useFetchApi<User>(USER_API_URL).get()
  if (status.value === REQUEST_STATUS.SUCCESS) {
    return User.cast(data.value || {})
  } else {
    return toValue(error)
  }
}
