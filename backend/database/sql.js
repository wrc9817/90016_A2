
function query(data,type){
  if(type=='INSERT'){
    var email = data.email
    var pw = data.password
    var sql = "INSERT INTO `A2`.`User` (`email`, `password`) VALUES ('"+email+"', '"+pw+"');"
    return sql
  }else if(type=='UPDATE'){

  }else if(type=="DELETE"){

  }else if(type =="SELECT"){
    var email = data.email
    var pw = data.password
    var sql = "SELECT * FROM User WHERE email = '"+email+"' AND password='"+pw+"';"
    return sql
  }else {
    return ''
  }
}
module.exports = query


