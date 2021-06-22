const {
  DataTypes,
  Model
} = require('sequelize')
const sequelize = require('../db/index')
// 在sequelize 中有两种等效的定义模型
// 调用 sequelize.define(modelName, attributes, options)
// 扩展 Model 并调用 init(attributes, options)
/**
 * image:图片地址
 * content:期刊内容
 * pubdata:发布日期
 * fav_nums:期刊点赞数
 * title:期刊标题
 * type:期刊类型
 */
class Movie extends Model {

}
const classicFields = {
  image: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  pubdate: {
    type: DataTypes.DATEONLY
  },
  fav_nums: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  title: DataTypes.STRING,
  type: DataTypes.TINYINT

}
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})
class Sentence extends Model {

}
Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})
class Music extends Model {

}
const musicFields = Object.assign({
  url: DataTypes.STRING
}, classicFields)
Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})
module.exports = {
  Movie,
  Sentence,
  Music
}