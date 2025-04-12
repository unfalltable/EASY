const express = require("express");
const { connectDB } = require("../utils/db_connect");
const { getNowFormatDate } = require("../utils/index");

const router = express.Router();

// 后续继续开发的话最好按模块区分平台端的和管理端的同类接口

// ================== 管理端产品相关接口 ==================
// 新增产品
router.post("/add", (req, res) => {
  const {
    name,
    description,
    price,
    original_price,
    stock,
    image_url,
    manufacturer,
    is_active,
  } = req.body;

  const requiredParams = [
    name,
    description,
    price,
    original_price,
    stock,
    image_url,
    manufacturer,
    is_active,
  ];

  if (!requiredParams.every(Boolean)) {
    res.json({
      code: 400,
      message: "缺少必要参数",
      data: null,
    });
    return;
  }

  const sql =
    "INSERT INTO sys_product (name, description, price, original_price, stock, image_url,manufacturer, is_active, created_at) VALUES (?,?,?,?,?,?,?,?,?)";

  const params = [
    name,
    description,
    price,
    original_price,
    stock,
    image_url,
    manufacturer,
    is_active,
    getNowFormatDate(),
  ];

  connectDB(sql, params)
    .then((result) => {
      res.json({
        code: 200,
        message: "success",
        data: null,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        message: "新增产品失败",
        data: null,
      });
    });
});

// 产品列表
router.get("/list", (req, res) => {
  const sql = "SELECT * FROM sys_product ORDER BY created_at DESC";

  connectDB(sql)
    .then((result) => {
      res.json({
        code: 200,
        message: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        code: 400,
        message: "查询失败",
        data: null,
      });
    });
});

module.exports = router;
