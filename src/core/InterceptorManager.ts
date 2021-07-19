import type { ResolveFn, RejectFn } from '../types'

export interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected: RejectFn
}


export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    //用来存储拦截器
    this.interceptors = []
  }


  use(resolved: ResolveFn<T>, rejected: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }


}