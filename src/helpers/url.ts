import { isDate, isObject } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%20/g, '+')
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%2C/gi, ',')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

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

    let values = []

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
    })

    parts.push(`${encode(key)}=${encode(val)}`)
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')

    //  带#hash的情况,把hash给去掉
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (!url.includes('?') ? '?' : '&') + serializedParams
  }

  return url
}
