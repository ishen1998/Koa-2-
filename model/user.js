const {
  DataTypes,
  Model
} = require('sequelize')
const sequelize = require('../db/index')
const bcrypt = require('bcryptjs')
class User extends Model {

}
/**
 * id:用户主键
 * email:用户邮箱
 * nickname:用户昵称
 * openid:wx openid
 * password:用户密码
 */
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type:DataTypes.STRING(128),
    defaultValue:null
  },
  nickname: {
    type:DataTypes.STRING(32),
    defaultValue:null
  },
  openid: DataTypes.STRING(64),
  password: {
    type: DataTypes.STRING,
    defaultValue:null,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  }
}, {
  tableName: "user",
  sequelize
})
module.exports = User