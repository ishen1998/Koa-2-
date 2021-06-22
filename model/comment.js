const {
  DataTypes,
  Model
} = require('sequelize')
const sequelize = require('../db/index')
class Comments extends Model {

}
/**
 * content:评论内容
 * nums:评论点赞数量
 * book_id:bookid
 */
Comments.init({

  content: {
    type: DataTypes.STRING(12)
  },
  nums: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  book_id: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  tableName: 'comment'
})
module.exports = Comments