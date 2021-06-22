const {
  HttpException
} = require('./http-exception')
const fs = require('fs')
const path = require('path')
const catchError = async (ctx, netx) => {
  try {
    await netx()
  } catch (err) {
    // console.log(err)
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let time = `${year}/${month}/${day} ${h<10?'0'+h:h}:${s<10?'0'+m:m}:${h<10?'0'+s:s}`
    fs.appendFile(path.join(__dirname, '../log/log.text'), '\n' + err + '\t' + time, (error) => {
      if (error) {
        console.log(error)
      }
    });
    let urlStr = "\033[36m " + ctx.method + "：" + ctx.url + "\033[0m"
    console.log(`请求：${urlStr}`)
    if (err instanceof HttpException) {
      ctx.status = err.status
      ctx.body = {
        message: err.msg,
        errorCode: err.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
    } else {
      ctx.status = 500
      ctx.body = {
        message: "we made a mistake O(∩_∩)O~~",
        errorCode: 10500,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}
module.exports = catchError