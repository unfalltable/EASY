import { request } from "@/utils/service.js"

// 创建订单
export function createOrder(data) {
  return request({
    url: "/api/order/create",
    method: "post",
    data
  })
}

// 订单列表
export function orderList(params) {
  return request({
    url: "/api/order/list",
    method: "get",
    params
  })
}

// 订单总价
export function orderTotal(params) {
  return request({
    url: "/api/order/total",
    method: "get",
    params
  })
}

// 更新订单
export function updateOrderStatus(data) {
  return request({
    url: "/api/order/update",
    method: "post",
    data
  })
}
