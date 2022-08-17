import axios from "axios";
import store from "@/store";
// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const myAxios = axios.create({
  baseURL: "http://big-event-vue-api-t.itheima.net",
});

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    // 被发出的请求都会前结果请求拦截器
    // 在请求拦截器前写同一添加请求头（token），不用一个个加
    if (store.state.token) {
      config.headers.Authorization = store.state.token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
    // 请求发起前的代码，如果异常报错会进入这里
    // 返回一个拒绝状态的promise对象
  }
);

// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios;
