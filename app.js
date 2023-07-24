const { https, router, db, app } = require('./config.js')
const login = require('./login.js')
const menu = require('./menu.js')
const file = require('./file.js')
login()
menu()
file()

router.get('/get', async (ctx) => {
  ctx.body = '返回响应数据'
})
