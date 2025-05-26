import { computed, isRef, readonly, ref, shallowRef, toRef, toValue, watch } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import { DATA_TYPE, PAYLOAD_MAPPING, REQUEST_STATUS, REQUEST_TYPE } from '@/app/constants/app'
import { KEY_RESPONSE_DATA_LIMIT, KEY_RESPONSE_DATA_OFFSET, KEY_RESPONSE_DATA_TOTAL, KEY_RESPONSE_DATA_WRAPPER } from '@/app/constants/key'
import { FetchError, useFetchError } from '@/core/useFetchError'
import { toQueryString } from '@/core/utils'

type RequestMethods = (typeof REQUEST_TYPE)[keyof typeof REQUEST_TYPE]
type RequestTypes = (typeof DATA_TYPE)[keyof typeof DATA_TYPE]
type RequestStatus = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS]

export interface FetchOptions {
  key: string
  immediate: boolean
  refetch: boolean
  clearDataBeforeRequest: boolean
  timeout: number
  updateDataOnError: boolean
  dataWrapper: string
  dataLimit: string
  dataTotal: string
  dataOffset: string
  handle: (ctx: FetchContext) => Promise<Response>
  onRequest?: (ctx: FetchContext) => void
  onError?: (error: FetchError, ctx: FetchContext) => void
  transform?: (data: any) => any
  headers?: Record<string, string>
}

export interface CreateFetchOptions {
  key?: string
  baseUrl?: string
  immediate?: boolean
  refetch?: boolean
  clearDataBeforeRequest?: boolean
  timeout?: number
  updateDataOnError?: boolean
  dataWrapper?: string
  dataLimit?: string
  dataTotal?: string
  dataOffset?: string
  handle?: (ctx: FetchContext) => Promise<Response>
  onRequest?: (ctx: FetchContext) => void
  onError?: (error: FetchError, ctx: FetchContext) => void
  transform?: (data: any) => any
  headers?: Record<string, string>
}

export interface FetchConfig {
  method: RequestMethods
  type: RequestTypes
  payload: any
  payloadType?: string
}

export interface FetchContext {
  url: string
  config: FetchConfig
  fetchOptions: any
  options: FetchOptions
}

export interface UseFetchReturn<T> {
  data: ShallowRef<T | undefined>
  limit: ShallowRef<number | undefined>
  total: ShallowRef<number | undefined>
  offset: ShallowRef<number | undefined>
  error: ShallowRef<FetchError | null>
  pending: Readonly<Ref<boolean>>
  status: Readonly<Ref<RequestStatus>>
  canAbort: Readonly<ComputedRef<boolean>>
  abort: Function
  clear: Function
  execute: () => Promise<any>
  refresh: () => Promise<any>
  // method
  get: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  post: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  put: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  delete: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  patch: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  head: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  options: (payload?: any, payloadType?: string) => UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
  // type
  json: <JSON = any>() => UseFetchReturn<JSON> & PromiseLike<UseFetchReturn<JSON>>
  text: () => UseFetchReturn<string> & PromiseLike<UseFetchReturn<string>>
  blob: () => UseFetchReturn<Blob> & PromiseLike<UseFetchReturn<Blob>>
  arrayBuffer: () => UseFetchReturn<ArrayBuffer> & PromiseLike<UseFetchReturn<ArrayBuffer>>
  formData: () => UseFetchReturn<FormData> & PromiseLike<UseFetchReturn<FormData>>
}

export class MultiAbortController {
  private controllers: Ref<Map<any, any>>
  constructor() {
    this.controllers = ref(new Map())
  }

  add(key: string, controller: AbortController) {
    if (!this.controllers.value.has(key)) {
      this.controllers.value.set(key, controller)
    }
  }

  isEmpty() {
    return this.controllers.value.size === 0
  }

  remove(key: string) {
    if (this.controllers.value.has(key)) {
      this.controllers.value.delete(key)
    }
  }

  abort(key: string) {
    if (this.controllers.value.has(key)) {
      const controller = this.controllers.value.get(key)
      controller.abort()
      this.controllers.value.delete(key)
    }
  }

  abortAll() {
    this.controllers.value.forEach((controller) => controller.abort())
    this.controllers.value.clear()
  }
}

export const fetchController = shallowRef(new MultiAbortController())

