<template>
  <!-- 外层 div 不能删除，是用来接收父组件 click 事件的 -->
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      :ref="`resultItemRef${index}`"
      class="result-item"
      :style="itemStyle(item)"
      @mouseenter="handleMouseenter(item)"
    >
      <SvgIcon v-if="item.meta?.svgIcon" :name="item.meta.svgIcon" />
      <component v-else-if="item.meta?.elIcon" :is="item.meta.elIcon" class="el-icon" />
      <span class="result-item-title">
        {{ item.meta?.title }}
      </span>
      <SvgIcon v-if="modelValue && modelValue === item.name" name="keyboard-enter" />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue"

/** 选中的菜单 */
const modelValue = defineModel({ required: true })
const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  isPressUpOrDown: {
    type: Boolean,
    required: true
  }
})

const instance = getCurrentInstance()
const scrollbarHeight = ref(0)

/** 菜单的样式 */
const itemStyle = (item) => {
  const flag = item.name === modelValue.value
  return {
    background: flag ? "var(--el-color-primary)" : "",
    color: flag ? "#ffffff" : ""
  }
}

/** 鼠标移入 */
const handleMouseenter = (item) => {
  // 如果上键或下键与 mouseenter 事件同时生效，则以上下键为准，不执行该函数的赋值逻辑
  if (props.isPressUpOrDown) return
  modelValue.value = item.name
}

/** 计算滚动可视区高度 */
const getScrollbarHeight = () => {
  // el-scrollbar max-height="40vh"
  scrollbarHeight.value = Number((window.innerHeight * 0.4).toFixed(1))
}

/** 根据下标计算到顶部的距离 */
const getScrollTop = (index) => {
  const currentInstance = instance?.proxy?.$refs[`resultItemRef${index}`]
  if (!currentInstance) return 0
  const currentRef = currentInstance[0]
  const scrollTop = currentRef.offsetTop + 128 // 128 = 两个 result-item （56 + 56 = 112）高度与上下 margin（8 + 8 = 16）大小之和
  return scrollTop > scrollbarHeight.value ? scrollTop - scrollbarHeight.value : 0
}

/** 在组件挂载前添加窗口大小变化事件监听器 */
onBeforeMount(() => {
  window.addEventListener("resize", getScrollbarHeight)
})

/** 在组件挂载时立即计算滚动可视区高度 */
onMounted(() => {
  getScrollbarHeight()
})

/** 在组件卸载前移除窗口大小变化事件监听器 */
onBeforeUnmount(() => {
  window.removeEventListener("resize", getScrollbarHeight)
})

defineExpose({ getScrollTop })
</script>

<style lang="scss" scoped>
.result-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 15px;
  margin-top: 8px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  .svg-icon {
    min-width: 1em;
    font-size: 18px;
  }
  .el-icon {
    width: 1em;
    font-size: 18px;
  }
  &-title {
    flex: 1;
    margin-left: 12px;
  }
}
</style>
