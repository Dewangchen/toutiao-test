/** *
 *请求模块
 */

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// const jsonStr = '{"art_id": "90071992547409924"}'

// console.log(JSON.parse(jsonStr))

// JSONBig 可以处理数据中超出js安全整数范围的问题
// console.log(JSONBig.parse(jsonStr)) // 把JSON格式的字符串转为 js对象
// JSONBig.stringify() // 把js对象转为 json格式的字符串

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 接口的基准路径

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }

    // axios 默认会在内部这样处理后端返回的数据
    // return JSON.parse(data)
  }]
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
