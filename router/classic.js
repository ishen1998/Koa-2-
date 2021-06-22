const {
  Movie,
  Music,
  Sentence
} = require('../model/classic')
const Art = require('../model/atr')
const {
  Flow
} = require('../model/flow')
const Favor = require('../model/favor')
// 根据 id 获取期刊数据
async function getArtDetail(data) {
  const art = new Art(data.art_id)
  let result = {}
  switch (parseInt(data.type)) {
    case 100:
      result = await art.getArt(Movie)
      break;
    case 200:
      result = await art.getArt(Music)
      break;
    case 300:
      result = await art.getArt(Sentence)
      break;
    case 400:
      // result = await art.getLatest(Movie)
      break;
    default:
      // new ctx.errorHandle.BadResquest('type参数错误')
      break;
  }
  return result
}
// 获取最新期刊
async function getLatest(ctx) {

  let latest = await Flow.findOne({
    attributes: {
      exclude: ['created_at', 'updated_at', 'deleted_at']
    },
    order: [
      ['index', 'DESC']
    ]
  })
  let result = await getArtDetail(latest)
  let like_status = await isUserLike(latest.type,
    latest.art_id, uid = ctx.auth.uid)
  result.setDataValue('like_status', like_status)
  result.setDataValue('index', latest.index)
  result.setDataValue('image', ctx.config.host + result.image)
  console.log(result)

  success = new ctx.errorHandle.Success(result)
  ctx.body = success
}
// 根据index获取期刊
async function getIndex(ctx) {
  let {
    index
  } = ctx.params
  let previous = await Flow.findOne({
    attributes: {
      exclude: ['created_at', 'updated_at', 'deleted_at']
    },
    where: {
      index
    }
  })
  let result = await getArtDetail(previous)
  result.setDataValue('index', previous.index)
  result.setDataValue('image', ctx.config.host + result.image)
  success = new ctx.errorHandle.Success(result)
  ctx.body = success
}
// 获取用户点赞
async function getFavor(ctx) {
  let {
    type,
    art_id
  } = ctx.params
  let like_status = await isUserLike(type, art_id, uid = ctx.auth.uid)
  let result = await getArtDetail({
    art_id,
    type
  })
  ctx.body = new ctx.errorHandle.Success({
    fav_nums: result.fav_nums || 0,
    like_status
  })
}
// 判断当前期刊点赞状态
async function isUserLike(type, art_id, uid) {
  let favor = await Favor.findOne({
    where: {
      type,
      art_id,
      uid
    }
  })
  return like_status = favor ? true : false
}
async function getMyFavor(ctx) {
  let {
    page = 1,
      size = 5
  } = ctx.params
  let favors = await Favor.findAll({
    offset: (parseInt(page) - 1) * parseInt(size),
    limit: parseInt(size),
    where: {
      uid: ctx.auth.uid
    }
  })
  let artids = {
    100: [],
    200: [],
    300: [],
    400: [],
  }
  favors.forEach(item => {
    artids[item.type].push(item.art_id)
  })
  console.log(artids)
  const art = new Art()
  let result = []
  let movie = await art.getArtList(Movie, artids[100])
  result = [...result, ...movie]

  let music = await art.getArtList(Music, artids[200])
  result = [...result, ...music]

  let sentence = await art.getArtList(Sentence, artids[300])
  result = [...result, ...sentence]
  result = result.sort((a, b) => {
    return a.updated_at - b.updated_at
  })
  let count = await Favor.count({
    where: {
      uid: ctx.auth.uid
    }
  })
  console.log(count)
  result.map(item=>{
    item.image = ctx.config.host +item.image
  })
  ctx.body = new ctx.errorHandle.Success({
    list: result,
    count
  })
}
module.exports = {
  "prefix": "/v1/classic",

  "get /latest": {
    middleware: [],
    router: getLatest
  },
  "get /:index/previous": {
    middleware: [],
    router: getIndex
  },
  "get /:index/next": {
    middleware: [],
    router: getIndex
  },
  "get /:type/:art_id/favor": {
    middle: [],
    router: getFavor
  },
  "get /my/favor/:page/:size": {
    middle: [],
    router: getMyFavor
  }
}