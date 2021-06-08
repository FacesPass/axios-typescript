import { AxiosRequestConfig, AxiosResponse } from '../types'

//定义错误处理类
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    //这句代码的解释看这里
    //https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

//供外部调用的工厂函数
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse) {
  const error = new AxiosError(message, config, code, request, response)

  return error
}