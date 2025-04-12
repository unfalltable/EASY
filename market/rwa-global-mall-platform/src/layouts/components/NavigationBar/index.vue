<template>
  <div class="navigation-bar" :class="{ navigationBarMobile: isMobile }">
    <!-- 小屏菜单展开按钮 -->
    <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />

    <Logo v-if="isMobile" :isMobile="isMobile" />

    <div class="header-main">
      <div class="ct-center">
        <div class="search-view">
          <el-input
            class="search-input"
            v-model="searchValue"
            size="large"
            style="width: 440px"
            placeholder="Search products, brands and categories"
          >
            <template #prefix>
              <el-icon class="input-icon"><search /></el-icon>
            </template>
          </el-input>
          <el-button size="large" class="search-btn">Search</el-button>
        </div>

        <div class="select-handle-view">
          <div class="sign-in">
            <el-dropdown v-if="isLogin">
              <div class="dropdown-view">
                Account
                <el-icon>
                  <arrow-down />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu class="el-dropdown-menu">
                  <el-dropdown-item class="custom-dropdown-item" @click="gotoMyAccount">My Account</el-dropdown-item>
                  <el-dropdown-item class="custom-dropdown-item" @click="gotoMyOrder">Orders</el-dropdown-item>
                  <el-dropdown-item class="custom-dropdown-item">
                    <el-button class="search-btn" @click="signOut">Sign out</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <div class="un-sign-in" v-if="!isLogin" @click="loginMyAccount">SIGN IN</div>
          </div>

          <el-dropdown>
            <div class="dropdown-view">
              Help
              <el-icon>
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu class="el-dropdown-menu">
                <el-dropdown-item class="custom-dropdown-item">Help Center</el-dropdown-item>
                <el-dropdown-item class="custom-dropdown-item">Place an order</el-dropdown-item>
                <el-dropdown-item class="custom-dropdown-item">Payment options</el-dropdown-item>
                <el-dropdown-item class="custom-dropdown-item">Track an order</el-dropdown-item>
                <el-dropdown-item class="custom-dropdown-item">Cancel an order</el-dropdown-item>
                <el-dropdown-item class="custom-dropdown-item">Returns&Refunds</el-dropdown-item>
                <el-dropdown-item class="custom-dropdown-item">LIVE CHAT</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="cart-box" @click="gotoMyCart">
        <el-icon size="24px"><ShoppingCart /></el-icon>
        <span>Cart</span>

        <div class="cart-num" v-if="productStore.myCartNum">{{ productStore.myCartNum }}</div>
      </div>
    </div>

    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="isTop && !isMobile" class="sidebar" />
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <ScreenFull v-if="showScreenFull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
    </div>

    <!-- <SelectLang v-if="!isMobile"></SelectLang> -->

    <el-dialog
      v-model="loginDialogVisible"
      width="600"
      center
      align-center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <template #header>
        <div class="logo-el-dialog-header">
          <div class="dialog-title">Login</div>
          <div class="dialog-icon" @click="loginDialogVisible = false">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </template>
      <div class="login-form" v-loading="loginLoading">
        <div class="login-title">Login mode</div>
        <div class="login-list">
          <MetaMaskConnector
            ref="loginMetaMaskRef"
            class="login-item"
            :class="{ 'login-item-act': loginModeAct == 'metaMask' }"
            @click="selectLoginMode('metaMask')"
            @connected="loadingCancel"
          />
        </div>
      </div>
      <!-- <template #footer>
        <div class="login-dialog-footer">
          <el-button size="large" class="btn-l" @click="loginCancel">Cancel</el-button>
          <el-button size="large" class="btn-r" color="#f68b1e" @click="loginConfirm"> Confirm </el-button>
        </div>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { useProductStore } from "@/store/modules/product"

import Hamburger from "../Hamburger/index.vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Sidebar from "../Sidebar/index.vue"
import Notify from "@/components/Notify/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import ScreenFull from "@/components/ScreenFull/index.vue"
import SearchMenu from "@/components/SearchMenu/index.vue"
import { useDevice } from "@/hooks/useDevice"
import { useLayoutMode } from "@/hooks/useLayoutMode"

import { getToken, removeToken, setToken } from "@/utils/cache/cookies"

import Logo from "../Logo/index.vue"

import SelectLang from "../select-lang/index.vue"
import cart from "@/assets/home/cart.png"
import { ref, watch } from "vue"

import MetaMaskConnector from "@/views/web3-components/MetaMaskConnector.vue"

const { isMobile } = useDevice()
const { isTop } = useLayoutMode()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const productStore = useProductStore()
const settingsStore = useSettingsStore()

const { showNotify, showThemeSwitch, showScreenFull, showSearchMenu } = storeToRefs(settingsStore)

const searchValue = ref("")

// 这里是创建了新的响应式对象，所以需要 watch 监听
// 还可以使用 storeToRefs 将 store 中的数据转换为响应式对象 同上
// 或者 直接使用 store 中的数据
const isLogin = ref(userStore.isLoginFlag)

