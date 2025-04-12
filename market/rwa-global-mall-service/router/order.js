const express = require("express");
const { connectDB } = require("../utils/db_connect");
const { getNowFormatDate } = require("../utils/index");

const router = express.Router();

// 后续继续开发的话最好按模块区分平台端的和管理端的同类接口

// ================== 平台端订单相关接口 ==================
router.post("/create", async (req, res) => {
  const { userId } = req.userInfo;

  if (!userId) {
    res.json({
      code: 400,
      message: "userId is required",
      data: null,
    });
    return;
  }

  const cartSql = `SELECT * FROM user_cart WHERE user_id = ${userId}`;
  const cartResult = await connectDB(cartSql);

  if (cartResult.length === 0) {
    res.json({
      code: 500501,
      message: "购物车为空",
      data: null,
    });
    return;
  }

  try {
    // 开始事务
    await connectDB("START TRANSACTION");

    // 根据购物车查询商品价格
    const productIds = cartResult.map((item) => item.product_id);
    const productSql = `SELECT * FROM sys_product WHERE id IN (${productIds.join(
      ","
    )})`;
    const productResult = await connectDB(productSql);

    const total = productResult.reduce((acc, cur) => {
      const cartItem = cartResult.find((item) => item.product_id === cur.id);
      return acc + cur.price * cartItem.quantity;
    }, 0);

    // 创建订单
    const status = 10; // 10 待支付
    // 生成订单号 `DAO+时间+时间戳+用户id`
    const orderCode = `DAO${getNowFormatDate().replace(
      /-|:| /g,
      ""
    )}${Date.now()}${userId}`;
    const createOrderSql = `INSERT INTO user_order (order_code, user_id, total_price, status, created_at) VALUES ('${orderCode}', ${userId}, ${total}, ${status}, '${getNowFormatDate()}')`;
    const orderResult = await connectDB(createOrderSql);
    const orderId = orderResult.insertId;

    // 创建订单项
    const promises = cartResult.map((item) => {
      const { product_id, quantity } = item;

      const productSql = `SELECT price FROM sys_product WHERE id = ${product_id}`;
      return connectDB(productSql).then((productResult) => {
        const price = productResult[0].price;
        const orderItemSql = `INSERT INTO user_order_item (order_id, product_id, quantity, price) VALUES (${orderId}, ${product_id}, ${quantity}, ${price})`;

        return connectDB(orderItemSql);
      });
    });

    await Promise.all(promises);

    // 清空购物车
    const deleteSql = `DELETE FROM user_cart WHERE user_id = ${userId}`;
    await connectDB(deleteSql);

    // 提交事务
    await connectDB("COMMIT");

    res.json({
      code: 200,
      message: "Create Order Success",
      data: {
        total: total,
        orderCode: orderCode,
      },
    });
  } catch (err) {
    // 如果有错误，回滚事务
    await connectDB("ROLLBACK");

    res.json({
      code: 500,
      message: "Create Order Failed",
      data: err,
    });
  }
});

