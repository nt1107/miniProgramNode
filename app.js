const { https, router, db, app } = require('./config.js')
const login = require('./login.js')
const menu = require('./menu.js')
login()
menu()

router.get('/get', async (ctx) => {
  ctx.body = '返回响应数据'
})
