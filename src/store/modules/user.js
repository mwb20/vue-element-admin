import { abpApplicationConfiguration } from '@/api/abpFramework'
import { login, logout } from '@/api/auth'
import { getToken, setToken, removeToken, getTenant, setTenant, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  permissions: [],
  currentTenant: getTenant()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_TENANT: (state, tenant) => {
    state.currentTenant = tenant
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(commit)
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        // 如果存在刷新令牌时将其暂存起来
        if (response.refresh_token) {
          setRefreshToken(response.refresh_token)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      abpApplicationConfiguration.getApplicationConfiguration().then(async response => {
        let { auth, currentUser } = response
        const refreshToken = getRefreshToken()
        // 当前用户id为空，且刷新token不为空时，刷新token后重新获取一次
        if (!currentUser.id && refreshToken) {
          // 刷新token
          await this.dispatch('user/login', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.VUE_APP_CLIENTId
          })
          // 重新获取程序配置
          await abpApplicationConfiguration.getApplicationConfiguration().then(lastRes => {
            auth = lastRes.auth
            currentUser = lastRes.currentUser
          })
        }
        if (!auth) {
          reject('验证失败，请重新登录。')
        }

        // 认证数组不能为空
        if (!auth.grantedPolicies || Object.keys(auth.grantedPolicies).length <= 0) {
          reject('验证失败，你没有任何权限!')
        }
        const permissions = []
        for (const key in auth.grantedPolicies) {
          if (auth.grantedPolicies[key]) {
            permissions.push(key)
          }
        }

        commit('SET_PERMISSIONS', permissions)
        commit('SET_NAME', response.currentUser.userName)
        resolve(permissions)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 切换租户
  switchTenant({ commit }, tenant) {
    commit('SET_TENANT', tenant)
    // 存到cookie，为了刷新页面时还能获取到该值
    setTenant(tenant)
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout({ client_id: process.env.VUE_APP_CLIENTId, secret: process.env.VUE_APP_SCOPE, token: getToken(), token_type_hint: 'access_token' }).then(response => {
        const refreshToken = getRefreshToken()
        // 存在刷新token时才需要调刷新token销毁接口
        if (refreshToken) {
          logout({ client_id: process.env.VUE_APP_CLIENTId, secret: process.env.VUE_APP_SCOPE, token: refreshToken, token_type_hint: 'refresh_token' })
        }
        // 清除token并重置路由
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONS', [])
        removeToken()
        removeRefreshToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_PERMISSIONS', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
