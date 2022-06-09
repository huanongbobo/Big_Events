// 导入相应地包文件
const expressJoi = require("@escook/express-joi");
const Joi = require("joi");

// 定义各个数据的校验规则
const title = Joi.string().required();
const cate_id = Joi.number().integer().min(1).required();
const content = Joi.string().required().allow("");
const state = Joi.string().valid("已发布", "草稿").required();

// // 验证规则对象 - 发布文章
const add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
};

module.exports = { add_article_schema };
