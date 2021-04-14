export function getType(val: any): string {
  if (!val) throw Error(`val can't not be undefined`)
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function isDate(val: any): boolean {
  return getType(val) === 'date'
}

export function isObject(val: any): boolean {
  return getType(val) === 'object'
}
