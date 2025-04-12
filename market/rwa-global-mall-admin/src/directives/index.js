/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 20:23:19
 */
import { permission } from "./permission"

/** 挂载自定义指令 */
export function loadDirectives(app) {
  app.directive("permission", permission)
}
