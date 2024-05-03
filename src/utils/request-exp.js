import { Message } from 'element-ui'
import store from '@/store'
import { getRefreshToken } from '@/utils/auth'

export default function axiosHandler(service) {
  // request interceptor
  service.interceptors.request.use(
    config => {
      // do something before request is sent
      const token = store.getters.token
      if (token) {
        // let each request carry token
        // ['Authorization'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['Authorization'] = 'Bearer ' + token
      }

      // 自动添加租户Id
      const tenantId = store.getters.currentTenant.id
      if (tenantId) {
        config.headers['__tenant'] = tenantId
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
    async error => {
      let msg
      if (error.response) {
        // 401时表示未授权或token过期
        if (error.response.status === 401) {
          // 刷新token并重新请求
          return await refreshToken(error, service)
        } else if (error.response.data.error && error.response.data.error.message) {
          if (error.response.data.error.details) {
            // 设置错误为后端返回的错误明细
            msg = error.response.data.error.details
          } else {
            // 设置错误消息为后端返回的错误消息
            msg = error.response.data.error.message
          }
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
// 刷新token
async function refreshToken(response, service) {
  const authToken = response.config.headers['Authorization']
  const refreshToken = getRefreshToken()
  if (!authToken || authToken === 'Bearer ' + refreshToken) {
    return response.data
  }
  await store.dispatch('user/login', {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.VUE_APP_CLIENTId
  })
    .then(() => {
      response.config.headers['Authorization'] = 'Bearer ' + store.getters.token
    })
  let refResult
  await service(response.config).then(lastRes => {
    refResult = lastRes
  })
  return refResult
}
