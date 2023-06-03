const { https, router, db, app } = require('./config.js')

module.exports = () => {
  // 获取openId
  router.get('/user/getOpenId', async (ctx) => {
    let code = ctx.query.code
    let resData
    await new Promise((resolve, reject) => {
      console.log(111, code)
      const request = https.request(
        `https://api.weixin.qq.com/sns/jscode2session?appid=wxc0487101e293089a&secret=68083c27a664776591b54d9010fd1499&js_code=${code}&grant_type=authorization_code`,
        (response) => {
          response.on('data', (data) => {
            resData = JSON.parse(data.toString())
            resolve(resData.openid)
          })
        }
      )
      request.on('error', (error) => {
        resolve()
      })
      request.end()
    }).then(async (openid) => {
      await searchUser(openid).then((res) => {
        console.log(222, res)
        if (res.length) {
          ctx.body = {
            message: '老用户',
            userInfo: res[0]
          }
        } else {
          ctx.body = {
            message: '新用户',
            userInfo: { openid }
          }
        }
      })
    })
  })

  // 查找用户信息
  const searchUser = (openId) => {
    return new Promise(async (resolve, reject) => {
      const res = await db.query(
        `SELECT * FROM user WHERE openid = '${openId}';`
      )
      resolve(res.results)
    })
  }

  // 获取用户信息
  router.get('/user/getInfo', async (ctx) => {
    const WeChatName = ctx.query.name
    const res = await db.query(
      `SELECT * FROM user WHERE WeChatName = '${WeChatName}';`
    )
    ctx.body = res
  })

  // 传入用户信息
  router.post('/user/setInfo', async (ctx) => {
    console.log(111, ctx.request)
    const { name, openid } = ctx.request
    const res = await db.query(
      `INSET INTO user (WeChatName, openid) values(${name}, ${openid});`
    )
    ctx.body = {
      status: 200,
      messgage: 'success',
      result: res
    }
  })
}
