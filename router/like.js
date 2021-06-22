const Favor = require('../model/favor')
const Art = require('../model/atr')
const {
  Movie,
  Music,
  Sentence
} = require('../model/classic')
const sequelize = require('../db/index')
async function like(ctx) {
  let {
    art_id,
    type
  } = ctx.request.body
  console.log(art_id, type)
  let favor = await Favor.findOne({
    where: {
      art_id,
      type,
      uid: ctx.auth.uid
    }
  })
  console.log(favor)
  if (favor) {
    throw new ctx.errorHandle.BadResquest('你已点赞！')
  }
  try {
    const result = await sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid: ctx.auth.uid
      }, {
        transaction: t
      })
      let art = new Art(art_id)
      let data = {}
      switch (type) {
        case 100:
          data = await art.getArt(Movie)
          break;
        case 200:
          data = await art.getArt(Music)
          break;
        case 300:
          data = await art.getArt(Sentence)
          break;
        case 400:
          // result = await art.getLatest(Movie)
          break;
        default:
          new ctx.errorHandle.BadResquest('type参数错误')
          break;
      }
      await data.increment('fav_nums', {
        by: 1,
        transaction: t
      })
    })
    console.log(result)
    ctx.body = new ctx.errorHandle.Success({}, "点赞成功")
  } catch (error) {
    throw error
  }

}
async function disLike(ctx) {
  let {
    art_id,
    type
  } = ctx.request.body
  let favor = await Favor.findOne({
    where: {
      art_id,
      type,
      uid: ctx.auth.uid
    }
  })
  if (!favor) {
    throw new ctx.errorHandle.BadResquest('你已取消点赞！')
  }
  try {
    const result = await sequelize.transaction(async t => {
      await Favor.destroy({
        where: {
          art_id,
          type,
          uid: ctx.auth.uid
        }
      }, {
        transaction: t
      })
      let art = new Art(art_id)
      let data = {}
      switch (type) {
        case 100:
          data = await art.getArt(Movie)
          break;
        case 200:
          data = await art.getArt(Music)
          break;
        case 300:
          data = await art.getArt(Sentence)
          break;
        case 400:
          // result = await art.getLatest(Movie)
          break;
        default:
          new ctx.errorHandle.BadResquest('type参数错误')
          break;
      }
      await data.decrement('fav_nums', {
        by: 1,
        transaction: t
      })
    })
    ctx.body = new ctx.errorHandle.Success({}, '取消点赞成功')
  } catch (error) {
    throw error
  }
}

module.exports = {
  prefix: '/v1',
  "post /like": {
    middleware: [
      
    ],
    router: like
  },
  "post /like/cancel": {
    middleware: [
      // (ctx, next) => {
      //   throw new ctx.errorHandle.Forbbiden()
      // }
    ],
    router: disLike
  },
}