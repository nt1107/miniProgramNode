const { https, router, db, app } = require('./config.js')

module.exports = () => {
  // 获取openId
  router.get('/user/getOpenId', async (ctx) => {
    let code = ctx.query.code
    let resData
    await new Promise((resolve, reject) => {
      const request = https.request(
        `https://api.weixin.qq.com/sns/jscode2session?appid=wxc0487101e293089a&secret=68083c27a664776591b54d9010fd1499&js_code=${code}&grant_type=authorization_code`,
        (response) => {
          response.on('data', (data) => {
            resData = data.toString()
            console.log('000', resData)
            resolve(resData.openid)
          })
        }
      )
      request.on('error', (error) => {
        console.log('An error', error)
        resolve()
      })
      request.end()
    }).then(async (openid) => {
      console.log(1000, openid)
      await searchUser(openid).then((res) => {
        console.log(222, res)
        if (res.length) {
          ctx.body = JSON.parse(res[0])
        } else {
          ctx.body = '新用户'
        }
      })
    })
  })
  // 查找用户信息
  const searchUser = (openId) => {
    return new Promise(async (resolve, reject) => {
      const res = await db.query(
        `SELECT * FROM user WHERE openID = '${openId}';`
      )
      console.log(111, res)
      resolve(res)
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
    const res = await db.query(
      `INSET INTO user (WeChatName, openID) values(${ctx.name.WeChatName}, ${ctx.name.openid});`
    )
    ctx.body = {
      status: 200,
      messgage: 'success',
      result: res
    }
  })
}
