import request from "@/utils/request";

export const registerAPI = () => {
  //原地是一个Promise对象(内部包含原生ajax请求)
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果

  return request({
    url: "/api/reg",
    method: "POST",
    data: {
      username: "",
      password: "",
      repassword: "",
    },
  });
};


