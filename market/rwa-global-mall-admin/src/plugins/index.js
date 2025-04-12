/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-06-07 19:57:28
 */
import { loadElementPlus } from "./element-plus"
import { loadElementPlusIcon } from "./element-plus-icon"

export function loadPlugins(app) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
}
