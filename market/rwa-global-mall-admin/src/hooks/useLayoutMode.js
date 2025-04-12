/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 20:29:56
 */
import { computed } from "vue"
import { useSettingsStore } from "@/store/modules/settings"
import { LayoutModeEnum } from "@/constants/app-key"

const settingsStore = useSettingsStore()
const isLeft = computed(() => settingsStore.layoutMode === LayoutModeEnum.Left)
const isTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.Top)
const isLeftTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.LeftTop)

const setLayoutMode = (mode) => {
  settingsStore.layoutMode = mode
}

export function useLayoutMode() {
  return { isLeft, isTop, isLeftTop, setLayoutMode }
}
