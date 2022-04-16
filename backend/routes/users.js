
var express = require('express');
var querySQL = require('../database/index')
var query = require('../database/sql')
var sendMsg = require('../nodemailer/index')
var router = express.Router();

/* GET users listing. */
router.post('/',  function(req, res, next) {
  var param = req.body.data
  new Promise(function(resolve,reject){
    var isExist = "SELECT * FROM User WHERE email = '"+param.email+"';"
    querySQL(isExist, (e)=>{
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
    querySQL(query(param,"INSERT"),(e)=>{
      if(e){
        res.send({
        message:'Sign up successfully!',
        status:200
      });
       sendMsg()
      }else{
        res.send({
          message:'error',
          status:-1
        })
      }
    })  
  })
  
  
});
router.get('/', function(req, res, next) {
  var param = req.query
  console.log(query(param,"SELECT"));
  querySQL(query(param,"SELECT"),(e)=>{
    if(e){
      res.send({
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

module.exports = router;
