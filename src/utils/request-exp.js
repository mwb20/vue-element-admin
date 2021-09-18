import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

export default function axiosHandler(service) {
  // request interceptor
  service.interceptors.request.use(
    config => {
      // do something before request is sent

      if (store.getters.token) {
        // let each request carry token
        // ['Authorization'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['Authorization'] = 'Bearer ' + getToken()
      }

      // 自动添加租户Id
      if (store.getters.currentTenant.id) {
        config.headers['__tenant'] = store.getters.currentTenant.id
      }
      // 默认设置为中文（需要做多语言版本时根据需求修改）
      config.headers['accept-language'] = 'zh-Hans'
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      return response.data
    },
    error => {
      console.log(error.message) // for debug
      let msg
      if (error.response && error.response.data.error && error.response.data.error.message) {
        if (error.response.data.error.details) {
          // 设置错误为后端返回的错误明细
          msg = error.response.data.error.details
        } else {
          // 设置错误消息为后端返回的错误消息
          msg = error.response.data.error.message
        }
      } else {
        msg = error.message
      }
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
}
