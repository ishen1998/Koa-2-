
module.exports = {
  "get ": {
    middleware: [
      async (ctx, next) => {
          console.log('middle1')
          next()
        },
      async (ctx, next) => {
          console.log('middle2')
          next()
        },
      async (ctx, next) => {
          console.log('middle3')
          next()
        }
    ],
    router: async (ctx) => {
      ctx.body = 'middle test'
    }
  }
}