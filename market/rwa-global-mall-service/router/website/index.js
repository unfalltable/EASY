const express = require("express");

const { connectDB } = require("../../utils/db_connect");
const { getNowFormatDate } = require("../../utils/index");

const router = express.Router();

// 产品列表
router.get("/product/list", async (req, res) => {
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

// 产品详情
router.get("/product/detail", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.json({
      code: 400,
      message: "缺少必要参数",
      data: null,
    });
    return;
  }

  const sql = "SELECT * FROM sys_product WHERE id = ?";

  connectDB(sql, [id])
    .then((result) => {
      res.json({
        code: 200,
        message: "success",
        data: result[0],
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
