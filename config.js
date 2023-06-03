const fs = require('fs')
const Koa = require('koa')
var Router = require('koa-router')
const db = require('./database')
const bodyParser = require('koa-bodyparser')

const https = require('https')
const sslify = require('koa-sslify').default

const options = {
  key: fs.readFileSync('../../ssl/www.xtr327.com.key'),
  cert: fs.readFileSync('../../ssl/www.xtr327.com.pem')
}

const app = new Koa()

app.use(sslify())
app.use(bodyParser())

https.createServer(options, app.callback()).listen(3000, (err) => {
  if (err) {
    console.log('服务启动出错', err)
  } else {
    console.log('运行在' + 3000 + '端口')
  }
})

var router = new Router()

router.prefix('/api')

app.use(router.routes()).use(router.allowedMethods())

module.exports = {
  https,
  router,
  db,
  app
}
