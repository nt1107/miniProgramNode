const { https, router, db, app } = require('./config.js')
const login = require('./login.js')
login()

router.get('/get', async (ctx) => {
  ctx.body = '返回响应数据'
})
