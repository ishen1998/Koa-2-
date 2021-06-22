const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const path = require('path')
const app = new Koa()
const InitRouter = require('./utility/load-router')
const catchError = require('./utility/catchError')
const config = require('./config')
const errorHandle = require('./utility/http-exception')
const validator = require('./utility/validator')
const {
  validatorToken
} = require('./utility/auth')
// const sequelize = require('./db/index')
// 测试数据库是否连接成功
// let test = async ()=>{
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// test()
const {
  router
} = new InitRouter('router')
// 全局错误捕获中间件
app.use(catchError)
app.use(bodyparser())
// 加载自定方法工具中间件
app.use(async (ctx, next) => {
  ctx.config = config
  ctx.errorHandle = errorHandle
  ctx.validator = validator
  await next()
})
app.use(async (ctx, next) => {
  let stime = new Date().getTime(); // 记录当前时间戳
  await next(); // 事件控制权中转
  let etime = new Date().getTime(); // 所有中间件执行完成后记录当前时间
  let time = etime - stime
  let timeStr = "\033[35m " + time + "ms" + "\033[0m"
  let urlStr = "\033[36m " + ctx.method + " " + ctx.url + "\033[0m"
  console.log(`请求地址：${urlStr}，响应时间：${timeStr}`)
})
app.use(koaStatic(path.join(__dirname, '/public')))
// 路由全局验证拦截
app.use(async (ctx, next) => {
  if (ctx.path == "/v1/token") {
    await next()
    return
  }
  if (ctx.path.indexOf("/v1") != -1) {
    let v = await validatorToken(ctx)
    if (v.isToken) {
      await next()
    } else {
      throw new ctx.errorHandle.AuthFailed(v.errMsg)
    }
    // let authFailed = new ctx.errorHandle.AuthFailed("请先登陆")
    // ctx.status = authFailed.status
    // ctx.body = authFailed
  } else {
    await next()
  }
})
// 使用路由中间件
app.use(router)
app.listen(3000, () => {
  console.log("service running at:\n \t \t \033[36m http://localhost:3000 \033[0m")
})