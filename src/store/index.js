import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 编写变量
    token: '',
  },
  getters: {
  },
  mutations: {
    // 2. 保存 token 的 mutation 函数
    // 编写操作变量的函数
    updateToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
  },
  modules: {
  }
})
