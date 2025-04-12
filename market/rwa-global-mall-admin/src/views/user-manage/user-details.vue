<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-07-29 16:52:24
-->

<template>
  <div class="user-details-main">
    <div class="content">
      <div class="title">用户详情</div>

      <div class="info-main">
        <div class="info-item">
          <div class="label">用户名：</div>
          <div class="value">Iron</div>
        </div>
        <div class="info-item">
          <div class="label">注册时间：</div>
          <div class="value">2024-06-07 20:08:33</div>
        </div>
        <div class="info-item">
          <div class="label">社媒地址：</div>
          <div class="value">12345678901</div>
        </div>
        <div class="cards">
          <div class="card-item">
            <div class="label">总订单量</div>
            <div class="value">45232</div>
          </div>
          <div class="card-item">
            <div class="label">退货单量</div>
            <div class="value">232</div>
          </div>
          <div class="card-item">
            <div class="label">总评论数</div>
            <div class="value">2132</div>
          </div>
        </div>

        <div class="title">购物记录</div>

        <div class="table-view">
          <el-table :data="tableData">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="name" label="商品名" />
            <el-table-column prop="Img" label="商品图" />
            <el-table-column prop="orderTime" label="购买时间" />
            <el-table-column prop="price" label="购买价" />
            <el-table-column prop="count" label="购买数量" />
            <el-table-column prop="specs" label="商品规格" />
            <el-table-column prop="merchantName" label="商家店铺" />
            <el-table-column prop="merchantUrl" label="商家地址" />
            <el-table-column fixed="right" label="操作" width="190">
              <template #default>
                <el-button type="primary" size="small"> 商品详情 </el-button>
                <el-button size="small">商家详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const tableData = [
  {
    name: "商品名",
    Img: "商品图",
    orderTime: "购买时间",
    price: "购买价",
    count: "购买数量",
    specs: "商品规格",
    merchantName: "商家店铺",
    merchantUrl: "商家地址"
  },
  {
    name: "商品名",
    Img: "商品图",
    orderTime: "购买时间",
    price: "购买价",
    count: "购买数量",
    specs: "商品规格",
    merchantName: "商家店铺",
    merchantUrl: "商家地址"
  },
  {
    name: "商品名",
    Img: "商品图",
    orderTime: "购买时间",
    price: "购买价",
    count: "购买数量",
    specs: "商品规格",
    merchantName: "商家店铺",
    merchantUrl: "商家地址"
  }
]
</script>

<style lang="scss" scoped>
.user-details-main {
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

    .info-main {
      .info-item {
        display: flex;
        margin-bottom: 15px;

        .label {
          width: 100px;
        }
        .value {
          flex: 1;
        }
      }

      .cards {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        margin-top: 30px;
        margin-bottom: 40px;

        .card-item {
          width: 200px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px #dcdfe6;
          text-align: center;

          .label {
            font-size: 16px;
            margin-bottom: 10px;
          }

          .value {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }

      .table-view {
      }
    }
  }
}
</style>
