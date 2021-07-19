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
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

//返回数据格式Promise化的类型接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }

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
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>  //request方法

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

//混合接口
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}


//拦截器接口定义,泛型接口
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number

  eject(id: number): void
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (err: any): any
}

