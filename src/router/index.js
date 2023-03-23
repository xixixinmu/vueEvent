import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

Vue.use(VueRouter)

const whiteList = ['/login', '/register']

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/register',
    component: () => import('@/views/register')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    redirect: '/addDelivery',
    children: [
      {
        path: '/user-avatar',
        component: () => import('@/views/user-avatar')
      },
      {
        path: '/statistics',
        component: () => import('@/components/AdminHome/Statistics.vue')
      },
      {
        path: '/addDelivery',
        component: () => import('@/components/AdminHome/AddDelivery.vue')
      },
      {
        path: '/edit-express',
        component: () => import('@/components/edit-express/editExpress')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫：登录后更新vuex里的用户数据

// 全局前置路由守卫
// 知识点1:浏览器第一次打开项目页面,会触发一次全局前置路由守卫函数
// 知识点2:判断登陆与否:有token就证明登录了，无token未登录
// 知识点3:next()如果强制切换路由地址,会再次走路由守卫再次去匹配路由表（如果只写next("/login")不写白名单会导致循环）
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 如果有token, 证明已登录
    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
      // 调用actions里方法请求数据
      // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    }
    next() // 路由放行
  } else {
    // 如果无token
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
