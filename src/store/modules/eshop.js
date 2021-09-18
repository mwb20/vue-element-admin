import Cookies from 'js-cookie'

const ShopStoreIdKey = 'shop-store-id'

const state = {
  storeId: Cookies.get(ShopStoreIdKey)
}
const mutations = {
  SET_STOREID: (state, storeId) => {
    state.storeId = storeId
  }
}
const actions = {
  setStoreId({ commit }, storeId) {
    Cookies.set(ShopStoreIdKey, storeId)
    commit('SET_STOREID', storeId)
  },
  removeStoreId({ commit }) {
    commit('SET_STOREID', null)
    Cookies.remove(ShopStoreIdKey)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
