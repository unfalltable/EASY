<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-07-29 16:58:59
-->

<template>
  <div class="user-manage-main">
    <div class="content">
      <div class="title">用户管理</div>

      <div class="query-view">
        <el-form :inline="true" :model="queryForm" class="form-inline">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.account" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="queryForm.registerDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-view">
        <el-table :data="tableData">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="account" label="用户名" />
          <el-table-column prop="registerDate" label="注册时间" />
          <el-table-column fixed="right" label="操作">
            <template #default>
              <el-button type="primary" size="small" @click="handleDetails"> 详情 </el-button>
              <el-button size="small" @click="handleUserStatus">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="温馨提示" width="500" align-center>
      <span>确定禁用吗</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const dialogVisible = ref(false)

const queryForm = reactive({
  account: "",
  registerDate: ""
})

const tableData = [
  {
    account: "Tom",
    registerDate: "2016-05-03 15:00:00"
  },
  {
    account: "Tom",
    registerDate: "2016-05-03 15:00:00"
  },
  {
    account: "Tom",
    registerDate: "2016-05-03 15:00:00"
  },
  {
    account: "Tom",
    registerDate: "2016-05-03 15:00:00"
  }
]

const handleDetails = () => {
  router.push("/user-manage/user-details")
}

const handleUserStatus = () => {
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-main {
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

    .query-view {
      margin-bottom: 20px;
    }
  }
}
</style>
