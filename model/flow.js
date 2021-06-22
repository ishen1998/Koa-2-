const {
  Model,
  DataTypes
} = require('sequelize')
const sequelize = require("../db/index")
class Flow extends Model {

}
/**
 * index:期刊号
 * art_id:期刊id
 * type:期刊类型
 */
const flowFieldes = {
  index: DataTypes.INTEGER,
  art_id: DataTypes.INTEGER,
  type: DataTypes.TINYINT
}
Flow.init(flowFieldes, {
  sequelize,
  tableName: 'flow'
})
module.exports = {
  Flow
}