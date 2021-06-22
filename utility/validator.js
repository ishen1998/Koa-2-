const validator = require('validator')
// 判断是否为整数
let isInt = (id) => {
  return validator.isInt(id, {
    min: 0,
    max: 60000
  })
}
// 判断是否为email
let isEmail = (email) => {
  return validator.isEmail(email)
}
// 判断是字符长度
let isLength = (str) => {
  return validator.isLength(str, {
    min: 0,
    max: 32
  })

}
// 是否为有效的jwttoken
let isJWT = (str) => {
  return validator.isJWT(str)
}
module.exports = {
  isInt,
  isEmail,
  isJWT,
  isLength
}