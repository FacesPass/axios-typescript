import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types'

//Axios默认配置
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    },
  },
  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function (data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsWithoutData = ['delete', 'get', 'head', 'options']

//这些请求都不需要headers
methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults