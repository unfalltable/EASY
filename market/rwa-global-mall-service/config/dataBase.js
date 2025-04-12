// 数据库配置

// 开发环境数据库配置
const dev_data = {
  host: "localhost", // 数据库地址
  user: "root", // 数据
  password: "", // 数据库密码
  database: "", //  数据库名称
};

// 生产环境数据库配置
const prod_data = {
  host: "",
  user: "root",
  password: "",
  database: "",
};

module.exports = process.env.NODE_ENV === "production" ? prod_data : dev_data;
