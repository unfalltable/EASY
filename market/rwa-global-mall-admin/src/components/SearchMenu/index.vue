<!--
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 19:23:05
-->
<template>
  <div>
    <el-tooltip effect="dark" content="搜索菜单" placement="bottom">
      <SvgIcon name="search" @click="handleOpen" />
    </el-tooltip>
    <SearchModal v-model="modalVisible" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import SearchModal from "./SearchModal.vue"

/** 控制 modal 显隐 */
const modalVisible = ref(false)
/** 打开 modal */
const handleOpen = () => {
  modalVisible.value = true
}
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
