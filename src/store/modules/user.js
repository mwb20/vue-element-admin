import { abpApplicationConfiguration } from '@/api/abpFramework'
import { login, logout } from '@/api/auth'
import { getToken, setToken, removeToken, getTenant, setTenant } from '@/utils/auth'
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
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      abpApplicationConfiguration.getApplicationConfiguration().then(response => {
        const { auth } = response
        if (!auth) {
          reject('Verification failed, please Login again.')
        }

        // 认证数组不能为空
        if (!auth.grantedPolicies || auth.grantedPolicies.length <= 0) {
          reject('getInfo: auth must be a non-null array!')
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
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONS', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
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
