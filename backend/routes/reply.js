var express = require("express");
var querySQL = require("../database/index");
var router = express.Router();

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds(); //秒
  var currentdate =
    year +
    sign1 +
    month +
    sign1 +
    day +
    " " +
    hour +
    sign2 +
    minutes +
    sign2 +
    seconds;
  return currentdate;
}
/* GET home page. */
function pullAllReplies(msg, res, param) {
  var sql = "SELECT * FROM A2.reply WHERE commentId=" + param.commentId + " ORDER BY time desc;";
  querySQL(sql, (e) => {
    if (e) {
      res.send({
        data: e,
        message: msg,
        status: 200,
      });
    } else {
      res.send({
        message: "error",
        status: -1,
      });
    }
  });
}

router.get("/", (req, res, next) => {
  var param = req.query;
  pullAllReplies("", res, param);
});

router.post("/", function (req, res, next) {
  var param = req.body.data;
  var curTime = getNowDate();
  new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO A2.reply (time,content,authorId,commentId,avatar,author) VALUES ('" +
      curTime +
      "','" +
      param.content +
      "'," +
      param.authorId +
      "," +
      param.commentId +
      ",'" +
      param.avatar +
      "','" +
      param.author +
      "');";
    querySQL(sql, (e) => {
      if (e) {
        resolve();
      } else {
        reject();
      }
    });
  }).then((e) => {
    var sql = "UPDATE A2.comment SET reply_count = reply_count + 1 WHERE id="+param.commentId+";"
    querySQL(sql,(e)=>{
      if(!e){
        throw "UPDATE Error"
      }
    })
    
  })
  .then((e)=>{
    pullAllReplies("", res, param);
  })
});

module.exports = router;
