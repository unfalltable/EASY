/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-16 15:25:13
 */

import { request } from "@/utils/service"

// 获取订单列表
export function orderAdminList(data) {
  return request({
    url: "/api/order/adminList",
    method: "post",
    data
  })
}

// 更新订单状态
export function orderAdminUpdate(data) {
  return request({
    url: "/api/order/adminUpdate",
    method: "post",
    data
  })
}
