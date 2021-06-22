const {
  Op
} = require('sequelize')
class Art {
  constructor(id) {
    this.id = id
  }
  // 获取期刊数据
  async getArt(model) {
    let findField = {
      where: {
        id: this.id
      },
      attributes: {
        exclude: ['created_at', 'updated_at', 'deleted_at']
      }
    }
    return await model.findOne(findField)
  }
  async getArtList(model, ids) {
    let findField = {
      where: {
        id: {
          [Op.in]: ids
        }
      },
      attributes: {
        exclude: ['created_at', 'deleted_at']
      }
    }
    // console.log(await model.findAll(findField))
    return await model.findAll(findField)
  }
}

module.exports = Art