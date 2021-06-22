const Sequelize = require('sequelize')
// 数据库配置
const sequelize = new Sequelize('island', 'root', '123456', {
  // 方言
  dialect: 'mysql',
  // 主机地址
  host: 'localhost',
  // 端口
  port: '3306',
  //打印sql语句
  logging: false, 
  //修正时区
  timezone: '+08:00', 
  define: {
    //create_time  update_time delete_time
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true, //强制表名称等于模型名称
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }

})
// 是否强制更新数据库（强制则清空所有数据表
sequelize.sync({
  force: false
})
module.exports = sequelize