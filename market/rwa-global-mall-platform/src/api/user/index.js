import { request } from "@/utils/service.js"

// 登录
export function userLogin(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  })
}
