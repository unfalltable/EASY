/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-11 16:53:26
 */

import { request } from "@/utils/service"

// 新增产品
export function addProduct(data) {
  return request({
    url: "/api/product/add",
    method: "post",
    data
  })
}

// 新增产品
export function productList(params) {
  return request({
    url: "/api/product/list",
    method: "get",
    params
  })
}
