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

  //依次执行拦截器数组，参数传入拦截器
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  //取消拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }


}