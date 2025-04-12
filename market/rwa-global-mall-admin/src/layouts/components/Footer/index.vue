<!--
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 20:39:01
-->

<template>
  <footer class="layout-footer">{{ VITE_APP_TITLE }}</footer>
</template>

<script setup>
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-placeholder);
}
</style>
