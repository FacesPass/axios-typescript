import Axios from "./core/Axios";
import { extend } from "./helpers/utils";
import { AxiosInstance } from "./types";

//工厂函数创建axios实例
function createInstance(): AxiosInstance {
  const context = new Axios()

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios