import axios from 'axios'
import store from '@/store'
// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址

import router from '@/router/index'
import { Message } from 'element-ui'

// export const baseURL = 'http://big-event-vue-api-t.itheima.net'
// 导出基地址方便图片获取拼接使用
export const baseURL = 'http://124.222.81.137:9090'

const myAxios = axios.create({
  baseURL,
  withCredentials: true
})

myAxios.interceptors.request.use(
  (config) => {
    // 被发出的请求都会前结果请求拦截器
    // 在请求拦截器前写同一添加请求头（token），不用一个个加
    store.state.isLoading = true
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
    // 请求发起前的代码，如果异常报错会进入这里
    // 返回一个拒绝状态的promise对象
  }
)

myAxios.interceptors.response.use(
  (response) => {
    store.state.isLoading = false
    // 响应状态码为 2或3开头 时触发成功的回调，形参中的 response 是“成功的结果”
    // return到axios原地Promise对象,作为成功的结果
    return response
  },
  (error) => {
    // 响应状态码为4xx，5xx时触发失败的回调，形参中的 error是失败的结果
    // return到axios原地Promise对象位置，作为失败拒绝的状态(如果那边用try+catch或者catch函数捕获，可以捕获到我们传递过去的这个error变量的值)
    if (error.response.status === 401) {
      // 本次响应是token过期了
      // 清除vuex里一切，然后切换回到登录页面（被动退出登录状态)
      store.commit('updateToken', '')
      store.commit('updateIsAdmin', '')
      store.commit('updateUser', '')
      router.push('/login')
      Message.error('身份信息已过期，请重新登录')
    } else {
      Message.error('请求失败')
    }
    return Promise.reject(error)
  }
)

// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
