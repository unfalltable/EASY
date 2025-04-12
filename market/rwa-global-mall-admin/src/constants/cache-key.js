/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-09-24 09:35:23
 */

const SYSTEM_NAME = "rwa-mall-admin"

/** 缓存数据时用到的 Key */
const CacheKey = Object.freeze({
  TOKEN: `${SYSTEM_NAME}-token-key`,
  CONFIG_LAYOUT: `${SYSTEM_NAME}-config-layout-key`,
  SIDEBAR_STATUS: `${SYSTEM_NAME}-sidebar-status-key`,
  ACTIVE_THEME_NAME: `${SYSTEM_NAME}-active-theme-name-key`,
  VISITED_VIEWS: `${SYSTEM_NAME}-visited-views-key`,
  CACHED_VIEWS: `${SYSTEM_NAME}-cached-views-key`
})

export default CacheKey
