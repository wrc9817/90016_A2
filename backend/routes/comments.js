var express = require("express");
var querySQL = require("../database/index");
var router = express.Router();

function pullAllComments(msg, res, param) {
  if (param.isAdmin==1) {
    var sql = "SELECT * FROM A2.comment ORDER BY time desc;";
      querySQL(sql, (e) => {
        if (e) {
          res.send({
            message: msg,
            status: 200,
            data: e,
          });
        } else {
          res.send({
            message: "error",
            status: -1,
          });
        }
      });
  } else {
    var  sql = param.userId?
    `
    SELECT c.*,IF(l.userId,1,0) as isLiked
    FROM A2.comment AS c LEFT JOIN (SELECT * FROM A2.like WHERE userId =`+param.userId+`) as l ON c.id = l.commentId
    WHERE c.enabled = 1
    ORDER BY time desc;
    `:
    `
    SELECT *
    FROM A2.comment
    WHERE enabled = 1
    ORDER BY time desc;
    `
    querySQL(sql, (e) => {
      if (e) {
        res.send({
          message: msg,
          status: 200,
          data: e,
        });
      } else {
        res.send({
          message: "error",
          status: -1,
        });
      }
    });
  }
}

router.get("/", function (req, res, next) {
  var param = req.query;
  pullAllComments("", res, param);
});

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
router.post("/", function (req, res, next) {
  var param = req.body.data;
  var curTime = getNowDate();
  new Promise(function (resolve, reject) {
    var sql =
      "INSERT INTO `A2`.`comment` (`content`, `title`,`time`,`authorId`,`author`,`avatar`) VALUES ('" +
      param.content +
      "', '" +
      param.title +
      "','" +
      curTime +
      "'," +
      param.authorId +
      ",'" +
      param.authorName +
      "','" +
      param.avatar +
      "');";
    querySQL(sql, (e) => {
      if (e) {
        resolve();
      } else {
        res.send({
          message: "error",
          status: -1,
        });
      }
    });
  }).then(() => {
    pullAllComments("Posted successfully", res, param);
  });
});

router.put("/like", function (req, res, next) {
  var param = req.body.data;
  if (param.isLiked) {
    new Promise((resolve, reject) => {
      var sql =
        "DELETE FROM A2.like WHERE commentId= " +
        param.commentId +
        " AND userId = " +
        param.userId +
        ";";
      querySQL(sql, (e) => {
        if (e) {
          resolve();
        } else {
          throw "DELETE Error";
        }
      });
    })
      .then(() => {
        var sql =
          "UPDATE A2.comment SET like_count = like_count - 1 WHERE id = " +
          param.commentId +
          ";";
        querySQL(sql, (e) => {
          if (!e) {
            throw "UPDATE Error";
          }
        });
      })
      .then(() => {
        pullAllComments("", res, param);
      })
      .catch((e) => {
        res.send({
          message: "error",
          status: -1,
        });
      });
  } else {
    new Promise((resolve, reject) => {
      var sql =
        "INSERT INTO A2.like (commentId,userId) values (" +
        param.commentId +
        "," +
        param.userId +
        ");";
      querySQL(sql, (e) => {
        if (e) {
          resolve();
        } else {
          throw "INSERT Error";
        }
      });
    })
      .then(() => {
        var sql =
          "UPDATE A2.comment SET like_count = like_count + 1 WHERE id = " +
          param.commentId +
          ";";
        querySQL(sql, (e) => {
          if (!e) {
            throw "UPDATE Error";
          }
        });
      })
      .then(() => {
        pullAllComments("", res, param);
      })
      .catch((e) => {
        res.send({
          message: "error",
          status: -1,
        });
      });
  }
});
router.get("/detail", (req, res, next) => {
  var param = req.query;
  new Promise((resolve, reject) => {
    var sql = "SELECT * FROM A2.comment WHERE id=" + param.commentId + ";";
    querySQL(sql, (e) => {
      if (e) {
        resolve(e);
      } else {
        reject();
      }
    });
  })
    .then((result) => {
      return new Promise((resolve, reject) => {
        var sql =
          "UPDATE A2.comment SET views = views + 1 WHERE id =" +
          param.commentId +
          ";";
        querySQL(sql, (e) => {
          if (!e) {
            throw "UPDATE Error";
          } else {
            resolve(result);
          }
        });
      });
    })
    .then((result) => {
      console.log("result", result);
      var sql =
        "SELECT * FROM A2.reply WHERE commentId=" + param.commentId + ";";
      querySQL(sql, (e) => {
        if (e) {
          result[0].reply = e;
          res.send({
            data: result[0],
            message: "",
            status: 200,
          });
        }
      });
    })
    .catch((e) => {
      res.send({
        message: "error",
        status: -1,
      });
    });
});

router.put('/enabled',(req,res,next)=>{
  var param = req.body.data;
  new Promise((resolve,reject)=>{
    var sql = "UPDATE A2.comment SET enabled = "+param.enabled+" WHERE id = " +param.commentId +";";
    querySQL(sql,(e)=>{
      if(e){
        resolve()
      }else{
        reject()
      }
    })
  })
  .then((e)=>{
    pullAllComments("", res, param);
  })
  
})
module.exports = router;
