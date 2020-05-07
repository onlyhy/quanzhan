const express = require('express')
const app = express()
// 允许express处理提交过来的json数据
app.use(express.json())
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const Product = mongoose.model('Product',new mongoose.Schema({
    title:String,
}))
// 可以用insertMany插入一些测试数据，一般不会这样做而是用一个接口插入数据
// Product.insertMany([
//     {title:'产品1'},
//     {title:'产品2'},
//     {title:'产品3'},
// ])


// 允许跨域
app.use(require('cors')())
// 简单静态文件托管
// app.use(express.static('public'))
// 定义了路径的文件托管
// app.use('/static',express.static('public'))
app.use('/', express.static('public'))

// app.get('/', function (req,res) {
//     res.send({page:'home'})
// })
app.get('/about', function (req, res) {
  res.send({page: 'About Us'})
})
app.get('/products', async function (req, res) {
    // const data = await Product.find().skip(1).limit(2)
    // const data = await Product.find().where({
    //     title:'产品1'
    // })
    const data = await Product.find().sort({_id:-1})
    res.send(data)
})

app.get('/products/:id', async function (req,res) {
    const data = await Product.findById(req.params.id)
    res.send(data)
})

app.post('/products', async function (req,res) {
    const data = req.body
    const product = await Product.create(data)
    res.send(product)
})

app.put('/products/:id',async function (req,res) {
    const product = await Product.findById(req.params.id)
    // 赋值不需要异步，去查数据要跟mongodb连接需要异步
    product.title = req.body.title
    // 保存数据与Mongodb相连需要异步
    await product.save()
    res.send(product)
})

app.delete('/products/:id',async function (req,res) {
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.send({
        success:true
    })
})

// 监听
app.listen(3010, () => {
  console.log('App listening on port 3010')
})
