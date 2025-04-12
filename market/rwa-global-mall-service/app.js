const environment = process.env.NODE_ENV;

require("dotenv").config();
if (environment === "production") {
  require("dotenv").config({ path: ".env.prod" });
} else {
  require("dotenv").config({ path: ".env.dev" });
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const router = require("./router/index.js");

const session = require("express-session");
const passport = require("passport");

const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// 指定静态文件目录
app.use("/files_manage", express.static("files_manage"));

const secretKey = JWT_SECRET; // jwt的密钥

const HOST = process.env.API_URL; // 主机地址
const PORT = process.env.API_PORT; // 端口号

const authenticateToken = (req, res, next) => {
  const whiteList = [
    "/login",
    "/adminLogin",
    "/OAuth",
    "/register",
    "/website",
  ];

  if (whiteList.some((path) => req.path.includes(path))) {
    return next();
  }

  const tokenStr = req.headers.authorization;
  // 去掉 Bearer 字符串和空格
  const token = tokenStr && tokenStr.split(" ")[1];

  if (!token) {
    const response = {
      message: "没有权限",
      code: 401,
      data: null,
    };
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userInfo = decoded;

    console.log(decoded);

    // 可以根据具体业务需求，对用户ID进行权限校验

    next();
  } catch (error) {
    let response;
    if (error.name === "TokenExpiredError") {
      response = {
        message: "登录状态已过期",
        code: 401,
        data: null,
      };
    } else if (error.name === "JsonWebTokenError") {
      response = {
        message: "token失效",
        code: 403,
        data: null,
      };
    } else {
      response = {
        message: "没有权限",
        code: 403,
        data: null,
      };
    }
    return res.status(response.code).json(response);
  }
};

app.use("/api", authenticateToken, router);

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
