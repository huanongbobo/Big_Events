// 导入相应的包文件
const express = require("express");
const expressJoi = require("@escook/express-joi");
const {
  addArticleCates_schume,
  deleteArticleCates_schume,
  updateArticleCateByid_schume,
} = require("../schema/artcate.js");

const router = express.Router();
// 导入相应地回调函数
const {
  getArticleCates,
  addArticleCates,
  deleteArticleCates,
  getArticleCatesById,
  updateArticleCateByid,
} = require("../router_handler/artcate");
// 获取文章的列表
router.get("/cates", getArticleCates);

// 新增文章的分类
router.post("/addcates", expressJoi(addArticleCates_schume), addArticleCates);
module.exports = {
  router_artcate: router,
};

// 删除文章的分类
router.get(
  "/deletecate/:id",
  expressJoi(deleteArticleCates_schume),
  deleteArticleCates
);

// 根据id获取文章列表
router.get(
  "/cates/:id",
  expressJoi(deleteArticleCates_schume),
  getArticleCatesById
);

// 根据ID更新文章的分类数据
router.post(
  "/updatecate",
  expressJoi(updateArticleCateByid_schume),
  updateArticleCateByid
);