export const fetchHandleDefault = (ctx: FetchContext) => {
  const defaultFetchOptions: any = {
    method: ctx.config.method,
    headers: {}
  }
  let searchParams = ''
  if (ctx.config.payload) {
    const headers = defaultFetchOptions.headers as Record<string, string>
    const payload = toValue(ctx.config.payload)
    if (ctx.config.method === REQUEST_TYPE.GET) {
      if (payload) {
        searchParams = '?' + toQueryString(payload)
      }
    } else {
      if (!ctx.config.payloadType && payload && Object.getPrototypeOf(payload) === Object.prototype && !(payload instanceof FormData)) ctx.config.payloadType = 'json'

      if (ctx.config.payloadType && !(payload instanceof FormData)) headers['Content-Type'] = PAYLOAD_MAPPING[ctx.config.payloadType] ?? ctx.config.payloadType

      defaultFetchOptions.body = ctx.config.payloadType === 'json' ? JSON.stringify(payload) : (payload as BodyInit)
    }
  }

  return fetch(`${ctx.url}${searchParams}`, {
    ...defaultFetchOptions,
    ...ctx.fetchOptions,
    headers: {
      ...defaultFetchOptions.headers,
      ...ctx.options?.headers
    }
  })
}

export const createFetch = (config: CreateFetchOptions): (<T>(url: string, ...args: any[]) => UseFetchReturn<T>) => {
  return <T>(url: string, ...args: any[]): UseFetchReturn<T> => {
    const computedUrl = computed(() => {
      const baseUrl = toValue(config.baseUrl)
      const targetUrl = toValue(url)

      return `${baseUrl}/${targetUrl}`
    })

    return useFetch(computedUrl, { ...config, ...args[0] })
  }
}

// export function useFetch<T>(url: Ref<string> | string): UseFetchReturn<T>

