<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-10 15:21:06
-->

<template>
  <div class="comment-manage-main">
    <div class="content">
      <div class="title">评论管理</div>

      <div class="query-view">
        <el-form :inline="true" :model="queryForm" class="form-inline">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.account" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="商品名">
            <el-input v-model="queryForm.productName" placeholder="请输入商品名" />
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="queryForm.orderCode" placeholder="请输入订单号" />
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
          <el-table-column prop="orderCode" label="订单号" />
          <el-table-column prop="productName" label="商品名" />
          <el-table-column prop="price" label="价格" />
          <el-table-column prop="comment" label="评论" />
          <el-table-column prop="orderTime" label="下单时间" width="170" />
          <el-table-column prop="commentTime" label="评论时间" width="170" />
          <el-table-column fixed="right" label="操作" width="190">
            <template #default>
              <el-button type="primary" size="small" @click="handleProductDetails"> 商品详情 </el-button>
              <el-button type="primary" size="small" @click="handleUserDetails"> 用户详情 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const queryForm = reactive({
  account: "",
  productName: "",
  orderCode: ""
})

const tableData = [
  {
    orderCode: "123456",
    productName: "商品",
    price: "100",
    comment: "质量太差了",
    orderTime: "2024-07-29 18:39:12",
    commentTime: "2024-07-29 18:39:12"
  },
  {
    orderCode: "123457",
    productName: "商品",
    price: "200",
    comment: "质量太差了",
    orderTime: "2024-07-29 18:39:12",
    commentTime: "2024-07-29 18:39:12"
  }
]

const handleProductDetails = () => {}

const handleUserDetails = () => {}
</script>

<style lang="scss" scoped>
.comment-manage-main {
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
