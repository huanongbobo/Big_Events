// 导入相应的包
const { data_base } = require("../db/index.js");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

// 获取用户数据
const getUserInfo = function (req, res) {
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  const sql =
    "select `id`, `username`, `nickname`, `email`, `user_pic` from ev_users where id = ?";
  data_base.query(sql, [req.user.id], function (err, results) {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("获取用户信息失败！！");
    res.send({
      status: 0,
      message: "用户信息获取成功！",
      data: results[0],
    });
  });
};

// 更新用户数据
const upDateUserinfo = function (req, res) {
  const sql = "update ev_users set ? where id = ?";
  data_base.query(sql, [req.body, req.body.id], function (err, results) {
    if (err) return res.cc(err.message);
    if (results.affectedRows !== 1) return res.cc("用户数据更新失败！");
    res.cc("用户数据更新成功！！", 0);
  });
};

// 更新用户密码
const upDatepwd = function (req, res) {
  // 开始改密码
  const sql = "select * from ev_users where id = ?";
  data_base.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("该用户不存在，请重新输入！！");
    // 用户存在，则进一步判断
    // 查看提交的旧密码是否合乎规则
    const oldPwd_t_or_f = bcryptjs.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!oldPwd_t_or_f) {
      return res.cc("密码错误无权访问！！");
    } else {
      const sql = "update ev_users set `password` = ? where id = ?";
      data_base.query(
        sql,
        [bcrypt.hashSync(req.body.newPwd, 10), req.user.id],
        (err, results) => {
          if (err) return res.cc(err);
          if (results.affectedRows !== 1)
            return res.cc("修改密码失败，请重试！！");
          res.cc("密码修改成功！！", 0);
        }
      );
    }
  });
};
const upDateAvatar = function (req, res) {
  // 先看看是否存在该用户
  const sql = "select * from ev_users where id = ?";
  data_base.query(sql, [req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) {
      return res.cc("该用户不存在！");
    } else {
      // 找到这个人则改这个人的头像
      const sql = "update ev_users set `user_pic` = ? where id = ?";
      data_base.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1)
          return res.cc("头像修改失败，请重新设置！！");
        res.cc("头像修改成功！", 0);
      });
    }
  });
  console.log(11);
};
module.exports = {
  getUserInfo,
  upDateUserinfo,
  upDatepwd,
  upDateAvatar,
};
