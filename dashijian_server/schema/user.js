// 导入相应地包
const Joi = require("joi");

// 定义用户信息的验证规则
const JoiUserName = Joi.string().alphanum().min(1).max(10).required();
const JoiPassWord = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required();
const JoiId = Joi.number().integer().min(1).required();
const JoiNickname = Joi.string().required();
const JoiEmail = Joi.string().email().required();

// 定义用户头像的验证规则
const Joiavatar = Joi.string().dataUri().required();
// 对外暴露

// 注册用户的校验
exports.regUsername_schume = {
  body: {
    username: JoiUserName,
    password: JoiPassWord,
  },
};

// 更新用户信息的校验
exports.userInfo_schume = {
  body: {
    nickname: JoiNickname,
    email: JoiEmail,
    id: JoiId,
  },
};

// 更新密码的校验
exports.upDatepwd_schume = {
  body: {
    oldPwd: JoiPassWord,
    newPwd: Joi.not(Joi.ref("oldPwd")).concat(JoiPassWord),
  },
};

// 更换头像的校验
exports.upDateavatar_schume = {
  body: {
    avatar: Joiavatar,
  },
};
