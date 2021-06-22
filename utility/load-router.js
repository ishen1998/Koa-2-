const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
class InitRouter {
  constructor(dirName) {
    this.router = null
    this._load(dirName, this._initRouter.bind(this))
  }
  _load(dirName, callback) {
    const url = path.resolve(__dirname, '../' + dirName)
    const files = fs.readdirSync(url)
    const router = new Router();
    files.forEach(filename => {
      filename = filename.replace('.js', '')
      const file = require(url + '/' + filename)
      callback(filename, file, router)
    })
  }
  _initRouter(filename, file, router) {
    let prefix = filename === "index" ? "" : `/${filename}`
    Object.keys(file).forEach(key => {

      if (key === 'prefix') {
        prefix = file[key]
        return
      }
      const [method, path] = key.split(' ')
      if (file[key].middleware && file[key].middleware.length > 0) {
        router[method](prefix + path, ...file[key].middleware, file[key].router)
      } else {
        router[method](prefix + path, file[key].router)
      }
      // console.log(prefix + path)
    })
    this.router = router.routes()
  }
}
module.exports = InitRouter