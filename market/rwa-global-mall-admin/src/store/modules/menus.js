/*
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-07-26 11:45:55
 */
import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"

export const useMenusStore = defineStore("menus", () => {
  const rootMenu = ref(localStorage.getItem("rootMenu") || "platformRoutes")

  const setRootMenu = (menu) => {
    rootMenu.value = menu
    localStorage.setItem("rootMenu", menu)
  }

  return { rootMenu, setRootMenu }
})
