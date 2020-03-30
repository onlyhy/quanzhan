/*
 * @Date: 2020-03-27 11:12:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-29 14:23:59
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
    

}