const { https, router, db, app } = require('./config.js')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  // 获取菜单列表
  router.get('/backgroundVideo', async (ctx) => {
    const res = await db.query(`SELECT * FROM menu;`)
    const video = fs.readFileSync(path.join(__dirname, 'background.mp4'))
    ctx.type = 'video/mp4'
    ctx.set('Accept-Ranges', 'bytes')
    ctx.body = video
  })
}
