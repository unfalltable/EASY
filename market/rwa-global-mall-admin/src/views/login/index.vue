<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layouts/logo.jpg" />
      </div>
      <div class="pro-name">Easi DAO 管理后台</div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="userName">
            <el-input
              v-model.trim="loginFormData.userName"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { User, Lock } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import CryptoJS from "crypto-js"

import { setToken } from "@/utils/cache/cookies"
import { login } from "@/api/login"

const router = useRouter()

/** 登录表单元素的引用 */
const loginFormRef = ref(null)

/** 登录按钮 Loading */
const loading = ref(false)

/** 登录表单数据 */
const loginFormData = reactive({
  userName: "",
  password: ""
})

/** 登录表单校验规则 */
const loginFormRules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 50, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ]
}

/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid, fields) => {
    if (valid) {
      loading.value = true

      const params = {
        name: loginFormData.userName,
        password: CryptoJS.MD5(loginFormData.password).toString()
      }
      login(params)
        .then((res) => {
          if (res.code === 200) {
            setToken(res.data.token)
            router.push({ path: "/" })
          } else {
            ElMessage({
              message: res.message,
              type: "error"
            })
          }
        })
        .catch((err) => {
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.log("表单校验不通过", fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      padding: 20px;
      img {
        height: 100%;
      }
    }

    .pro-name {
      text-align: center;
      font-size: 20px;
      color: #333333;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .content {
      padding: 20px 50px 50px 50px;

      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
