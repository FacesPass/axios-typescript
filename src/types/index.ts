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
  url?: string
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

//处理错误的数据格式接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}


//Axios导出接口
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise  //request方法

  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

//混合接口
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
