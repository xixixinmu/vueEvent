import request from "@/utils/request";

export const registerAPI = ({ username, password, repassword }) => {
  //结构赋值传参，调用这个函数传参可以直接传整个对象

  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果

  return request({
    url: "/api/reg",
    method: "POST",
    data: {
      username,
      password,
      repassword
      // 为了语义明确 不然可以直接传obj
    },
  });
};

export const loginAPI = ({ username, password }) => {
  //结构赋值传参，调用这个函数传参可以直接传整个对象

  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/api/login",
    method: "POST",
    data: {
      username,
      password,
    },
  });
};

export const getUsersInfoAPI = () => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/userinfo",
    method: "GET",
  });
};

export const getMenusAPI = () => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/menus",
    method: "GET",
  });
};


