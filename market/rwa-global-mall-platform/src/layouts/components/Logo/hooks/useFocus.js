/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 21:18:14
 */
import { ref } from "vue"

export function useFocus() {
  /** 是否有焦点 */
  const isFocus = ref(false)

  /** 失去焦点 */
  const handleBlur = () => {
    isFocus.value = false
  }
  /** 获取焦点 */
  const handleFocus = () => {
    isFocus.value = true
  }

  return { isFocus, handleBlur, handleFocus }
}
