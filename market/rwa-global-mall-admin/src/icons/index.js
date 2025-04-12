/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 20:37:15
 */

import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component
import "virtual:svg-icons-register"

export function loadSvg(app) {
  app.component("SvgIcon", SvgIcon)
}
