const nodemailer = require('nodemailer');
var transporter;
var mailOptions;
async function main(){
 transporter = nodemailer.createTransport({
  host: 'smtp.163.com', // 发给QQ邮箱
  port: 465, // 发邮箱的端口号
  secureConnection: true, // 使用SSL加密传输
  auth: { // 权限认证
    user: 'wrc9817@163.com',
    pass: 'TCZBMWJFGVRXVOQL'
  }
})


 mailOptions = {
  from: 'wrc9817@163.com', // 发邮件的账号
  to: 'wrc9817@gmail.com', // 收邮件的账号
  subject: 'Account Activation', // 标题
  html: '<html><p>hi,</p><p>Welcome to Project The Species Community!</p><p>Best,</p><p>Protect The Species Team</p></html>' // 邮寄的内容
}
}
function sendMsg(){
  transporter.sendMail(mailOptions, (err, info) => {
    if (!err) {
      console.log('邮件已经发生完成')
    }else{
      console.log(err);
    }
  })
}

main().catch((e)=>{
  console.log(e);
})
module.exports = sendMsg