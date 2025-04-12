<!--
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-07-26 11:28:00
-->
<template>
  <div class="layout-logo-container" :class="{ collapse: props.collapse, 'layout-mode-top': isTop }">
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <img :src="!isLeft ? logo : logo" class="layout-logo-text" />
      </router-link>
    </transition>

    <div class="pro-name">Easi DAO</div>
  </div>
</template>

<script setup>
import { useLayoutMode } from "@/hooks/useLayoutMode"
import logo from "@/assets/layouts/logo.jpg?url"

const props = defineProps({
  collapse: Boolean
})

const { isLeft, isTop } = useLayoutMode()
</script>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  text-align: center;
  overflow: hidden;
  padding: 5px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;

    height: 55px;
    width: auto;
  }

  .pro-name {
    font-size: 20px;
    color: #333333;
    font-weight: 600;
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
