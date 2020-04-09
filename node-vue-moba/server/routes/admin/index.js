/*
 * @Date: 2020-03-27 11:12:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-09 10:03:31
 */

// 导出一个函数
module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    // 处理http异常
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        // 合并参数（父级的url参数合并到子路由里面去，这样子路由也能访问到参数比如req.params.resource）
        mergeParams: true
    })
    //  登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    //  获取模型中间件
     const resourceMiddleware = require('../../middleware/resource')
    // 通用CRUD接口
    // 动态
    // 加了两个中间件，一个是判断用户登录，一个是获取模型
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)
    
    // 创建新增资源
    router.post('/',async(req,res)=>{
      const model = await req.Model.create(req.body)
      res.send(model)
    })
    // 修改更新资源
    router.put('/:id',async(req,res)=>{
      const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
    })
    // 删除资源
    router.delete('/:id',async(req,res)=>{
       await req.Model.findByIdAndDelete(req.params.id,req.body)
      res.send({
          success:true
      })
    })
    // 资源列表
    // populate表示关联字段，能获取到关联的整个对象信息
     router.get('/',async(req,res)=>{
        //  对于populate需要特殊处理
         const queryOptions ={}
         if(req.Model.modelName  === 'Category'){
             queryOptions.populate = 'parent'
         }
    //   const items = await req.Model.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
      res.send(items)
    })
    // 资源详情
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
    // 上传也需要验证登录v
    app.post('/admin/api/upload',authMiddleware(), upload.single('file'),async(req,res)=>{
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
      // 完整写法
      // const user = await AdminUser.findOne({username:username})
      // 因为在定义模型的时候，定义了password字段不可查出来，所以这里强制加上password字段查出来！！
      const user = await AdminUser.findOne({username}).select('+password')
      assert(user,422,'用户不存在')
      // 被上面的assert替代
      // if(!user){
      //   return res.status(422).send({
      //     message:'用户不存在'
      //   })
      // }
      // 2.校验密码
      const isValid = require('bcrypt').compareSync(password,user.password)
      assert(isValid,422,'密码错误')

      // 3.返回token(安装jsonwebtoken)

      const token =jwt.sign({id:user._id},app.get('secret'))
      res.send({token})
    })

// 错误处理函数，捕获异常
app.use(async(err,req,res,next)=>{
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})

}