const Koa = require('koa');
var Router = require('koa-router');

const app = new Koa();
var router = new Router();

router.prefix('/api')


router.get('/get', async (ctx) => {
  ctx.body = "汤睿，我喜欢你";
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

