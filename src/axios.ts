import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

//axios主入口
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.headers = transformHeaders(config)
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

//对URL做转换
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

//对data做转换
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

//对headers做转换
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

//对接口返回的data做转换
function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)
  return res
}

export default axios
