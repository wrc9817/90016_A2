
var express = require('express');
var querySQL = require('../database/index')
var query = require('../database/sql')
var sendMsg = require('../nodemailer/index')
var multer = require('multer')
var upload = multer({ dest: 'public/upload/' });
var router = express.Router();


router.post('/avatar',upload.single("avatar"),(req,res,next)=>{
  var param = req.body
  console.log(param,req.file);
  var sql = "UPDATE A2.User SET avatar = "+"'http://localhost:8099/"+req.file.path.split("public/")[1]+"' WHERE id="+param.userId+";"
  new Promise((resolve,reject)=>{
    querySQL(sql,(e)=>{
      if(e){
        resolve()
      }else{
        reject()
      }
    })
  })
  .then((result)=>{
    var sql = "SELECT * FROM A2.User WHERE id = "+param.userId+";"
    querySQL(sql,(e)=>{
      if(e){
        console.log(e);
        res.send({
          data:e[0],
          message:'Update successfully!',
          status:200
      });
      }else{
        throw "SELECT Error"
      }
    })
  })
  .catch((e)=>{
    res.send({
      message:'error',
      status:-1
    })
  })
  
  // res.sendFile({
  //   message:"",
  //   status:200,
  //   data:req.file.filename
  // })
})
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
  var sql = "SELECT * FROM User WHERE email = '"+param.email+"' AND password='"+param.password+"' AND isActive = 1;"
  querySQL(sql,(e)=>{
    if(e && e.length>0){
      e[0].isAdmin = e[0].isAdmin==1?true:false
      res.send({
        data:e[0],
        message:'Login successfully!',
        status:200
    });
    }else if(e.length==0){
      res.send({
        message:'Your account has been blocked',
        status:0
      })
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
        res.send({
          data:e[0],
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
router.get('/all',(req,res,next)=>{
  var sql = "SELECT * FROM A2.User"
  querySQL(sql,(e)=>{
    if(e){
      res.send({
        status:200,
        data:e,
        msg:""
      })
    }else{
      res.send({
        status:-1,
        msg:"error"
      })
    }
  })
})
router.put('/block',(req,res,next)=>{
  var param = req.body.data
  new Promise((resolve,reject)=>{
    var sql = "UPDATE A2.User SET isActive = 0 WHERE id="+param.userId+";"
  querySQL(sql,(e)=>{
    if(e){
      resolve()
    }else{
      reject()
    }
  })
  })
  .then((e)=>{
    var sql = "SELECT * FROM A2.User"
    querySQL(sql,(e)=>{
    if(e){
      res.send({
        status:200,
        message:"An user has been blocked",
        data:e
      })
    }else{
      res.send({
        status:-1,
        msg:"error"
      })
    }
  })
  })
  
})

router.put('/active',(req,res,next)=>{
  var param = req.body.data
  new Promise((resolve,reject)=>{
    var sql = "UPDATE A2.User SET isActive = 1 WHERE id="+param.userId+";"
  querySQL(sql,(e)=>{
    if(e){
      resolve()
    }else{
      reject()
    }
  })
  })
  .then((e)=>{
    var sql = "SELECT * FROM A2.User"
    querySQL(sql,(e)=>{
    if(e){
      res.send({
        status:200,
        message:"An user has been blocked",
        data:e
      })
    }else{
      res.send({
        status:-1,
        msg:"error"
      })
    }
  })
  })
  
})
module.exports = router;
