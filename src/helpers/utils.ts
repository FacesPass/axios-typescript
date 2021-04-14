export function getType(val: any): string {
  if (!val) throw Error(`val can't not be undefined`)
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function isDate(val: any): val is Date {
  return getType(val) === 'date'
}

export function isObject(val: any): val is Object {
  return getType(val) === 'object'
}
