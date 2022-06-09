// 导入相应的包
const express = require("express");
const expressJoi = require("@escook/express-joi");
// 实例化路由模块
const router = express.Router();
// 打入路由处理回调函数
const back_fun_router = require("../router_handler/user.js");
// 添加相应地get请求
// 添加相应地post请求
const { regUsername_schume } = require("../schema/user.js");
router.post(
  "/userReg",
  expressJoi(regUsername_schume),
  back_fun_router.userReg
);
router.post(
  "/userLog",
  expressJoi(regUsername_schume),
  back_fun_router.userLog
);

// 错误中间件

module.exports = {
  router_user: router,
};
