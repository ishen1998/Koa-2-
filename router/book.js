const HotBook = require('../model/hot-book')
const Book = require('../model/book')
const Comment = require('../model/comment')
// 获取热门书籍列表
async function getHootBook(ctx) {
  let {
    page = 1,
      size = 10
  } = ctx.params
  console.log(page, size)
  let count = await HotBook.count()
  let list = await HotBook.findAll({
    order: ['index'],
    offset: (parseInt(page) - 1) * parseInt(size),
    limit: parseInt(size),
    attributes: {
      exclude: ['created_at', 'updated_at', 'deleted_at']
    }
  })
  ctx.body = new ctx.errorHandle.Success({
    list,
    count
  })
}
async function getDetail(ctx) {
  console.log(ctx.params)
  let {
    id
  } = ctx.params
  let book = new Book(ctx.config.yushu.detailUrl)
  let detail = await book.bookDetail(id)
  let success = new ctx.errorHandle.Success(detail)
  ctx.body = success
}
async function addComment(ctx) {
  let {
    book_id,
    content
  } = ctx.request.body
  let comment = await Comment.create({
    book_id,
    content,
    nums: 1
  })
  ctx.body = new ctx.errorHandle.Success(comment)
}
async function getComments(ctx) {
  let {
    book_id
  } = ctx.params
  console.log(book_id)
  let comments = await Comment.scope('bh').findAll({
    where: {
      book_id
    }
  })
  ctx.body = new ctx.errorHandle.Success(comments)
}
module.exports = {
  "prefix": "/v1/book",
  "get /hot_list/:page/:size": {
    middleware: [],
    router: getHootBook
  },
  "get /:id/detail": {
    middleware: [],
    router: getDetail
  },
  "post /add/short_comment": {
    middleware: [],
    router: addComment
  },
  "get /:book_id/short_comment": {
    middleware: [],
    router: getComments
  }
}