const fs = require('fs')
let f = fs.readFileSync('../wx.json', 'utf-8')
let wxConfig = JSON.parse(f)
let config = {
  // 默认环境变量
  environment: 'prod',
  // 默认服务启动地址
  host: 'http://localhost:3000/',
  // yushu已失效
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  // 小程序appid(用于获取openid)
  appid: '',
  // 小程序secret(用于获取openid)
  secret: '',
  // jwt 配置
  security: {
    secretKey: 'ishen', //密钥
    expiresIn: 60 * 60 * 24 * 7 //七天过期时间
  },
  // 获取wx code2Session 地址
  wx: {
    code2SessionUrl: ''
  }
}
config = Object.assign(config,wxConfig)
config.wx.code2SessionUrl = 'https://api.weixin.qq.com/sns/jscode2session?' + `appid=${config.appid}&secret=${config.secret}&js_code=%s&grant_type=authorization_code`
module.exports = config