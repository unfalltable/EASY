/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-06-12 12:09:48
 */

import { request } from "@/utils/service"

// 文件上传
export function uploadFiles(data) {
  return request({
    url: "/api/files/upload",
    method: "post",
    data
  })
}
