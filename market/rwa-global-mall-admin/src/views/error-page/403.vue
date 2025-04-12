<!--
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 21:17:42
-->
<template>
  <ErrorPageLayout>
    <Svg403 />
  </ErrorPageLayout>
</template>

<script setup>
import ErrorPageLayout from "./components/ErrorPageLayout.vue"
import Svg403 from "@/assets/error-page/403.svg?component" // vite-svg-loader 插件的功能
</script>
