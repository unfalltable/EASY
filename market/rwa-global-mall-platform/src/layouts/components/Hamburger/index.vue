<template>
  <div @click="toggleClick">
    <el-icon :size="28" class="icon">
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
  // color: var(--v3-hamburger-text-color);
  color: #666666;
}
</style>
