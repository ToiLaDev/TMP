import { ERROR_CODE, ERROR_MESSAGE } from '@/app/constants/app'

export class FetchError extends Error {
  private code: number
  constructor(message = 'Server Error', code: number = 500) {
    super(message)
    this.name = this.constructor.name
    this.code = code

    if (Object.prototype.hasOwnProperty.call(Error, 'captureStackTrace')) {
      // @ts-ignore
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}

export class NotFoundError extends FetchError {
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}

export class GatewayTimeoutError extends FetchError {
  constructor(message = 'Gateway Timeout') {
    super(message, 504)
  }
}

export class ServerError extends FetchError {
  constructor(message = 'Internal Server Error') {
    super(message, 500)
  }
}

export class ValidationError extends FetchError {
  constructor(message = 'Not Valid') {
    super(message, 422)
  }
}

export const useFetchError = async (response: Response): Promise<FetchError> => {
  let error
  let data: any
  try {
    data = await response?.json()
  } catch (e) {
    data = {}
  }

  switch (response?.status) {
    case ERROR_CODE.SERVER:
      error = new ServerError(data?.message || ERROR_MESSAGE.SERVER)
      break
    case ERROR_CODE.NOTFOUND:
      error = new NotFoundError(data?.message || ERROR_MESSAGE.NOTFOUND)
      break
    case ERROR_CODE.GATEWAY_TIMEOUT:
      error = new GatewayTimeoutError(data?.message || ERROR_MESSAGE.GATEWAY_TIMEOUT)
      break
    case ERROR_CODE.VALIDATION:
      error = new ValidationError(data?.message || ERROR_MESSAGE.VALIDATION)
      Object.defineProperty(error, 'errors', {
        get() {
          return data?.errors || {}
        }
      })
      break
    default:
      error = new FetchError(data?.message || ERROR_MESSAGE.SERVER, response?.status)
  }

  for (const [key, refKey] of [
    ['status', 'status'],
    ['statusCode', 'status'],
    ['statusText', 'statusText'],
    ['statusMessage', 'statusText']
  ]) {
    Object.defineProperty(error, key, {
      get() {
        return response && (response as any)[refKey]
      }
    })
  }
  return error
}
