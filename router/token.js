const {
  createToken,
  validatorToken
} = require('../utility/auth')
const User = require('../model/user')
const axios = require('axios')
const util = require('util')
async function getToken(ctx) {
  let {
    jsCode
  } = ctx.request.body
  let validator = await validatorToken(ctx)
  if (validator.isToken) {
    ctx.body = new ctx.errorHandle.Success(validator.token)
    return
  }
  let url = util.format(ctx.config.wx.code2SessionUrl, jsCode)
  let res = await axios.get(url)
  if (res.data.errcode) {
    throw new ctx.errorHandle.AuthFailed(res.data.errmsg)
  } else {
    let user = await User.findOne({
      where: {
        openid: res.data.openid
      }
    })
    if (!user) {
      user = await User.create({
        openid: res.data.openid
      })
      // console.log(user)
    }
    let token = await createToken(user.id, ctx)
    // console.log(token)
    ctx.body = new ctx.errorHandle.Success(token)
  }
}
module.exports = {
  prefix: '/v1',
  "post /token": {
    middleware: [],
    router: getToken
  }
}