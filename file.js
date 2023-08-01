const { https, router, db, app } = require('./config.js')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  // 获取菜单列表
  router.get('/backgroundVideo', async (ctx) => {
    const stat = fs.statSync(path.join(__dirname, 'bk.mp4'))
    const range = ctx.req.headers.range
    const parts = range.replace(/bytes=/, '').split('-')
    const start = Number(parts[0])
    const end = Number(parts[1]) || stat.size - 1
    ctx.set('Content-Range', `bytes ${start}-${end}/${stat.size}`)
    ctx.type = 'video/mp4'
    ctx.set('Accept-Ranges', 'bytes')
    ctx.status = 206
    const stream = fs.createReadStream(path.join(__dirname, 'bk.mp4'), {
      start,
      end
    })
    ctx.body = stream
  })

  router.get('/backgroundVideoNormal', async (ctx) => {
    console.log('normal get')
    const video = fs.readFileSync(path.join(__dirname, 'bk.mp4'))
    ctx.type = 'video/mp4'
    ctx.body = video
    console.log('normal send')
  })

  router.get('/image', async (ctx) => {
    console.log('img get')
    const image = fs.readFileSync(path.join(__dirname, 'loginBk.jpg'))
    ctx.type = 'image/jpeg'
    ctx.body = image
    console.log('img send')
  })
}
