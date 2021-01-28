import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

export async function login(data) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if (store.getters.currentTenant.id) {
    headers['__tenant'] = store.getters.currentTenant.id
  }
  return axios({
    url: `${process.env.VUE_APP_Auth_API}connect/token`,
    method: 'POST',
    data: data,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      if (ret.length > 0) {
        ret = ret.substr(0, ret.length - 1)
      }
      return ret
    }],
    headers: headers
  }).catch(errorHandler)
}

export async function logout() {
  return axios({
    url: `${process.env.VUE_APP_Auth_API}api/account/logout`,
    method: 'get'
  })
}

function errorHandler(err) {
  let msg
  if (err.response && err.response.data && err.response.data.error) {
    msg = err.response.data.error
  } else {
    msg = err
  }
  Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}
