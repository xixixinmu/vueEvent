import store from "@/store";
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
      repassword,
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

export const updateUserinfoAPI = ({id,username,nickname,email,user_pic}) => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/userinfo",
    method: "PUT",
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    },
  });
};

export const updateUserAvatarAPI = (avatar) => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/update/avatar",
    method: "PATCH",
    data:{
      avatar
    }
  });
};

export const updateUserPwdAPI = ({old_pwd,new_pwd,re_pwd}) => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/updatepwd",
    method: "PATCH",
    data:{
      old_pwd,
      new_pwd,
      re_pwd
    }
  });
};


export const getCateListAPI = () => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/cate/list",
    method: "GET",
  });
};

export const createCateListAPI = (cate_name,cate_alias) => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/cate/add",
    method: "POST",
    body:{
      cate_name,
      cate_alias
    }
  });
};