/** *
 *请求模块
 */

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // console.log(config)

  // 注意： 这里务必要返回 config 配置对象，否则请求就在这里出不去
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

export default request
