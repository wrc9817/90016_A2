var mysql = require("mysql");
// const { call } = require('../app');

var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Wrc980107",
  database: "A2",
  port: "3306",
});
db.connect((err, con) => {
  if (err) {
    console.log("connection error");
  } else {
    console.log("successfully connected");
  }
});
function querySQL(sql, callback) {
  db.query(sql, function (error, result) {
    if (error) {
      console.log("数据库操作错误", error);
    } else {
      callback(result);
      console.log("数据库操作成功");
    }
  });
}

module.exports = querySQL;
