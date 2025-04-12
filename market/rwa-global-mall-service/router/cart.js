const express = require("express");
const { connectDB } = require("../utils/db_connect");
const { getNowFormatDate } = require("../utils/index");

const router = express.Router();

// 添加购物车
router.post("/add", (req, res) => {
  const { userId } = req.userInfo;
  const { goodsList } = req.body;

  // 删除该用户的所有购物车记录
  const deleteSql = `DELETE FROM user_cart WHERE user_id = ${userId}`;

  connectDB(deleteSql)
    .then(() => {
      // 插入新的记录
      const promises = goodsList.map((item) => {
        const { id, quantity } = item;

        const sql = `INSERT INTO user_cart (user_id, product_id, quantity, created_at) VALUES (${userId}, ${id}, ${quantity}, '${getNowFormatDate()}')`;

        return connectDB(sql);
      });

      return Promise.all(promises);
    })
    .then(() => {
      res.json({
        code: 200,
        message: "添加成功",
        data: null,
      });
    })
    .catch((err) => {
      res.json({
        code: 500,
        message: "添加失败",
        data: err,
      });
    });
});

// 购物车列表
router.get("/list", async (req, res) => {
  const { userId } = req.userInfo;

  const sql = `SELECT * FROM user_cart WHERE user_id = ${userId}`;

  try {
    const cartItems = await connectDB(sql);

    const promises = cartItems.map(async (item) => {
      const priceSql = `SELECT price FROM sys_product WHERE id = ${item.product_id}`;
      const priceResult = await connectDB(priceSql);

      return {
        ...item,
        price: priceResult[0].price,
      };
    });

    const result = await Promise.all(promises);

    res.json({
      code: 200,
      message: "success",
      data: result,
    });
  } catch (err) {
    res.json({
      code: 500,
      message: "查询失败",
      data: err,
    });
  }
});

module.exports = router;
