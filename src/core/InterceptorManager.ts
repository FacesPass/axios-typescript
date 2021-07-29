import type { ResolveFn, RejectFn } from '../types'

export interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}

export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[]

  constructor() {
    //用来存储拦截器
    this.interceptors = []
  }


  use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    //返回拦截器的id，实际可以返回当前拦截器数组的长度
    return this.interceptors.length - 1
  }

  //内部使用的方法，不通过接口暴露。依次执行拦截器数组，参数传入拦截器
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