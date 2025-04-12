<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-07-29 16:14:41
-->

<template>
  <div class="info-manage-main">
    <div class="content">
      <div class="title">信息管理</div>
      <div class="base-info">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="my-ruleForm" status-icon>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="输入联系电话" />
          </el-form-item>
          <el-form-item label="工作时间" prop="workingHours">
            <el-input v-model="ruleForm.workingHours" placeholder="输入工作时间" />
          </el-form-item>
          <el-form-item label="服务邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="输入服务邮箱" />
          </el-form-item>
          <el-form-item
            :label="index === 0 ? '社媒地址' : ' '"
            v-for="(media, index) in ruleForm.medias"
            :key="media.key"
            :prop="'medias.' + index + '.value'"
            :rules="{
              required: true,
              message: '地址不能为空',
              trigger: 'blur'
            }"
          >
            <div class="media-item">
              <el-input style="width: 200px" v-model="media.name" placeholder="社媒名称" />
              <el-input v-model="media.value" placeholder="输入社媒地址" />
              <el-button class="remove-media" @click.prevent="removeMedia(media)"> 删除 </el-button>
            </div>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click.prevent="addMedia"> 添加 </el-button>
          </el-form-item>
          <el-form-item label=" ">
            <div class="btn-list">
              <el-button type="primary" @click="submitForm()"> 保存 </el-button>
              <el-button @click="resetForm()">重置</el-button>
              <el-button @click="back()">返回</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const ruleFormRef = ref(null)
const ruleForm = reactive({
  phone: "",
  workingHours: "",
  email: "",
  medias: [
    {
      key: Date.now(),
      name: "",
      value: ""
    }
  ]
})

const removeMedia = (item) => {
  const index = ruleForm.medias.indexOf(item)
  if (index !== -1) {
    ruleForm.medias.splice(index, 1)
  }
}

const addMedia = () => {
  ruleForm.medias.push({
    key: Date.now(),
    value: ""
  })
}

const rules = reactive({
  phone: [
    { required: true, message: "请输入联系电话", trigger: "blur" },
    { min: 1, max: 50, message: "长度1-50", trigger: "blur" }
  ],
  workingHours: [
    { required: true, message: "请输入工作时间", trigger: "blur" },
    { min: 1, max: 100, message: "长度1-100", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入服务邮箱", trigger: "blur" },
    { min: 1, max: 50, message: "长度1-50", trigger: "blur" }
  ],
  medias: [
    {
      required: true,
      message: "请输入社媒地址",
      trigger: "blur"
    }
  ]
})

const submitForm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}

const resetForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.info-manage-main {
  .content {
    .title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 30px;

      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 24px;
        background-color: #333333;
        margin-right: 10px;
        position: relative;
        top: 4px;
      }
    }
    .base-info {
      .my-ruleForm {
        width: 600px;
      }
    }

    .my-ruleForm {
      .media-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;

        .el-button {
          margin: 0;
        }
      }

      .btn-list {
        margin-top: 20px;
      }
    }
  }
}
</style>
