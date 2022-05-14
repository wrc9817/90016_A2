var express = require('express');
var router = express.Router();
var querySQL = require("../database/index");


/* GET home page. */
router.get('/', function(req, res, next) {
  var param = req.query;
  var sql = "SELECT * FROM A2.feature WHERE id = "+param.featureId+";"
  querySQL(sql,(e)=>{
    if(e){
      res.send({
        status:200,
        data:e[0],
        msg:''
      })
    }else{
      res.send({
        status:-1,
        msg:"error"
      })
    }
  })
});

module.exports = router;
