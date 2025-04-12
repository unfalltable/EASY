<template>
  <div class="layout-logo-container" :class="{ collapse: props.collapse, 'layout-mode-top': isTop }">
    <transition name="layout-logo-fade">
      <router-link class="logo-link-collapse" v-if="props.collapse" key="collapse" to="/">
        <!-- 折叠时 -->
        <img :src="logoUrl" class="layout-logo" />

        <h2 class="title">Easi DAO</h2>
      </router-link>
      <router-link class="logo-link" :class="{ logoIsMobile: props.isMobile }" v-else key="expand" to="/">
        <!-- 反之 -->
        <img :src="!isLeft ? logoUrl : logoUrl" class="layout-logo-view" />

        <h2 class="title">Easi DAO</h2>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useLayoutMode } from "@/hooks/useLayoutMode"

import logoUrl from "@/assets/layouts/logo.jpg"

const props = defineProps({
  collapse: Boolean, // 是否折叠
  isMobile: Boolean // 是否移动端
})

const { isLeft, isTop } = useLayoutMode()
</script>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  // height: var(--v3-header-height);
  // line-height: var(--v3-header-height);
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-view {
    vertical-align: middle;
    height: 80px;
  }
}

.layout-mode-top {
  // height: var(--v3-navigationbar-height);
  // line-height: var(--v3-navigationbar-height);

  display: flex;
  align-items: center;
  justify-content: flex-start;

  .logo-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;

    .layout-logo-view {
      width: 55px;
      height: auto;
    }

    .title {
      font-weight: 600;
      font-size: 28px;

      white-space: nowrap;
    }
  }

  .logoIsMobile {
    flex-direction: column;
    margin-left: 20px;
    gap: 2px;

    .layout-logo-view {
      width: 40px;
      height: auto;
    }

    .name {
      font-size: 12px;
      font-weight: bold;
      height: 14px;
      line-height: 14px;
    }

    .desc {
      font-size: 8px;
      height: 12px;
      line-height: 12px;
    }
  }
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-view {
    display: none;
  }
}
</style>
