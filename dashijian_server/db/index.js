// 在这里面导入mysql模块
const mysql = require("mysql");
// 创建实例
const data_base = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "wanlbzpl1314",
  database: "my_db_01",
});

module.exports = { data_base };
