import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    // 路由懒加载方式
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/layout",
    component: () => import("@/views/layout"),
    // 路由懒加载方式
  },
];

const router = new VueRouter({
  routes,
});

// 全局前置路由守卫：登录后更新vuex里的用户数据
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
    // 调用actions里方法请求数据
    store.dispatch('initUserInfo')
    // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
  }

  next() // 路由放行
})

export default router;
