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

export const updateUserinfoAPI = ({
  id,
  username,
  nickname,
  email,
  user_pic,
}) => {
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
      user_pic,
    },
  });
};

export const updateUserAvatarAPI = (avatar) => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/update/avatar",
    method: "PATCH",
    data: {
      avatar,
    },
  });
};

export const updateUserPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: "/my/updatepwd",
    method: "PATCH",
    data: {
      old_pwd,
      new_pwd,
      re_pwd,
    },
  });
};

export const getCateListAPI = () => {
  // 获取文章分类API
  return request({
    url: "/my/cate/list",
    method: "GET",
  });
};

export const createCateListAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: "/my/cate/add",
    method: "POST",
    data: {
      cate_name,
      cate_alias,
    },
  });
};

export const getCateAPI = (id) => {
  return request({
    url: "/my/cate/info",
    params: {
      id,
    },
  });
};

export const changeCateAPI = ({ id, cate_name, cate_alias }) => {

  return request({
    url: "/my/cate/info",
    method: "PUT",
    data: {
      id,
      cate_name,
      cate_alias,
    },
  });
};

/**
 * 删除-文章分类
 * @param {*} id 要删除的-文章分类id
 * @returns Promise对象
 */
export const delArtCateAPI = (id) => {
  return request({
    url: "/my/cate/del",
    method: "DELETE",
    params: {
      id,
    },
  });
};

export const addArticleAPI = (fd) => {
  //如果是一个普通对象，axios会把它转成JSON字符串在请求里体里交给后台
  //这个接口文档要求请求体里是一个FormData类型(表单数据对象)携带文件给后台

  return request({
    url: "/my/article/add",
    method: "POST",
    data: fd
  });
};
