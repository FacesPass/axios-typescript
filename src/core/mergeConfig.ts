import { deepMerge, isPlainObject } from "../helpers/utils";
import { AxiosRequestConfig } from "../types";

const strategyMap = Object.create(null)

//默认合并策略，优先取val2的值
function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

//只取val2的策略，不取val1
function fromVal2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

//这三种策略的key就采用只取val2值的策略
const strategyKeyfromVal2 = ['url', 'params', 'data']

strategyKeyfromVal2.forEach(key => {
  strategyMap[key] = fromVal2Strategy
})

const strategyKeysOfDeepMerge = ['headers']
strategyKeysOfDeepMerge.forEach(key => {
  strategyMap[key] = deepMergeStrategy
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) {
  if (!config2) {
    config2 = {}
  }

  //创建一个纯洁的对象，不带任何原型方法
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  //JS策略模式应用
  function mergeField(key: string): void {
    //设置策略函数
    const strategy = strategyMap[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}