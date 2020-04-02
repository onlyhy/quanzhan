/*
 * @Date: 2020-03-27 11:12:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 10:31:50
 */

// 导出一个函数
module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        // 合并参数
        mergeParams: true
    })
    // 动态
    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
            //  小写复数转换为大写单数形式，找到接口需要操作的模型（表）
        const modelName = require('inflection').classify(req.params.resource)
        // 引用模型（表）赋值给req.Model，以便在接口中使用
        req.Model = require(`../../models/${modelName}`)
        // 执行接口
        next()
    },router)
    
    // 新增分类接口
    router.post('/',async(req,res)=>{
      const model = await req.Model.create(req.body)
      res.send(model)
    })
    // 修改分类接口
    router.put('/:id',async(req,res)=>{
      const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
    })
    // 删除分类接口
    router.delete('/:id',async(req,res)=>{
       await req.Model.findByIdAndDelete(req.params.id,req.body)
      res.send({
          success:true
      })
    })
    // 分类列表接口
    // populate表示关联字段，能获取到关联的整个对象信息
     router.get('/',async(req,res)=>{
        //  对于populate需要特殊处理
         const queryOptions ={}
         if(req.Model.modelName  === 'Category'){
             queryOptions.populate = 'parent'
         }
    //   const items = await req.Model.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
      res.send(items)
    })
    // 获取分类详情
     router.get('/:id',async(req,res)=>{
      const model = await req.Model.findById(req.params.id)
      res.send(model)
    })

    // 静态文件托管
    const multer = require('multer')
    // 定义一个上传的中间件
    // dest是文件上传目标地址,dirname是当前文件所在文件夹，这里加dirname是绝对地址
    const upload = multer({
      dest: __dirname + '/../../uploads'
    })
    // 传接口的时候，那个文件名 Form Data是 file,所以这里是file(这个是可以通过el-upload的参数修改)
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
      // 原本req是没有file属性的，因为我们使用了中间件
      const file = req.file
      // 服务端地址（正式存储时应该是服务器的域名）
      file.url = `http://localhost:3000/uploads/${file.filename}`
      // 返回给客户端文件信息，客户端根据接收到的信息展示图片之类的
      res.send(file)
    })
    app.post('/admin/api/login',async(req,res)=>{
      // 解构赋值
      const {username,password} = req.body
      // 1.根据用户名找用户
      const AdminUser = require('../../models/AdminUser')
      // 完整写法
      // const user = await AdminUser.findOne({username:username})
      // 因为在定义模型的时候，定义了password字段不可查出来，所以这里强制加上password字段查出来！！
      const user = await AdminUser.findOne({username}).select('+password')
      if(!user){
        return res.status(422).send({
          message:'用户不存在'
        })
      }
      // 2.校验密码
      const isValid = require('bcrypt').compareSync(password,user.password)
      if(!isValid){
        return res.status(422).send({
          message:'密码错误'
        })
      }
      // 3.返回token(安装jsonwebtoken)
      const jwt = require('jsonwebtoken')
      const token =jwt.sign({id:user._id},app.get('secret'))
      res.send({token})
    })



}