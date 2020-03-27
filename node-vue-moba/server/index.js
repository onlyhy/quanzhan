/*
 * @Date: 2020-03-27 09:54:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-27 13:25:07
 */
// 服务端入口文件
const express = require('express')

const app = express()
// 跨域模块
app.use(require('cors')())
// 允许客户端传Json
app.use(express.json())

// 引用过来是一个函数，要执行，同时把app传给它，这样在admin里面就有app可以用
require('./routes/admin')(app)
// 引用数据库
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})
