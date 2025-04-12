const express = require("express");

const { ethers } = require("ethers");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const { connectDB } = require("../utils/db_connect");
const { getNowFormatDate } = require("../utils/index");

const router = express.Router();

// 平台钱包登录
router.post("/login", async (req, res) => {
  const { address, message, signature } = req.body;

  if (!address || !message || !signature) {
    res.json({
      code: 400,
      message: "address, message, signature is required",
      data: null,
    });
    return;
  }

  // 校验签名
  const recoveredAddress = ethers.verifyMessage(message, signature);

  if (recoveredAddress !== address) {
    res.json({
      code: 400,
      message: "Signature verification failed",
      data: null,
    });
    return;
  }

  const sql_u = "SELECT * FROM sys_user WHERE wallet_address = ?";
  const params_u = [address];

  let userId = null;

  const result_u = await connectDB(sql_u, params_u);

  if (result_u.length === 0) {
    const sql_i =
      "INSERT INTO sys_user (wallet_address,create_time) VALUES (?,?)";
    const params_i = [address, getNowFormatDate()];

    const result_i = await connectDB(sql_i, params_i);

    userId = result_i.insertId;
  } else {
    userId = result_u[0].id;
  }

  const token = jwt.sign(
    {
      address,
      userId,
      loginTime: getNowFormatDate(),
    },
    JWT_SECRET,
    { expiresIn: "12h" } // 过期时间为12小时
  );

  res.json({
    code: 200,
    message: "Login Success",
    data: {
      token,
    },
  });
});

// 管理端登录
router.post("/adminLogin", async (req, res) => {
  const { name, password } = req.body;

  // 默认
  // const name = "rwa-admin";
  // const password = "gwrwerwd123456";

  if (!name || !password) {
    res.json({
      code: 400,
      message: "name, password is required",
      data: null,
    });
    return;
  }

  const sql_u = "SELECT * FROM sys_admin_user WHERE name = ? AND password = ?";
  const params_u = [name, password];

  const result_u = await connectDB(sql_u, params_u);

  if (result_u.length === 0) {
    res.json({
      code: 400,
      message: "Login Failed",
      data: null,
    });
    return;
  }

  const token = jwt.sign(
    {
      name,
      loginTime: getNowFormatDate(),
    },
    JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({
    code: 200,
    message: "Login Success",
    data: {
      token,
    },
  });
});

module.exports = router;
