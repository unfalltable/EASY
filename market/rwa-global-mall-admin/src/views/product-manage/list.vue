<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-11 16:58:16
-->

<template>
  <div class="product-manage-main">
    <div class="content">
      <div class="title">商品管理</div>

      <div class="query-view">
        <el-form :inline="true" :model="queryForm" class="form-inline">
          <el-form-item label="商品名">
            <el-input v-model="queryForm.productName" placeholder="请输入商品名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
            <el-button type="primary" @click="addProduct">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-view">
        <el-table :data="tableData">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="name" label="商品名" width="150" />
          <el-table-column prop="image_url" label="商品图">
            <template #default="{ row }">
              <img class="item-img" :src="row.image_url" alt="商品图" />
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格($)" />
          <el-table-column prop="stock" label="库存" />
          <el-table-column prop="is_active" label="状态">
            <template #default="{ row }">
              <el-tag v-if="row.is_active" type="success">在售</el-tag>
              <el-tag v-else type="danger">下架</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="上架时间" width="170" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button type="primary" size="small" @click="handleProductDetails"> 商品详情 </el-button>
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

import { productList } from "@/api/product/index"

const router = useRouter()

const queryForm = reactive({
  productName: ""
})

const tableData = ref([])

const getProductList = () => {
  productList().then((res) => {
    if (res.code === 200) {
      tableData.value = res.data
    }
  })
}
getProductList()

const addProduct = () => {
  router.push("/product-manage/add")
}

const handleProductDetails = () => {}
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
      .item-img {
        width: 80px;
        height: 80px;
        border-radius: 4px;
      }
    }
  }
}
</style>
