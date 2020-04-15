/*
 * @Date: 2020-03-27 09:54:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-15 16:45:19
 */
// 服务端入口文件
const express = require('express')

const app = express()

// 在实例上设置一个变量(实际应该放在环境变量里，不应该保存在代码里)
app.set('secret', '124hhj4234gyuy89')

// 跨域模块
app.use(require('cors')())
// 允许客户端传Json
app.use(express.json())

// 表示uploads下面的都是静态文件,可以通过 '/uploads'来访问
app.use('/uploads', express.static(__dirname + '/uploads'))
// 把文件夹托管到哪里与vue.config.js的publicPath关联
// 把admin文件夹以静态文件进行托管
app.use('/admin', express.static(__dirname + '/admin'))
// 把web托管到根路径
app.use('/', express.static(__dirname + '/web'))

// 连接数据库
// 连接数据库一定要放在引用接口路由的前面！！这样在接口路由中用到mongoose.model引用的时候就不会报缺Schema的错误！！
require('./plugins/db')(app)
// 引用过来是一个函数，要执行，同时把app传给它，这样在admin里面就有app可以用
// 接口路由
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})
