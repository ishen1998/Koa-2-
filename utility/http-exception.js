class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10500, status = 500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = status
  }
}
// 请求参数错误
class BadResquest extends HttpException {
  constructor(msg = '请求参数错误', errorCode = 10400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 400
  }
}
// 授权错误
class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10401) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 401
  }
}
// 无权限错误
class Forbbiden extends HttpException {
  constructor(msg = '无权限访问', errorCode = 10403) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 403
  }
}
// 资源未找到错误
class Notfound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10404) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 404
  }
}
// 派生类中使用this需要使用super,非派生类则不用
class Success {
  constructor(data = {}, msg = '请求成功', errorCode = 10201) {
    this.msg = msg
    this.errorCode = errorCode
    this.status = 201
    this.data = data
  }
}
class CustomError extends HttpException {
  constructor(msg = '操作失败', errorCode = 10001) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 201
  }
}
module.exports = {
  HttpException,
  BadResquest,
  Forbbiden,
  Notfound,
  AuthFailed,
  Success,
  CustomError
}