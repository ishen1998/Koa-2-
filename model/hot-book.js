const {
  Model,
  DataTypes
} = require('sequelize')
const sequelize = require('../db/index.js')
class HotBook extends Model {
  // getHotBookList(){
  // }

}
/**
 * index:书籍编号
 * image:书籍图片地址,
 * author:书籍作者
 * title:书籍名
 * fav_nums:书籍点赞数
 */
HotBook.init({
  index: DataTypes.INTEGER,
  image: DataTypes.STRING,
  author: DataTypes.STRING,
  title: DataTypes.STRING,
  fav_nums: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  sequelize,
  tableName: 'hot_book'
})
module.exports = HotBook