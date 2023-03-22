import request from '@/utils/request'

export const registerAPI = ({ username, password, realName, phone, IDcard, storeName, isAdmin }) => {
  // 结构赋值传参，调用这个函数传参可以直接传整个对象

  // 原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果

  return request({
    url: '/api/register',
    method: 'POST',
    data: {
      username,
      password,
      realName,
      phone,
      IDcard,
      storeName
      // 为了语义明确 不然可以直接传obj
    }
  })
}

export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const statisticsAPI = (page, pageSize) => {
  return request({
    url: '/api/statistics',
    method: 'POST',
    data: {
      page,
      pageSize
    }
  })
}

export const addDelivery = ({ avatar, tags }, brief) => {
  console.log(avatar)
  console.log(tags)
  console.log(brief)
  return request({
    url: '/api/add',
    method: 'POST',
    data: {
      avatar,
      brief,
      tags
    }
  })
}

export const searchDelivery = ({ avatar, rn }) => {
  return request({
    url: '/api/search',
    method: 'POST',
    data: {
      avatar,
      rn
    }
  })
}

export const deleteDelivery = ({ avatar }) => {
  return request({
    url: '/api/delete',
    method: 'POST',
    data: {
      avatar
    }
  })
}

export const updateDelivery = ({ avatar, tags }, brief) => {
  return request({
    url: '/api/update',
    method: 'POST',
    data: {
      avatar,
      brief,
      tags
    }
  })
}

export const getUsersInfoAPI = () => {
  // 原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: '/my/userinfo',
    method: 'GET'
  })
}

export const updateUserinfoAPI = ({
  id,
  username,
  nickname,
  email,
  user_pic
}) => {
  // 原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}

export const updateUserAvatarAPI = (avatar) => {
  // 原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

export const updateUserPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  // 原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

export const getCateListAPI = () => {
  // 获取文章分类API
  return request({
    url: '/my/cate/list',
    method: 'GET'
  })
}

export const createCateListAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

export const getCateAPI = (id) => {
  return request({
    url: '/my/cate/info',
    params: {
      id
    }
  })
}

export const changeCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除-文章分类
 * @param {*} id 要删除的-文章分类id
 * @returns Promise对象
 */
export const delArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

export const addArticleAPI = (fd) => {
  // 如果是一个普通对象，axios会把它转成JSON字符串在请求里体里交给后台
  // 这个接口文档要求请求体里是一个FormData类型(表单数据对象)携带文件给后台

  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
  })
}

/**
 * 获取文章列表
 * @param {*} param0 { pagenum: 当前页码数, pagesize: 当前页条数, cate_id: 文章分类id, state: 文章状态 }
 * @returns Promise对象
 */
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 获取-文章详情
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const getArticleDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

export const deleteArticleAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'DELETE',
    params: {
      id
    }
  })
}

export const searchPictureAPI = (formData) => {
  // 如果是一个普通对象，axios会把它转成JSON字符串在请求里体里交给后台
  // 这个接口文档要求请求体里是一个FormData类型(表单数据对象)携带文件给后台
  return request({
    url: '/api/search',
    method: 'POST',
    data: formData
  })
}
