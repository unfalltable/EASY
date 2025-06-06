/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 21:07:38
 */
import { ref, watchEffect } from "vue"
import { defineStore } from "pinia"
import { useSettingsStore } from "./settings"
import { getVisitedViews, setVisitedViews, getCachedViews, setCachedViews } from "@/utils/cache/local-storage"

export const useTagsViewStore = defineStore("tags-view", () => {
  const { cacheTagsView } = useSettingsStore()
  const visitedViews = ref(cacheTagsView ? getVisitedViews() : [])
  const cachedViews = ref(cacheTagsView ? getCachedViews() : [])

  /** 缓存标签栏数据 */
  watchEffect(() => {
    setVisitedViews(visitedViews.value)
    setCachedViews(cachedViews.value)
  })

  //#region add
  const addVisitedView = (view) => {
    // 检查是否已经存在相同的 visitedView
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) {
      // 防止 query 参数丢失
      visitedViews.value[index].fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
    } else {
      // 添加新的 visitedView
      visitedViews.value.push({ ...view })
    }
  }

  const addCachedView = (view) => {
    if (typeof view.name !== "string") return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) cachedViews.value.push(view.name)
  }
  //#endregion

  //#region del
  const delVisitedView = (view) => {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index !== -1) visitedViews.value.splice(index, 1)
  }

  const delCachedView = (view) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) cachedViews.value.splice(index, 1)
  }
  //#endregion

  //#region delOthers
  const delOthersVisitedViews = (view) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }

  const delOthersCachedViews = (view) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果 index = -1, 没有缓存的 tags
      cachedViews.value = []
    }
  }
  //#endregion

  //#region delAll
  const delAllVisitedViews = () => {
    // 保留固定的 tags
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta?.affix)
  }

  const delAllCachedViews = () => {
    cachedViews.value = []
  }
  //#endregion

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews
  }
})
