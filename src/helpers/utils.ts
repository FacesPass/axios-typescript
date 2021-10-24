export function getType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

export function isDate(val: any): val is Date {
  return getType(val) === 'date'
}

//判断是否一个普通的对象
export function isPlainObject(val: any): val is Object {
  return getType(val) === 'object'
}

//把from全部拷贝到to里
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}