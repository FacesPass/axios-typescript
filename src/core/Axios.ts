import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectFn, ResolveFn } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./InterceptorManager";
import mergeConfig from "./mergeConfig";

//拦截器类型
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

//链式调用拦截器
interface PromiseChain {
  resolved: ResolveFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(), //请求拦截器管理类实例   
      response: new InterceptorManager<AxiosResponse>() //响应拦截器管理类实例
    }
  }

  // 在实例化Axios类的时候，在它的构造器去初始化这个interceptors实例属性
  request(url: any, config?: any): AxiosPromise {
    //运行时函数重载 实现axios(url, {}) 或者 axios({})
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    //请求拦截器后添加的要先执行
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    //响应拦截器是先添加的先执行
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    //拦截器链式调用逻辑
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }


  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { url, method, data }))
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

}