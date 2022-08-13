import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path:'/register',
    component:()=>import('@/views/register')
    // 路由懒加载方式
  },
  {
    path:'/login',
    component:()=>import('@/views/login')
  },
];

const router = new VueRouter({
  routes,
});

export default router;