router.get("/list", async (req, res) => {
  const { userId } = req.userInfo;
  const { status } = req.query;

  if (!userId) {
    res.json({
      code: 400,
      message: "userId is required",
      data: null,
    });
    return;
  }

  const sql = `SELECT * FROM user_order WHERE user_id = ${userId} ${
    status ? `AND status = ${status}` : ""
  } ORDER BY created_at DESC`;

  try {
    const orderList = await connectDB(sql);

    const promises = orderList.map(async (item) => {
      const itemSql = `SELECT * FROM user_order_item WHERE order_id = ${item.id}`;
      const itemList = await connectDB(itemSql);

      const productPromises = itemList.map(async (item) => {
        const productSql = `SELECT * FROM sys_product WHERE id = ${item.product_id}`;
        const product = await connectDB(productSql);

        return {
          ...item,
          product: product[0],
        };
      });

      const products = await Promise.all(productPromises);

      return {
        ...item,
        products,
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

router.get("/total", async (req, res) => {
  const { userId } = req.userInfo;
  const { orderCode } = req.query;

  if (!userId) {
    res.json({
      code: 400,
      message: "userId is required",
      data: null,
    });
    return;
  }

  const sql = `SELECT SUM(total_price) as total FROM user_order WHERE user_id = ${userId} ${
    orderCode ? `AND order_code = '${orderCode}'` : ""
  }`;

  try {
    const result = await connectDB(sql);

    res.json({
      code: 200,
      message: "success",
      data: result[0],
    });
  } catch (err) {
    res.json({
      code: 500,
      message: "查询失败",
      data: err,
    });
  }
});

router.post("/update", async (req, res) => {
  const { userId } = req.userInfo;
  const { orderCode } = req.body;

  if (!userId || !orderCode) {
    res.json({
      code: 400,
      message: "userId, orderCode is required",
      data: null,
    });
    return;
  }

  // 查询订单状态
  const statusSql = `SELECT status FROM user_order WHERE user_id = ${userId} AND order_code = '${orderCode}'`;
  const statusResult = await connectDB(statusSql);

  if (statusResult.length === 0) {
    res.json({
      code: 500502,
      message: "订单不存在",
      data: null,
    });
    return;
  }

  // 数据库查询并自动更新订单下一个状态
  // 这一段流程中可以自动更新订单状态，不需要前端传入
  // 其他的 50 取消,60 退款 可以单独处理，避免传递不符合逻辑的状态
  const newStatusMap = {
    10: 20, // 10 待支付 -> 20 已支付
    20: 25, // 20 已支付 -> 25 商家接单
    25: 30, // 25 商家接单 -> 30 已发货
    30: 40, // 30 已发货 -> 40 已收货
    40: 70, // 40 已收货 -> 70 待评价
    70: 80, // 70 待评价 -> 80 已完成
  };

  const status = newStatusMap[statusResult[0].status];

  const sql = `UPDATE user_order SET status = ${status} WHERE user_id = ${userId} AND order_code = '${orderCode}'`;

  try {
    await connectDB(sql);

    res.json({
      code: 200,
      message: "success",
      data: null,
    });
  } catch (err) {
    res.json({
      code: 500,
      message: "更新失败",
      data: err,
    });
  }
});

// ================== 管理端订单相关接口 ==================
router.post("/adminList", async (req, res) => {
  const { status } = req.body;

  if (!status) {
    res.json({
      code: 400,
      message: "status is invalid",
      data: null,
    });
    return;
  }

  const sql = `SELECT * FROM user_order ${
    status ? `WHERE status = ${status}` : ""
  } ORDER BY created_at DESC`;

  try {
    const orderList = await connectDB(sql);

    res.json({
      code: 200,
      message: "success",
      data: orderList,
    });
  } catch (err) {
    res.json({
      code: 500,
      message: "查询失败",
      data: err,
    });
  }
});

router.post("/adminUpdate", async (req, res) => {
  const { orderCode, orderId } = req.body;

  if (!orderCode || !orderId) {
    res.json({
      code: 400,
      message: "orderCode, orderId is required",
      data: null,
    });
    return;
  }

  // 查询订单状态
  const statusSql = `SELECT status FROM user_order WHERE order_code = '${orderCode}' AND id = ${orderId}`;
  const statusResult = await connectDB(statusSql);

  if (statusResult.length === 0) {
    res.json({
      code: 500502,
      message: "订单不存在",
      data: null,
    });
    return;
  }

  // 此处逻辑参考上面的平台端订单更新接口
  const newStatusMap = {
    20: 25, // 20 已支付 -> 25 商家接单
    25: 30, // 25 商家接单 -> 30 已发货
  };

  const status = newStatusMap[statusResult[0].status];

  const sql = `UPDATE user_order SET status = ${status} WHERE order_code = '${orderCode}' AND id = ${orderId}`;

  try {
    await connectDB(sql);

    res.json({
      code: 200,
      message: "success",
      data: null,
    });
  } catch (err) {
    res.json({
      code: 500,
      message: "更新失败",
      data: err,
    });
  }
});

module.exports = router;
