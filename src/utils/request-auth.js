import axios from 'axios'
import axiosHandler from './request-exp'
// 单独使用一个request-auth是解决授权接口跟业务接口分开时的问题

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

axiosHandler(service)

export default service
