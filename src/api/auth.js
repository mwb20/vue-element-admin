import axios from 'axios'
import store from '@/store'
export function login(data) {
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
  })
}

export function logout() {
  return axios({
    url: `${process.env.VUE_APP_Auth_API}api/account/logout`,
    method: 'get'
  })
}
