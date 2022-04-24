function ConvertUTC(date) {
  var json_date = new Date(date).toJSON();
  return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
      /\.[\d]{3}Z/, '')
}
 function uploadImgToBase64 (file) {
  return new Promise((resolve, reject) => {
   const reader = new FileReader()
   reader.readAsDataURL(file)
   reader.onload = function () { // 图片转base64完成后返回reader对象
    resolve(reader)
   }
   reader.onerror = reject
  })
 }

export default{
  ConvertUTC,
  uploadImgToBase64
}
