const mysql = require("mysql2");
const mysqlConfig = require("../config/dataBase");

const isDev = process.env.NODE_ENV === "development";

const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
});

const connectDB = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        if (isDev) {
          console.log("数据库连接失败: ", err);
        }
        reject(err);
        return;
      }

      connection.query(sql, params, (error, results, fields) => {
        connection.release();
        if (error) {
          if (isDev) {
            console.log("数据库查询失败: ", error);
          }
          reject(error);
          return;
        }

        if (isDev) {
          console.log("执行sql: ", sql);
          console.log("参数: ", params);
          console.log("执行结果: ", results);
        }

        resolve(results);
      });
    });
  });
};

module.exports = {
  connectDB,
};
