<template>
  <div class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="layout-header" :class="{ 'fixed-header': fixedHeader }">
      <div class="content">
        <Logo v-if="showLogo" :collapse="false" class="logo" />
        <NavigationBar class="navigation-bar" />
      </div>

      <TagsView v-show="showTagsView" />
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 页面主体内容 -->
      <AppMain class="app-main" :class="{ 'app-main-scroll': !fixedHeader }" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { AppMain, NavigationBar, TagsView, Logo } from "./components"

const settingsStore = useSettingsStore()
const { showTagsView, showLogo, fixedHeader } = storeToRefs(settingsStore)
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  .logo {
    // width: var(--v3-sidebar-width);
    // width: auto;
    // padding: 5px 15px;
  }
}

.layout-header {
  background-color: var(--v3-header-bg-color);
  // background-color: #1c2a77;
  box-shadow: var(--v3-header-box-shadow);
  // border-bottom: var(--v3-header-border-bottom);
  border: none;

  .content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    position: relative;

    .navigation-bar {
      // flex: 1;
    }
  }
}

.main-container {
  min-height: 100%;
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  // overflow: auto;
}

.hasTagsView {
  .app-main {
    padding-top: var(--v3-header-height);
  }
}

.app-main-scroll {
  padding-top: 0px;
  height: auto;
}

@media (max-width: 1320px) {
  .fixed-header .content {
    padding: 0 20px;
  }
}
@media (max-width: 1024px) {
}
@media (max-width: 820px) {
}
@media (max-width: 768px) {
}
@media (max-width: 576px) {
}
@media (max-width: 480px) {
}
@media (max-width: 380px) {
}
</style>
