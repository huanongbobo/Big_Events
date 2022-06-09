const express = require("express");
const router_articles = express.Router();

// 导入解析 formdata 格式表单数据的包
const multer = require("multer");
const path = require("path");
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, "../uploads") });

// 导入验证req.body
const expressJoi = require("@escook/express-joi");
const { add_article_schema } = require("../schema/articles.js");
// 导入相应地回调函数
const { addArticles } = require("../router_handler/articles.js");

router_articles.post(
  "/add",
  upload.single("cover_img"),
  expressJoi(add_article_schema),
  addArticles
);

module.exports = { router_articles };
