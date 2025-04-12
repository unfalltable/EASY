
import dayjs from "dayjs"
import { removeConfigLayout } from "@/utils/cache/local-storage"

/** 格式化时间 */
export const formatDateTime = (time) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A"
}

/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (cssVariableName, cssVariableValue) => {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  } catch (error) {
    console.error(error)
  }
}

/** 重置项目配置 */
export const resetConfigLayout = () => {
  removeConfigLayout()
  location.reload()
}

/**
 *
 * @param n  获取最近 n 天的日期
 * @param format  日期格式 "YYYY-MM-DD" | "MM-DD"
 * @returns  返回日期数组
 */
export const getDaysList = (n, format) => {
  const days = []
  if (n <= 0) return days
  if (n === 1) return [dayjs().format(format)]
  for (let i = 0; i < n; i++) {
    days.push(dayjs().subtract(i, "day").format(format))
  }
  return days.reverse()
}