export const useFetch = <T>(url: Ref<string> | string, ...args: any[]): UseFetchReturn<T> => {
  const supportsAbort = typeof AbortController === 'function'
  const data = shallowRef<T | undefined>(undefined)
  const limit = shallowRef<number | undefined>(undefined)
  const total = shallowRef<number | undefined>(undefined)
  const offset = shallowRef<number | undefined>(undefined)
  const error = shallowRef<FetchError | null>(null)
  const pending = shallowRef<boolean>(false)
  const status = shallowRef<RequestStatus>(REQUEST_STATUS.IDLE)
  const canAbort = computed(() => supportsAbort && pending.value)
  let controller: AbortController
  let executeCounter = 0
  let fetchOptions = {}
  let options: FetchOptions = {
    key: `${toValue(url)}?${Date.now()}`,
    immediate: true,
    refetch: false,
    clearDataBeforeRequest: false,
    timeout: 0,
    updateDataOnError: false,
    dataWrapper: KEY_RESPONSE_DATA_WRAPPER,
    dataLimit: KEY_RESPONSE_DATA_LIMIT,
    dataTotal: KEY_RESPONSE_DATA_TOTAL,
    dataOffset: KEY_RESPONSE_DATA_OFFSET,
    handle: fetchHandleDefault
  }

  const config: FetchConfig = {
    method: REQUEST_TYPE.GET,
    type: DATA_TYPE.JSON,
    payload: undefined
  }

  const isFetchOptions = (obj: any) => {
    return true
  }

  if (args.length > 0) {
    if (isFetchOptions(args[0])) options = { ...options, ...args[0] }
    else fetchOptions = args[0]
  }

  if (args.length > 1) {
    if (isFetchOptions(args[1])) options = { ...options, ...args[1] }
  }

  const clear = () => {
    abort()
    if (options.clearDataBeforeRequest) {
      data.value = undefined
      limit.value = undefined
      total.value = undefined
      offset.value = undefined
    }
    error.value = null
    pending.value = false
    status.value = REQUEST_STATUS.IDLE
  }

  const abort = () => {
    if (supportsAbort) {
      controller?.abort()
      controller = new AbortController()
      controller.signal.onabort = () => (status.value = REQUEST_STATUS.ABORTED)
      fetchOptions = {
        ...fetchOptions,
        signal: controller.signal
      }
    }
  }

  const execute = async () => {
    clear()

    loading(true)
    executeCounter++
    const currentExecuteCounter = executeCounter
    const context: FetchContext = {
      url: toValue(url),
      config,
      fetchOptions,
      options
    }

    if (options.onRequest) options.onRequest(context)

    return options
      .handle(context)
      .then(async (res) => {
        if (currentExecuteCounter !== executeCounter) {
          return
        }
        if (res.ok) {
          const contentType = res.headers.get('content-type')
          if (contentType?.includes('application/json')) {
            const jsonData = await res.json()
            data.value = options.transform ? options.transform(jsonData[options.dataWrapper]) : jsonData[options.dataWrapper]
            if (jsonData[options.dataTotal]) {
              total.value = jsonData[options.dataTotal]
            } else {
              total.value = undefined
            }
            if (jsonData[options.dataLimit]) {
              limit.value = jsonData[options.dataLimit]
            } else {
              limit.value = undefined
            }
            if (jsonData[options.dataOffset]) {
              offset.value = jsonData[options.dataOffset]
            } else {
              offset.value = undefined
            }
          } else if (contentType?.includes('text/plain')) {
            const textData = await res.text()
            data.value = options.transform ? options.transform(textData) : textData
          } else {
            const blobData = await res.blob()
            data.value = options.transform ? options.transform(blobData) : blobData
          }
          status.value = REQUEST_STATUS.SUCCESS
        } else {
          error.value = await useFetchError(res)
          status.value = REQUEST_STATUS.ERROR
          if (options.onError) options.onError(error.value, context)
        }
      })
      .catch((err) => {
        if (options.onError) options.onError(err, context)
        if (err?.name === 'AbortError') {
          status.value = REQUEST_STATUS.ABORTED
          return
        }
        error.value = err
        status.value = REQUEST_STATUS.ERROR
      })
      .finally(() => {
        loading(false)
      })
  }

  const refetch = toRef(options.refetch)
  watch([refetch, toRef(url)], ([refetch]) => refetch && execute(), { deep: true })

  const loading = (isLoading: boolean) => {
    if (isLoading) {
      fetchController.value.add(options.key, controller)
      pending.value = true
      status.value = REQUEST_STATUS.PENDING
    } else {
      fetchController.value.remove(options.key)
      pending.value = false
      if (status.value === REQUEST_STATUS.PENDING) {
        status.value = REQUEST_STATUS.SUCCESS
      }
    }
  }

  const setMethod = (method: RequestMethods) => {
    return (payload?: any, payloadType?: string) => {
      if (!pending.value) {
        config.method = method
        config.payload = payload
        config.payloadType = payloadType

        if (isRef(config.payload)) {
          watch([refetch, toRef(config.payload)], ([refetch]) => refetch && execute(), { deep: true })
        }
        return returnShell as any
      }
      return undefined
    }
  }

  const setType = (type: RequestTypes) => {
    return () => {
      if (!pending.value) {
        config.type = type
        return returnShell as any
      }
      return undefined
    }
  }

  const waitFinished = () => {
    return new Promise((resolve) => {
      watch(pending, (value) => {
        if (!value) {
          resolve(shell)
        }
      })
    })
  }

  const shell: UseFetchReturn<T> = {
    data,
    limit,
    total,
    offset,
    error,
    pending: readonly(pending),
    status: readonly(status),
    canAbort: readonly(canAbort) as ComputedRef<boolean>,
    abort,
    execute,
    refresh: execute,
    clear,
    // method
    get: setMethod(REQUEST_TYPE.GET),
    put: setMethod(REQUEST_TYPE.PUT),
    post: setMethod(REQUEST_TYPE.POST),
    delete: setMethod(REQUEST_TYPE.DELETE),
    patch: setMethod(REQUEST_TYPE.PATCH),
    head: setMethod(REQUEST_TYPE.HEAD),
    options: setMethod(REQUEST_TYPE.OPTIONS),
    // type
    json: setType(DATA_TYPE.JSON),
    text: setType(DATA_TYPE.TEXT),
    blob: setType(DATA_TYPE.BLOB),
    arrayBuffer: setType(DATA_TYPE.ARRAY_BUFFER),
    formData: setType(DATA_TYPE.FORM_DATA)
  }

  const returnShell = {
    ...shell,
    then(onFulfilled: ((value: unknown) => unknown) | null | undefined, onRejected: ((reason: any) => PromiseLike<never>) | null | undefined) {
      return waitFinished().then(onFulfilled, onRejected)
    }
  }

  if (options.immediate) Promise.resolve().then(() => execute())

  return returnShell
}
