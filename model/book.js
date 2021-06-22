const {
  Model,
  DataTypes
} = require("sequelize")
const axios = require('axios')
const util = require('util')
const sequelize = require('../db/index')
class Book extends Model {
  constructor(url = '') {
    super()
    this.url = url
  }
  // 获取书籍详情
  async bookDetail(id) {
    console.log(this.url, id)
    let url = util.format(this.url, id)
    console.log(url)
    let detail = await axios.get(url)
    console.log(detail)
    return detail.data
  }
}
/**
 * id:书籍主键
 * fav_nums:书籍点赞数
 */
Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

}, {
  sequelize,
  tableName: 'book'
})
module.exports = Book