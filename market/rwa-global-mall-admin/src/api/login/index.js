/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-11 16:42:15
 */

import { request } from "@/utils/service"

// ============================================================
/** 登录并返回 Token */
export function login(data) {
  return request({
    url: "/api/user/adminLogin",
    method: "post",
    data
  })
}
