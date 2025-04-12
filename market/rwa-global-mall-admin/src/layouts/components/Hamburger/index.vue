<!--
 * @Author: Leo Cui
 * @Date: 2024-04-01 14:08:43
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-04-06 22:17:30
-->
<template>
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script setup>
import { Expand, Fold } from "@element-plus/icons-vue"

const props = defineProps({
  isActive: Boolean
})

const emit = defineEmits(["toggleClick"])

const toggleClick = () => {
  emit("toggleClick")
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  color: var(--v3-hamburger-text-color);
}
</style>
