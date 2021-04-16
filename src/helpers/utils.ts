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

//继承函数  
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }

  return to as T & U
}