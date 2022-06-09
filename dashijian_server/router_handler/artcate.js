// 导入相应地包
const { data_base } = require("../db/index.js");

// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  const sql =
    "select * from ev_article_cate where `is_delete` = 0 order by `id` asc";
  data_base.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "获取数据成功！！",
      data: results,
    });
  });
};

// 根据id获取文章分类列表数据
exports.getArticleCatesById = (req, res) => {
  const sql =
    "select * from ev_article_cate where `id` = ? and `is_delete` = 0";
  data_base.query(sql, [req.params.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("id输入错误，请重新输入！");
    res.send({
      status: 0,
      message: "获取数据成功！！",
      data: results[0],
    });
  });
};
// 新增文章分类
exports.addArticleCates = (req, res) => {
  // 1、定义查重的SQL语句
  let sql =
    "select * from ev_article_cate where `is_delete` = 0 and (`name` = ? or `alias` = ?)";
  // 2、执行查询的SQL语句
  // 这里存在点问题，就是制查询违背删除，而不查询已经被删除的
  data_base.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);
    // name 和 alias的被占用情况
    // 长度等于2
    if (results.length == 2)
      return res.cc("您输入的名字和别名均被占用，请重新输入！！");
    // 长度等于1
    if (
      results.length == 1 &&
      req.body.name == results[0].name &&
      req.body.alias == results[0].alias
    )
      return res.cc("您输入的名字和别名均被占用，请重新输入！！");
    if (results.length == 1 && req.body.name == results[0].name)
      return res.cc("你输入的名字被占用，请重新输入！！");
    if (results.length == 1 && req.body.alias == results[0].alias)
      return res.cc("您输入的别名被占用，请重新输入！！");
  });
  // 3、新增文章分类
  sql = "insert into ev_article_cate set ?";
  data_base.query(sql, req.body, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("添加用户失败");
    res.cc("新增文章分类成功！", 0);
  });
};

// 删除文章分类的路由
exports.deleteArticleCates = (req, res) => {
  // 改变删除语句的标注
  const sql = "update ev_article_cate set is_delete = 1 where id = ?";
  data_base.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除失败，请重新操作！！");
    res.cc("删除成功！", 0);
  });
};

// 根据ID更新文章分类数据
exports.updateArticleCateByid = (req, res) => {
  // 定义查询 分类名称 和 分类别名是否被占用
  const sql =
    "select * from ev_article_cate where `id` <> ? and (`name` = ? or `alias` = ?)";
  data_base.query(
    sql,
    [req.body.id, req.body.name, req.body.alias],
    (err, results) => {
      if (err) return res.cc(err);
      // 为报错查询是否被占用
      if (results.length == 2) return res.cc("分类名称和分类别名均被占用！！");
      if (
        results.length == 1 &&
        results[0].name == req.body.name &&
        results[0].alias == req.body.alias
      )
        return res.cc("分类名称和分类别名均被占用！！");
      if (results.length == 1 && results[0].name == req.body.name)
        return res.cc("分类名称被占用！！");
      if (results.length == 1 && results[0].alias == req.body.alias)
        return res.cc("分类别名被占用！！");

      // 更新文章分类
      const sql =
        "update ev_article_cate set `name` = ?, `alias` = ? where `id` = ?";
      data_base.query(
        sql,
        [req.body.name, req.body.alias, req.body.id],
        (err, results) => {
          if (err) return res.cc("err");
          if (results.affectedRows !== 1) return res.cc("数据更新失败！！");
          res.cc("数据更新成功！！", 0);
        }
      );
    }
  );
};
