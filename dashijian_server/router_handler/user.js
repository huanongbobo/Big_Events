// 所有的路由回调函数都写在这里
// 将路由函数抽离出来，实现模块化
// 导入模块部分
const { data_base } = require("../db/index.js");
const jwt = require("jsonwebtoken");
// 密码加密模块
const bcryptjs = require("bcryptjs");
const config = require("../config");
// 用户注册回调
exports.userReg = (req, res) => {
  // 下面这两种方法的this不同，看看以后有没有用途
  // console.log(this);
  const re_body = req.body;
  // 对密码加密
  re_body.password = bcryptjs.hashSync(re_body.password, 10);
  // 1、判断数据是否合法（是否为空）
  // if (!re_body.username || !re_body.password) {
  //   return res.cc("用户名或者密码不合法！");
  // }
  // 更换了校验方法,改用第三方校验
  // 2、若合法的法，则查看用户名是否已经被注册
  let sql = "select * from ev_users where username = ?";
  data_base.query(sql, [re_body.username], function (err, results) {
    if (err) {
      return res.cc(err);
    }
    if (results.length > 0) {
      //用户名被占用了
      return res.cc("用户名已被注册！");
    }
  });
  // 3、没注册的话，开始注册
  sql = "insert into ev_users (`username`, `password`) values (?, ?)";
  data_base.query(
    sql,
    [re_body.username, re_body.password],
    function (err, results) {
      if (err) return res.cc(err);
      if (results.affectedRows === 1) {
        return res.cc("恭喜您，注册成功！", 0);
      } else {
        return res.cc("注册失败，请您稍后重试！");
      }
    }
  );
  // res.send("用户注册成功");
};

// 用户登录回调
exports.userLog = function (req, res) {
  // console.log(this);
  const userInfo = req.body;
  // 看看是否存在改用户
  let sql = "select * from ev_users where username = ?";
  data_base.query(sql, [userInfo.username], function (err, results) {
    if (err) return res.cc(err.message);
    if (results.length !== 1) return res.cc("用户名输入错误，请重新输入！！");
    // 有该用户， 则判断密码是否正确
    const password_t_or_f = bcryptjs.compareSync(
      userInfo.password,
      results[0].password
    );
    if (!password_t_or_f) return res.cc("密码输入错误，请重新输入！！");
    // 密码正确，生成用户的token字符串
    // 1、结构出不包含密码和照片的用户信息
    const { password, use_pic, ...user } = results[0];
    // 2、加密得token字符串
    const tokenstr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    console.log(tokenstr);
    // 3、将生成的 Token 字符串响应给客户端：
    res.send({
      status: 0,
      message: "恭喜您，登录成功！！",
      token: "Bearer " + tokenstr,
    });
  });
};
