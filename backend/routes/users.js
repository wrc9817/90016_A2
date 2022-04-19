
var express = require('express');
var querySQL = require('../database/index')
var query = require('../database/sql')
var sendMsg = require('../nodemailer/index')
var router = express.Router();

// 注册
router.post('/',  function(req, res, next) {
  var param = req.body.data
  new Promise(function(resolve,reject){
    // console.log("req:",req,param);
    var sql = "SELECT * FROM User WHERE email = '"+param.email+"';"
    querySQL(sql, (e)=>{
        if(e){
          if(e.length==0){
            resolve()
          }else{
            res.send({
              message:'Account already exists',
              status:0
            })
          }
        }else{
          res.send({
            message:'error',
            status:-1
          })
        }
      })
  })
  .then(()=>{
    var sql = "INSERT INTO `A2`.`User` (`email`, `password`) VALUES ('"+param.email+"', '"+param.password+"');"
    querySQL(sql,(e)=>{
      if(e){
        res.send({
        message:'Sign up successfully! A welcome email has been sent to you.',
        status:200
      });
       sendMsg(param.email)
      }else{
        res.send({
          message:'error',
          status:-1
        })
      }
    })  
  })
  
  
});

// 登录
router.get('/', function(req, res, next) {
  var param = req.query
  var sql = "SELECT * FROM User WHERE email = '"+param.email+"' AND password='"+param.password+"';"
  querySQL(sql,(e)=>{
    if(e){
      console.log(e);
      res.send({
        data:e,
        message:'Login successfully!',
        status:200
    });
    }else{
      res.send({
        message:'error',
        status:-1
      })
    }
  })  
});

// 更新用户信息
router.put('/', function(req, res, next) {
  var param = req.body.data
  var sql = "UPDATE `A2`.`User` SET `age` ="+param.age+", `gender` = "+param.gender+",`first_name`="+param.first_name+",`last_name`="+param.last_name+",`location`="+param.location+" WHERE (`id` = "+param.id+");"
  new Promise(function(resolve,reject){
    querySQL(sql,(e)=>{
    if(e){
      resolve()
    }else{
      res.send({
        message:'error',
        status:-1
      })
    }
  })  
  })
  .then(()=>{
    var sql = "SELECT * FROM User WHERE email = '"+param.email+"';"
    querySQL(sql,(e)=>{
      if(e){
        console.log(e);
        res.send({
          data:e,
          message:'Update successfully!',
          status:200
      });
      }else{
        res.send({
          message:'error',
          status:-1
        })
      }
    })
  })
  
});

module.exports = router;
