<!--
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 21:17:49
-->
<template>
  <ErrorPageLayout>
    <Svg404 />
  </ErrorPageLayout>
</template>

<script setup>
import ErrorPageLayout from "./components/ErrorPageLayout.vue"
import Svg404 from "@/assets/error-page/404.svg?component" // vite-svg-loader 插件的功能
</script>
