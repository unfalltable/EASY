

/** 统一处理 localStorage */

import CacheKey from "@/constants/cache-key"

// 系统布局配置
export const getConfigLayout = () => {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT)
  return json ? JSON.parse(json) : null
}
export const setConfigLayout = (settings) => {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings))
}
export const removeConfigLayout = () => {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT)
}

// 侧边栏状态
export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export const setSidebarStatus = (sidebarStatus) => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

// 正在应用的主题名称
export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME)
}
export const setActiveThemeName = (themeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}

// 标签栏
export const getVisitedViews = () => {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return JSON.parse(json ?? "[]")
}
export const setVisitedViews = (views) => {
  views.forEach((view) => {
    // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
    delete view.matched
    delete view.redirectedFrom
  })
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}
export const getCachedViews = () => {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return JSON.parse(json ?? "[]")
}
export const setCachedViews = (views) => {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}

// 国际化
export const getI18nLocale = () => {
  return localStorage.getItem(CacheKey.I18N_LOCALE)
}
export const setI18nLocale = (locale) => {
  localStorage.setItem(CacheKey.I18N_LOCALE, locale)
}
