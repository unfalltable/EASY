import { createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 *
 * 设置该路由在侧边栏和面包屑中展示的名字
 * title?: string
 *
 * 设置该路由的图标，记得将 svg 导入 @/icons/svg
 * svgIcon?: string
 *
 * 设置该路由的图标，直接使用 Element Plus 的 Icon（与 svgIcon 同时设置时，svgIcon 将优先生效）
 * elIcon?: string
 * 
 * 默认 false，设置 true 的时候该路由不会在侧边栏出现
 * hidden?: boolean
 * 
 * 设置能进入该路由的角色，支持多个角色叠加
 *roles?: string[]

 * 默认 true，如果设置为 false，则不会在面包屑中显示
 * breadcrumb?: boolean
 * 
 * 默认 false，如果设置为 true，它则会固定在 tags-view 中
 * affix?: boolean
 * 
 * 当一个路由下面的 children 声明的路由大于 1 个时，自动会变成嵌套的模式，
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏，
 * 若想不管路由下面的 children 声明的个数都显示你的根路由，
 * 
 * 可以设置 alwaysShow: true，这样就会忽略之前定义的规则，一直显示根路由
 * alwaysShow?: boolean
 * 示例: activeMenu: "/xxx/xxx"，
 * 当设置了该属性进入路由时，则会高亮 activeMenu 属性对应的侧边栏。
 * 该属性适合使用在有 hidden: true 属性的路由上
 * activeMenu?: string
 * 
 * 是否缓存该路由页面
 * 默认为 false，为 true 时代表需要缓存，此时该路由和该页面都需要设置一致的 Name
 * keepAlive?: boolean
 */

export const constantRoutes = [
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layouts,
    // redirect: "/dashboard",
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "控制台",
          svgIcon: "dashboard"
        }
      }
    ]
  }
]

export const platformRoutes = [
  {
    path: "/info-manage",
    component: Layouts,
    meta: {},
    children: [
      {
        path: "",
        component: () => import("@/views/info-manage/index.vue"),
        meta: {
          title: "平台管理",
          svgIcon: "info-manage"
        }
      }
    ]
  },
  {
    path: "/product-manage",
    component: Layouts,
    meta: {},
    children: [
      {
        path: "",
        component: () => import("@/views/product-manage/list.vue"),
        meta: {
          title: "商品管理",
          svgIcon: "product-manage"
        }
      },
      {
        path: "add",
        component: () => import("@/views/product-manage/add.vue"),
        meta: {
          title: "添加商品",
          hidden: true,
          activeMenu: "/product-manage"
        }
      }
    ]
  },
  {
    path: "/order-manage",
    component: Layouts,
    meta: {},
    children: [
      {
        path: "",
        component: () => import("@/views/order-manage/list.vue"),
        meta: {
          title: "订单管理",
          svgIcon: "comment-manage"
        }
      }
    ]
  },
  {
    path: "/comment-manage",
    component: Layouts,
    meta: {},
    children: [
      {
        path: "",
        component: () => import("@/views/comment-manage/list.vue"),
        meta: {
          title: "评论管理",
          svgIcon: "comment-manage"
        }
      }
    ]
  },
  {
    path: "/user-manage",
    component: Layouts,
    meta: {},
    children: [
      {
        path: "",
        component: () => import("@/views/user-manage/list.vue"),
        meta: {
          title: "用户管理",
          svgIcon: "user-manage"
        }
      },
      {
        path: "user-details",
        name: "UserDetails",
        component: () => import("@/views/user-manage/user-details.vue"),
        meta: {
          title: "用户详情",
          hidden: true,
          activeMenu: "/user-manage"
        }
      }
    ]
  }
]

export const merchantRoutes = [
  {
    path: "/merchant-manage",
    component: Layouts,
    meta: {},
    children: [
      {
        path: "",
        component: () => import("@/views/merchant-manage/index.vue"),
        meta: {
          title: "商户管理",
          svgIcon: "comment-manage"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes = []

const router = createRouter({
  history,
  routes: [...constantRoutes, ...platformRoutes, ...merchantRoutes]
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
