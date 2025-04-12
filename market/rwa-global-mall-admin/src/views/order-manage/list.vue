<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-16 15:55:35
-->

<template>
  <div class="product-manage-main">
    <div class="content">
      <div class="title">订单管理</div>

      <div class="query-view">
        <el-form :inline="true" :model="queryForm" class="form-inline">
          <el-form-item label="商品名">
            <el-input v-model="queryForm.productName" placeholder="请输入商品名" />
          </el-form-item>
          <el-form-item label="订单编号">
            <el-input v-model="queryForm.orderCode" placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-view">
        <el-tabs v-model="status" class="order-tabs" @tab-click="handleOrderClick">
          <el-tab-pane label="待付款" name="10"></el-tab-pane>
          <el-tab-pane label="待接单" name="20"></el-tab-pane>
          <el-tab-pane label="待发货" name="25"></el-tab-pane>
          <el-tab-pane label="待收货" name="30"></el-tab-pane>
          <el-tab-pane label="已完成" name="80"></el-tab-pane>
        </el-tabs>

        <el-table :data="tableData">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="order_code" label="订单号" width="280" />
          <el-table-column prop="total_price" label="订单总价($)" />
          <el-table-column prop="created_at" label="订单时间" width="250" />
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="{ row }">
              <template v-if="row.status == 10">
                <el-button type="primary" size="small" @click="handleOrderCancel()"> 取消 </el-button>
                <el-button type="primary" size="small" @click="handleProductDetails(row.order_code)">
                  订单详情
                </el-button>
              </template>
              <template v-if="row.status == 20">
                <el-button type="primary" size="small" @click="handleOrder(row.order_code, row.id)"> 接单 </el-button>
                <el-button type="primary" size="small" @click="handleProductDetails(row.order_code)">
                  订单详情
                </el-button>
              </template>
              <template v-if="row.status == 25">
                <el-button type="primary" size="small" @click="handleOrder(row.order_code, row.id)"> 发货 </el-button>
                <el-button type="primary" size="small" @click="handleProductDetails(row.order_code)">
                  订单详情
                </el-button>
              </template>
              <template v-if="row.status == 30 || row.status == 80">
                <el-button type="primary" size="small" @click="handleProductDetails(row.order_code)">
                  订单详情
                </el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import { orderAdminList, orderAdminUpdate } from "@/api/order/index"

const router = useRouter()

const queryForm = reactive({
  productName: "",
  orderCode: ""
})

const status = ref("10")

const tableData = ref([])

const getOrderList = () => {
  const params = {
    status: status.value
  }
  orderAdminList(params).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data
    }
  })
}
getOrderList()

const handleOrderClick = (value) => {
  status.value = value.props.name
  getOrderList()
}

const orderAdminUpdateEvent = (orderCode, orderId) => {
  const params = {
    orderId,
    orderCode
  }
  orderAdminUpdate(params).then((res) => {
    if (res.code === 200) {
      ElMessage.success("操作成功")

      getOrderList()
    }
  })
}

const handleOrderCancel = () => {}

const handleOrderDeliver = () => {}

const handleProductDetails = (orderCode) => {}

const handleOrder = (orderCode, orderId) => {
  orderAdminUpdateEvent(orderCode, orderId)
}
</script>

<style lang="scss" scoped>
.product-manage-main {
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

    .table-view {
      .order-tabs {
        margin-bottom: 20px;
      }
      .item-img {
        width: 80px;
        height: 80px;
        border-radius: 4px;
      }
    }
  }
}
</style>
