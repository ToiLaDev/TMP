import { config } from '@/config'
import { type useFetch, createFetch, fetchHandleDefault, type FetchContext } from '@/core/useFetch'
import { useAuthStore } from '@/app/store/auth'
import { useEventBus } from '@/core/useEventBus'
import { KEY_FETCH_API_ERROR } from '@/app/constants/key'

export const useFetchApi = createFetch({
  baseUrl: config.BASE_API_URL,
  onRequest: (ctx: FetchContext) => {
    const myToken = useAuthStore().userToken

    ctx.options.headers = {
      ...ctx.options.headers,
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: myToken ? `Bearer ${myToken}` : ''
    }
  },
  onError: (error: Error, ctx: FetchContext) => {
    const { emit } = useEventBus(KEY_FETCH_API_ERROR)
    emit({ error, context: ctx })
  },
  handle: async (ctx: FetchContext) => {
    return fetchHandleDefault(ctx)
  }
}) as typeof useFetch
