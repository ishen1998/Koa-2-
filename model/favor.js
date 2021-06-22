const {
  Model,
  DataTypes
} = require("sequelize")
const sequelize = require('../db/index')
class Favor extends Model {
 
}
/**
 * uid:用户id
 * art_id:期刊id
 * type:期刊类型
 */
Favor.init({
  uid: DataTypes.INTEGER,
  art_id: DataTypes.INTEGER,
  type: DataTypes.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})
module.exports = Favor