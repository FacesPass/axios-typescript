export type Method =
  | 'get'
  | 'GET'
  | 'DELETE'
  | 'delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

//axios配置信息接口
export interface AxiosRequestConfig {
  url: string
  method?: string
  headers?: any
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

//返回数据格式的接口
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

//返回数据格式Promise化的类型接口
export interface AxiosPromise extends Promise<AxiosResponse> { }

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}