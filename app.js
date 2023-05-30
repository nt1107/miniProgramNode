const fs = require('fs')
const Koa = require('koa');
var Router = require('koa-router');
const db = require('./database')


const https = require('https')
const sslify = require('koa-sslify').default

const options = {
  key: fs.readFileSync('../../ssl/www.xtr327.com.key'),
  cert: fs.readFileSync('../../ssl/www.xtr327.com.pem')
}

const app = new Koa();

app.use(sslify())


https.createServer(options, app.callback()).listen(3000, (err) => {
  if (err) {
    console.log('服务启动出错', err);
  } else {
    console.log('运行在' + 3000 + '端口');
  }	
})


var router = new Router();

router.prefix('/api')

router.get('/get', async (ctx) => {
  ctx.body = "返回响应数据";
})

router.getOpenId('/getOpenId', async (ctx) => {
  let code = ctx.query.code
})

router.get('/user/getOpenId', async (ctx) => {
  let code = ctx.query.code
  https.request(`https://api.weixin.qq.com/sns/jscode2session?appid=wxc0487101e293089a&secret=68083c27a664776591b54d9010fd1499&js_code=${code}&grant_type=authorization_code`, (res) => {
    ctx.body = res
  })
})

router.get('/user/getInfo', async (ctx) => {
  const WeChatName = ctx.query.name
  const res = await db.query(`SELECT * FROM user WHERE WeChatName = '${WeChatName}';`)
  ctx.body = res
})

router.post('/user/setInfo', async (ctx) => {
  const res = await db.query(`INSET INTO user (WeChatName, openID) values(${ctx.name.WeChatName}, ${ctx.name.openid});`)
  ctx.body = {
    status: 200,
    messgage: 'success',
    result: res
  }
})

app.use(router.routes()).use(router.allowedMethods());

// app.listen(3000, ()=>{
//   console.log(`server start at http://127.0.0.1:3000`);
// });