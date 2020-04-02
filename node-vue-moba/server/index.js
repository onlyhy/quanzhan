/*
 * @Date: 2020-03-27 09:54:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 10:30:05
 */
// 服务端入口文件
const express = require('express')

const app = express()

// 在实例上设置一个变量(实际应该放在环境变量里，不应该保存在代码里)
app.set('secret','124hhj4234gyuy89')

// 跨域模块
app.use(require('cors')())
// 允许客户端传Json
app.use(express.json())

// 表示uploads下面的都是静态文件,可以通过 '/uploads'来访问
app.use('/uploads',express.static(__dirname + '/uploads'))
// 引用过来是一个函数，要执行，同时把app传给它，这样在admin里面就有app可以用
// 接口路由
require('./routes/admin')(app)
// 连接数据库
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})
