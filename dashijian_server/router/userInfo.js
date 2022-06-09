const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  upDateUserinfo,
  upDatepwd,
  upDateAvatar,
} = require("../router_handler/userInfo.js");
const expressJoi = require("@escook/express-joi");
const {
  userInfo_schume,
  upDatepwd_schume,
  upDateavatar_schume,
} = require("../schema/user");
// 获取用户信息
router.get("/userinfo", getUserInfo);
// 更改用户信息
router.post("/userinfo", expressJoi(userInfo_schume), upDateUserinfo);
// 更新密码的路由
router.post("/updatepwd", expressJoi(upDatepwd_schume), upDatepwd);
// 更新用户头像的路由
router.post("/updateavatar", expressJoi(upDateavatar_schume), upDateAvatar);
module.exports = {
  router_userInfo: router,
};
