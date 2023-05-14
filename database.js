const mysql = require('mysql')

const pool = mysql.createPool({
  host: '139.224.61.106',
  user: 'root',
  password: 'mysqlU+',
  database: 'miniProgram',
  socketPath: '/var/run/mysqld/mysqld.sock'
})

exports.query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        console.log(err, "数据库连接失败");
        resolve({
          code: 500
        })
      } else {
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err)
            resolve({
              code: 400
            })
          } else {
            resolve({
              code: 200,
              results
            })
            connection.release()
            resolve(results)
          }
          connection.release() // 释放连接池
        })
      }
    })
  })
}