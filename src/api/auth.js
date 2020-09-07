import axios from 'axios'
export function login(data) {
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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function logout() {
  return axios({
    url: `${process.env.VUE_APP_Auth_API}api/account/logout`,
    method: 'get'
  })
}
