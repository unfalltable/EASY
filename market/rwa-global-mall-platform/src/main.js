// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"

// css

import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"

// tailwind
import "./tailwind.css"

// i18n
import { i18n } from "./i18n/index.js"

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router).use(i18n)
router.isReady().then(() => {
  app.mount("#app")
})
