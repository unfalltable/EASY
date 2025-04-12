/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-07-29 17:05:56
 */
import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { ElMessage } from "element-plus"
import { setRouteChange } from "@/hooks/useRouteListener"
import { useTitle } from "@/hooks/useTitle"
import { getToken } from "@/utils/cache/cookies"
import routeSettings from "@/config/route"
import isWhiteList from "@/config/white-list"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  // const userStore = useUserStoreHook()
  // const permissionStore = usePermissionStoreHook()

  const token = getToken()

  if (!token) {
    if (isWhiteList(to)) return next()
    return next("/login")
  }

  if (to.path === "/login") {
    return next({ path: "/" })
  }

  next()
})

router.afterEach((to) => {
  setTitle(to.meta.title)
  document.querySelector(".app-scrollbar")?.scrollTo(0, 0)
  NProgress.done()
})
