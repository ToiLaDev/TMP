export const DARK_MODE_DEFAULT = false
export const LANG_DEFAULT = 'en-US'
export const LANG_SHOW = {
  'vi-VN': 'Tiếng Việt',
  'en-US': 'English'
}
export const REQUEST_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
  ABORTED: 'aborted'
}
export const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS'
}
export const DATA_TYPE = {
  JSON: 'json',
  TEXT: 'text',
  BLOB: 'blob',
  ARRAY_BUFFER: 'arrayBuffer',
  FORM_DATA: 'formData'
}
export const PAYLOAD_MAPPING: Record<string, string> = {
  json: 'application/json',
  text: 'text/plain'
}
export const ERROR_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  VALIDATION: 422,
  GATEWAY_TIMEOUT: 504,
  SERVER: 500
}
export const ERROR_MESSAGE = {
  UNAUTHORIZED: 'errors.401_message',
  FORBIDDEN: 'errors.403_message',
  NOTFOUND: 'errors.404_message',
  GATEWAY_TIMEOUT: 'errors.504_message',
  VALIDATION: 'errors.422_message',
  SERVER: 'errors.500_message'
}

export const PER_PAGE = [20, 50, 100]
export interface GetListParams {
  page?: number
  limit?: number
  orders?: any
  filters?: any
}
