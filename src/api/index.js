import request from '@/utils/request'

export const registerAPI = ({ username, password, realName, phone, idCard, storeName }) => {
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
      idCard,
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

export const statisticsAPI = (page) => {
  return request({
    url: '/api/statistics',
    params: {
      page
    }
  })
}

export const addDelivery = (formData) => {
  return request({
    url: '/api/add',
    method: 'POST',
    data: formData
  })
}

export const searchDelivery = (formData) => {
  // 如果是一个普通对象，axios会把它转成JSON字符串在请求里体里交给后台
  // 这个接口文档要求请求体里是一个FormData类型(表单数据对象)携带文件给后台
  return request({
    url: '/api/search',
    method: 'POST',
    data: formData
  })
}

export const getAllDelivery = ({ page, picID }) => {
  // 如果是一个普通对象，axios会把它转成JSON字符串在请求里体里交给后台
  // 这个接口文档要求请求体里是一个FormData类型(表单数据对象)携带文件给后台
  return request({
    url: '/api/picInfo',
    params: {
      page,
      picID
    }
  })
}

export const deleteDelivery = (formData) => {
  return request({
    url: '/api/delete',
    method: 'POST',
    data: formData
  })
}

export const getDeliveryInfo = (cont_sign) => {
  return request({
    url: '/api/getUpdatePicInfo',
    method: 'GET',
    params: {
      cont_sign: cont_sign
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/userInfo',
    method: 'GET'
  })
}

export const updateDelivery = (formData) => {
  return request({
    url: '/api/update',
    method: 'POST',
    data: formData
  })
}

export const batchImportDelivery = (formData) => {
  return request({
    url: '/api/upload',
    method: 'POST',
    data: formData
  })
}

export const sendVerifiCode = (phone) => {
  return request({
    url: '/api/getBack',
    method: 'POST',
    data: phone
  })
}

export const receiveVerifiCode = (code) => {
  return request({
    url: '/api/validate',
    method: 'POST',
    data: code
  })
}

export const changePassword = (password) => {
  return request({
    url: '/api/chgPassword',
    method: 'POST',
    data: password
  })
}
