import type { UseFetchOptions } from '#app'

type DataT = any
interface HandleMap {
  [key: number]: () => void
  [key: string]: () => void
  500: () => void
  403: () => void
  401: () => void
}

const handleError = (response: Response) => {
  const err = (text: string) => console.log('🚀:>> ', text)

  const handelMap: HandleMap = {
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问服务器资源'),
    401: () => {
      err('登录状态已过期，需要重新登录')
      // 弹窗提示重新登录
      removeToken()
      navigateTo('/login')
    },
    '': () => err('未知错误')
  }

  if (handelMap[response.status]) {
    handelMap[response.status]()
  } else {
    err('请求超时，服务器无响应！')
  }
}

const request = async (url: string, option: UseFetchOptions<DataT>) => {
  const { data, pending, error, refresh } = await useFetch(url, {
    // 合并参数
    ...option,

    onRequest({ options }) {
      // 设置 baseURL
      const config = useRuntimeConfig()
      options.baseURL = config.public.baseURL

      // 设置请求头
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${getToken()}`)
    },
    onRequestError({ error, options }) {
      // 提示服务器请求失败
      console.log('🚀:>> ', '服务器请求失败', error)
    },
    onResponse({ response }) {
      if (response.status === 200) {
        // 处理响应结果
        // console.log('🚀:>> ', response)
      }
    },
    onResponseError({ response }) {
      if (response.status !== 200) handleError(response)
    }
  })

  return {
    // data,
    data: unref(data)?.rows ?? unref(data)?.data,
    total: unref(data)?.rows && unref(data)?.total,
    code: unref(data)?.code,
    pending,
    error,
    refresh
  }
}

export const useRequest = {
  // get: async (url: string, params: Pick<UseFetchOptions<DataT>, 'params'>, options?: UseFetchOptions<DataT>) => {
  //   const { data, pending, error, refresh } = await request(url, { method: 'get', params, ...options })

  //   return {
  //     data: unref(data)?.rows ?? unref(data)?.data,
  //     total: unref(data)?.rows && unref(data)?.total,
  //     code: unref(data)?.code,
  //     pending,
  //     error,
  //     refresh
  //   }
  // },
  get: async (url: string, params: Pick<UseFetchOptions<DataT>, 'params'>, options?: UseFetchOptions<DataT>) =>
    request(url, { method: 'get', params, ...options }),

  post: (url: string, body: Pick<UseFetchOptions<DataT>, 'body'>, options?: UseFetchOptions<DataT>) =>
    request(url, { method: 'post', body, ...options }),

  put: (url: string, body: Pick<UseFetchOptions<DataT>, 'body'>, options?: UseFetchOptions<DataT>) =>
    request(url, { method: 'put', body, ...options }),

  delete: (url: string, body: Pick<UseFetchOptions<DataT>, 'body'>, options?: UseFetchOptions<DataT>) =>
    request(url, { method: 'delete', body, ...options })
}
