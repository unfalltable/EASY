/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 19:40:41
 */

/** 免登录白名单（匹配路由 path） */
const whiteListByPath = ["/login"]

/** 免登录白名单（匹配路由 name） */
const whiteListByName = []

/** 判断是否在白名单 */
const isWhiteList = (to) => {
  // path 和 name 任意一个匹配上即可
  return whiteListByPath.indexOf(to.path) !== -1 || whiteListByName.indexOf(to.name) !== -1
}

export default isWhiteList
