/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-06-09 22:05:03
 */
import { getConfigLayout } from "@/utils/cache/local-storage"
import { LayoutModeEnum } from "@/constants/app-key"

/**
 * @typedef {Object} LayoutSettings
 * @property {boolean} showSettings - 是否显示 Settings Panel
 * @property {string} layoutMode - 布局模式
 * @property {boolean} showTagsView - 是否显示标签栏
 * @property {boolean} showLogo - 是否显示 Logo
 * @property {boolean} fixedHeader - 是否固定 Header
 * @property {boolean} showFooter - 是否显示页脚 Footer
 * @property {boolean} showNotify - 是否显示消息通知
 * @property {boolean} showThemeSwitch - 是否显示切换主题按钮
 * @property {boolean} showScreenfull - 是否显示全屏按钮
 * @property {boolean} showSearchMenu - 是否显示搜索按钮
 * @property {boolean} cacheTagsView - 是否缓存标签栏
 * @property {boolean} showWatermark - 开启系统水印
 * @property {boolean} showGreyMode - 是否显示灰色模式
 * @property {boolean} showColorWeakness - 是否显示色弱模式
 */

/** 默认配置 */
const defaultSettings = {
  layoutMode: LayoutModeEnum.LeftTop,
  showSettings: false,
  showTagsView: false,
  fixedHeader: true,
  showFooter: false,
  showLogo: true,
  showNotify: false,
  showThemeSwitch: false,
  showScreenfull: true,
  showSearchMenu: false,
  cacheTagsView: false,
  showWatermark: false,
  showGreyMode: false,
  showColorWeakness: false
}

/** 项目配置 */
export const layoutSettings = { ...defaultSettings, ...getConfigLayout() }