const loginDialogVisible = ref(false)
const loginModeAct = ref("")
const loginMetaMaskRef = ref(null)
const loginLoading = ref(false)

// const { myCartNum } = storeToRefs(productStore)

watch(
  () => userStore.isLoginFlag,
  (newVal) => {
    isLogin.value = newVal
  }
)

const selectLoginMode = (mode) => {
  loginModeAct.value = mode
  loginLoading.value = true

  if (loginModeAct.value === "metaMask") {
    loginMetaMaskRef.value.connectMetaMask()
  }
}

const loadingCancel = () => {
  loginLoading.value = false

  loginDialogVisible.value = false
}

const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}

const loginMyAccount = () => {
  loginDialogVisible.value = true
}

const loginCancel = () => {
  loginDialogVisible.value = false
}

const loginConfirm = () => {
  if (loginModeAct.value === "metaMask") {
    loginMetaMaskRef.value.connectMetaMask()
  }
}

const gotoMyAccount = () => {
  router.push({ path: "/my/my-account" })
}

const gotoMyOrder = () => {
  router.push({ path: "/my/my-order" })
}

const gotoMyCart = () => {
  router.push({ path: "/my/my-cart" })
}

const signOut = () => {
  userStore.logout()
}
</script>

<style lang="scss" scoped>
:deep(.custom-dropdown-item) {
  &:hover {
    background: #f68b1e;
    color: #ffffff;
  }
}

.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  color: var(--v3-navigationbar-text-color);
  display: flex;
  justify-content: center;
  align-items: center;

  .lang-box {
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 15px;

    p {
      cursor: pointer;
      color: #666666;

      &:hover {
        font-weight: bold;
      }
    }
  }

  .hamburger {
    display: flex;
    align-items: center;
    height: 60%;
    cursor: pointer;
    position: absolute;
    right: 5%;
  }

  .breadcrumb {
    flex: 1;

    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;

    :deep(.el-menu) {
      background-color: transparent;
    }

    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-color-primary) !important;
        }
      }
    }
  }

  .right-menu {
    // 暂时没有右侧菜单 先注释了又边距
    // margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;

      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }

  .logo-el-dialog-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    position: relative;

    .dialog-title {
      font-size: 24px;
      font-weight: 600;
    }

    .dialog-icon {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 20;
      cursor: pointer;
      font-size: 24px;
      color: #333333;

      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        color: #f68b1e;
      }
    }
  }
  .login-form {
    height: 350px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    .login-title {
      font-size: 24px;
      font-weight: 600;
    }

    .login-list {
      display: flex;
      gap: 20px;

      .login-item {
        display: flex;
        width: 100%;
        gap: 25px;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;

        &:hover {
          background: #ffead4;
        }
      }

      .login-item-act {
        background: #ffead4;
      }
    }

    :deep(.el-loading-mask) {
      background: rgba(#ffffff, 0.5);

      .el-loading-spinner .path {
        stroke: #f68b1e;
      }
    }
  }
  .login-dialog-footer {
    .btn-l {
      &:hover {
        color: #666666;
        background: #efefef;
        border-color: #dcdfe6;
      }
    }
    .btn-r {
      color: #ffffff;
    }
  }
}

.navigationBarMobile {
  padding: 0 15px;

  .lang-box div {
    // color: #666666;
  }
}

.header-main {
  display: flex;
  align-items: center;
}

.header-main,
.ct-center {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-view {
  display: flex;
  gap: 5px;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #666666 inset;
    font-size: 16px;
  }

  :deep(.is-focus) {
    box-shadow: 0 0 0 1px #f68b1e inset;
  }

  .input-icon {
    font-size: 18px;
    color: #333333;
  }
}

.select-handle-view {
  display: flex;
  align-items: center;
  gap: 15px;

  .dropdown-view {
    display: flex;
    gap: 5px;
    cursor: pointer;

    &:hover {
      color: #f68b1e;
    }
  }

  :deep(.el-dropdown) {
    font-size: 16px;
    font-weight: 600;
  }

  .sign-in {
    display: flex;

    .un-sign-in {
      padding: 5px 10px;
      cursor: pointer;
      color: #f68b1e;
      font-size: 16px;
      font-weight: 600;
    }
  }
}

.search-btn {
  color: #ffffff;
  background: #f68b1e;
  border: none;
  font-size: 16px;
  font-weight: 600;
}
.cart-box {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  position: relative;

  span {
    margin-left: 3px;
  }

  &:hover {
    color: #f68b1e;
  }

  .cart-num {
    position: absolute;
    top: -10px;
    left: 10px;
    background: #f68b1e;
    color: #ffffff;
    border-radius: 50%;
    padding: 2px 7px;
    font-size: 12px;
  }
}

.my-card-content {
  height: 400px;

  .my-card-main {
  }
}
</style>
