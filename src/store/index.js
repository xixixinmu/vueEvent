import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// Vuex数据状态持久化
// 1.下载插件并导入

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
  },
  plugins: [createPersistedState()]
  //  // 配置为 vuex 的插件
})

//vuex默认保存在内存中,所以刷新所有的值会回归初始化(无法做到持久存储)
// 因此要存到localStorage  自己写localStorage 需要一个个写, 因此使用vuex插件包叫做 vuex-persistedstate
