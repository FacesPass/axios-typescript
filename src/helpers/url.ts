import { isDate, isObject } from './utils'

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    //跳过本次循环
    if (val === null || typeof val === 'undefined') {
      return
    }

    const values = []

    if (Array.isArray(val)) {
    }
  })
}
