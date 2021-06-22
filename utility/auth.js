const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
// 生成token
let createToken = async (uid, ctx) => {
  let secretKey = ctx.config.security.secretKey
  let expiresIn = ctx.config.security.expiresIn
  let token = jwt.sign({
    uid
  }, secretKey, {
    expiresIn
  })
  return token
}
// 校验token
let validatorToken = async (ctx) => {
  let token = basicAuth(ctx.req)
  let errMsg = "token不合法！"
  console.log(token)
  if (!token || !token.name) {
    // throw new ctx.errorHandle.Forbbiden(errMsg)
    return {
      isToken: false,
      data: {},
      errMsg
    }
  }
  try {
    let decode = jwt.verify(token.name, ctx.config.security.secretKey)
    // console.log(decode)
    ctx.auth = decode
    return {
      isToken: true,
      data: decode,
      token: token.name
    }
  } catch (error) {
    console.log(error)
    if (error.name == 'TokenExpiredError') {
      errMsg = 'token已过期'
      return {
        isToken: false,
        data: error,
        errMsg
      }
    }
    return {
      isToken: false,
      data: error
    }
  }
  // throw new ctx.errorHandle.Forbbiden(errMsg)

}
module.exports = {
  validatorToken,
  createToken
}