// 初始化一个基本的服务器

// 导入相应的包
const express = require("express");
const server = express();

// 添加中间件件
// cors跨域中间件
const cors = require("cors");
server.use(cors());
// 表单解析urlencoded文件
server.use(express.urlencoded({ extended: false }));
// 定义res.cc来处理一下错误返回，优化代码
server.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 在路由之前配置解析token的中间件
const config = require("./config");
const express_jwt = require("express-jwt");
server.use(
  express_jwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 路由部分
// 用户注册部分
const { router_user } = require("./router/user.js");
server.use("/api", router_user);

// 用户信息部分
const { router_userInfo } = require("./router/userInfo.js");
server.use("/my", router_userInfo);

// 文章分类部分
const { router_artcate } = require("./router/artcate");
server.use("/my/article", router_artcate);

// 文章管理部分
const { router_articles } = require("./router/articles.js");
server.use("/my/article", router_articles);
// 错误处理中间件
const Joi = require("joi");
server.use((err, req, res, next) => {
  // 判断错误类型
  if (err instanceof Joi.ValidationError) {
    return res.cc(err);
  }
  // token认证失败错误处理
  if (err.name == "UnauthorizedError") return res.cc("用户认证失败！！");
  res.cc("未知的错误！");
});
// 开启服务器
server.listen(3007, function () {
  console.log("The server is working on http://127.0.0.1:3007");
});
