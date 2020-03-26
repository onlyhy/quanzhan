/*
 * @Date: 2020-03-26 10:30:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-26 16:03:41
 */
const express = require('express')
const app= express()

// 允许跨域
app.use(require('cors')())
// 识别客户端提交过来的json
app.use(express.json())

const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/element-admin',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true
})

// 建立模型(模型名习惯大写开头，单数形式)
const Article = mongoose.model('Article',new mongoose.Schema({
    title:{type:String},
    body:{type:String}
}))

// 新增文章
app.post('/api/articles',async(req,res)=>{
    const article = await Article.create(req.body)
    res.send(article)
})
// 文章列表
app.get('/api/articles', async(req,res)=>{
    const articles = await Article.find()
    res.send(articles)
})
// 删除文章
app.delete('/api/articles/:id', async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})
// 文章详情
app.get('/api/articles/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    res.send(article)
})
// 修改文章(post也可以，但是遵守restful规范要用put或者patch)
app.put('/api/articles/:id',async(req,res)=>{
    const article = await Article.findByIdAndUpdate(req.params.id,req.body)
    res.send(article)
})

app.get('/', async (req,res) =>{
    res.send('index')
})

app.listen(3003,()=>{
    console.log('http://localhost:3003/')
})