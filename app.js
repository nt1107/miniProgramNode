const Koa = require('koa');
var Router = require('koa-router');
const db = require('./database')

const app = new Koa();
var router = new Router();

router.prefix('/api')

router.get('/get', async (ctx) => {
  ctx.body = "返回响应数据";
})

router.get('/user/getInfo', async (ctx) => {
  const WeChatName = ctx.query.name
  const res = await db.query(`SELECT * FROM user WHERE WeChatName = '${WeChatName}';`)
  ctx.body = res
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, ()=>{
  console.log(`server start at http://127.0.0.1:3000`);
});