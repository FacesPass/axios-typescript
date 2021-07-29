import { AxiosRequestConfig } from "../types";

const strategyMap = Object.create(null)

//默认合并策略
function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

//只取val2的策略
function fromVal2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const strategyKeyfromVal2 = ['url', 'params', 'data']

//这三种策略key就用只返回val2的策略
strategyKeyfromVal2.forEach(key => {
  strategyMap[key] = fromVal2Strategy
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
    const strategy = strategyMap[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}