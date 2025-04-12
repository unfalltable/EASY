<template>
  <div class="select-lang" :class="{ selectLangMobile: isMobile }">
    <el-select @change="changeLang" v-model="langValue" placeholder="Select">
      <el-option class="lang-item" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup>
import { useDevice } from "@/hooks/useDevice"

import { setI18nLocale } from "@/utils/cache/local-storage"
import { useI18n } from "vue-i18n"
import { ref } from "vue"

const { locale } = useI18n()
const { isMobile } = useDevice()

const changeLang = (lang) => {
  locale.value = lang
  setI18nLocale(lang)
}

const langValue = ref(locale.value)

const options = [
  {
    value: "zh",
    label: "中文"
  },
  {
    value: "zh_hk",
    label: "繁体"
  },
  {
    value: "en",
    label: "English"
  }
]

function getLanguageFromRegion(regionCode) {
  switch (regionCode) {
    case "CN":
      return "zh"
    case "HK":
      return "zh_hk"

    default:
      return "en"
  }
}
</script>

<style lang="scss" scoped>
.select-lang {
  width: 120px;
  height: 35px;
  border-radius: 2px;
  margin-left: 30px;
  border: 1px solid #444444;

  :deep(.el-select__wrapper) {
    height: 100%;
    border: none;
    box-shadow: none;
    color: #333333;
  }
  :deep(.el-select__wrapper.is-focused) {
    box-shadow: 0 0 1px #333333;
  }

  :deep(.el-select__placeholder) {
    text-align: center;
    font-size: 18px;
    //vertical-align: super;
  }
}

.lang-item {
  font-size: 18px;
  color: #333333;
}

.selectLangMobile {
  margin-left: 20px;
  margin-top: 20px;
}

.mobile {
  .select-lang {
    :deep(.el-select__placeholder) {
      font-size: 16px;
    }
  }
}

@media (max-width: 1000px) {
  .lang-item {
    font-size: 16px;
  }
}
</style>
