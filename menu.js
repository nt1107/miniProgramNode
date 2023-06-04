const { https, router, db, app } = require('./config.js')

module.exports = () => {
  // 获取菜单列表
  router.get('/menu/getMenuList', async (ctx) => {
    const res = await db.query(`SELECT * FROM menu;`)
    ctx.body = res.results
  })
  // 插入一条菜单
  router.post('/menu/setMenu', async (ctx) => {
    const { name, link, addBy } = ctx.request.body
    const res = await db.query(
      `INSERT INTO menu (name, links, addBy) values('${name}', '${link}', '${addBy}');`
    )
    ctx.body = {
      status: 200,
      messgage: 'success',
      result: res.results[0]
    }
  })
}
