import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// Vuex数据状态持久化
// 1.下载插件并导入

import { getUsersInfoAPI } from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 编写变量
    token: '',
    userInfo: {}
  },
  getters: {
    nickname (state) {
      return state.userInfo.nickname
      //  完整写法
    },
    // 简写
    username: (state) => state.userInfo.username,
    user_pic: (state) => state.userInfo.user_pic
  },
  mutations: {
    // 2. 保存 token 的 mutation 函数
    // 编写操作变量的函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    async initUserInfo (store) {
      const { data: res } = await getUsersInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {},
  plugins: [createPersistedState()]
  //  // 配置为 vuex 的插件
})

// vuex默认保存在内存中,所以刷新所有的值会回归初始化(无法做到持久存储)
// 因此要存到localStorage  自己写localStorage 需要一个个写, 因此使用vuex插件包叫做 vuex-persistedstate
