const { User } = require('./models')
const express = require('express')

const jwt = require('jsonwebtoken')
const app = express()
const SECRET = 'asdawdzscsfcdfawdsdqw'

// 允许express接收，从客户端提交过来的Json数据
app.use(express.json())

app.get('/api/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

// 注册 
app.post('/api/register', async (req, res) => {
    // 数据写进数据库
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})

// 登录
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    //    用户不存在
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    // 用户存在,比对密码
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码无效'
        })
    }
    // 生成token(npm i jsonwebtoken)
    const jwt = require('jsonwebtoken')
    // 签名(第二个参数应该写在一个全局变量或者其他地方，不应该出现在git项目里面，属于隐私)
    const token = jwt.sign({
        id: String(user._id)
    }, SECRET)
    res.send({ user, token: token })
})

// express中间件MiddleWare，重要概念,因为以下操作很多接口都会用到，所以写成中间件
// 将最后的结果与req或者res关联上，引用这个中间件的就能获取到值
// 当然中间件中还需要加一些报错处理之类的，如果没找到就不该继续执行next了
const auth = async (req, res, next) => {
    // 分割一下请求头，得到后面的token
    const raw = String(req.headers.authorization).split(' ').pop()
    // 解
    const { id } = jwt.verify(raw, SECRET)
    req.user = await User.findById(id)
    next()
}

// 先执行中间件auth
app.get('/api/profile',auth, async (req, res) => {
    res.send(req.user)
})

// 中间件使用举例
// app.get('/api/orders',auth, async (req, res) => {
//     const orders = await orders.find().where({
//         user: req.user._id
//     })
//     res.send(orders)
// })

app.listen(3001, () => {
    console.log('http://localhost:3001')
})
