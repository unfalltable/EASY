<!--
 * @Author: Leo Cui
 * @Date: 2024-06-07 20:08:33
 * @LastEditors: Leo Cui
 * @LastEditTime: 2024-10-11 16:30:47
-->

<template>
  <div class="product-manage-add-main">
    <div class="content">
      <div class="title">新增商品</div>

      <div class="product-add-view">
        <div class="product-add-form">
          <el-form
            ref="ruleFormRef"
            :model="productForm"
            :rules="rules"
            label-width="auto"
            class="product-form"
            status-icon
          >
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="productForm.name" placeholder="输入商品名称" />
            </el-form-item>
            <el-form-item label="商品描述" prop="description">
              <el-input v-model="productForm.description" type="textarea" placeholder="输入商品描述" />
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="productForm.price" placeholder="输入商品价格" />
            </el-form-item>
            <el-form-item label="商品原价" prop="original_price">
              <el-input v-model="productForm.original_price" placeholder="输入商品原价" />
            </el-form-item>
            <el-form-item label="商品库存" prop="stock">
              <el-input v-model="productForm.stock" placeholder="输入商品库存" />
            </el-form-item>
            <el-form-item label="商品图片" prop="image_list">
              <el-upload
                v-model:file-list="productForm.image_list"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false"
                :limit="1"
                :on-exceed="handleExceed"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="供应商" prop="manufacturer">
              <el-select v-model="productForm.manufacturer" placeholder="选择供应商">
                <el-option label="EasiDAO" value="EasiDAO" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否上架" prop="is_active">
              <el-switch v-model="productForm.is_active" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()"> 提交 </el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

import { uploadFiles } from "@/api/files/index"
import { addProduct } from "@/api/product/index"

const router = useRouter()

const productForm = ref({
  name: "",
  description: "",
  price: "",
  original_price: "",
  stock: "",
  image_list: [],
  manufacturer: "EasiDAO",
  is_active: true
})

const rules = {
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  description: [{ required: true, message: "请输入商品描述", trigger: "blur" }],
  price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
  original_price: [{ required: true, message: "请输入商品原价", trigger: "blur" }],
  stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
  image_list: [{ required: true, message: "请上传商品图片", trigger: "blur" }],
  manufacturer: [{ required: true, message: "请选择供应商", trigger: "blur" }],
  is_active: [{ required: true, message: "请选择是否上架", trigger: "blur" }]
}

const ruleFormRef = ref(null)

const dialogImageUrl = ref("")
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleExceed = (uploadFiles, uploadFile) => {}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const submitForm = async () => {
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      const formData = new FormData()
      formData.append("file", productForm.value.image_list[0].raw)
      const res = await uploadFiles(formData)

      if (res.code !== 200) {
        ElMessage.error("上传图片失败")
        return
      }

      const params = {
        ...productForm.value,
        image_url: res.data.url
      }

      const addRes = await addProduct(params)

      if (addRes.code === 200) {
        ElMessage.success("新增商品成功")

        resetForm()
      } else {
        ElMessage.error(addRes.message)
      }
    } else {
      console.log("error submit!", fields)
    }
  })
}

const resetForm = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
.product-manage-add-main {
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
  }
}
</style>
