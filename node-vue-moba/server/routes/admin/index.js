/*
 * @Date: 2020-03-27 11:12:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-27 15:44:48
 */

// 导出一个函数
module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    // 新增分类接口
    router.post('/categories',async(req,res)=>{
      const model = await Category.create(req.body)
      res.send(model)
    })
    // 修改分类接口
    router.put('/categories/:id',async(req,res)=>{
      const model = await Category.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
    })
    // 删除分类接口
    router.delete('/categories/:id',async(req,res)=>{
       await Category.findByIdAndDelete(req.params.id,req.body)
      res.send({
          success:true
      })
    })
    // 分类列表接口
    // populate表示关联字段，能获取到关联的整个对象信息
     router.get('/categories',async(req,res)=>{
      const items = await Category.find().populate('parent').limit(10)
      res.send(items)
    })
    // 获取分类详情
     router.get('/categories/:id',async(req,res)=>{
      const model = await Category.findById(req.params.id)
      res.send(model)
    })
    
    app.use('/admin/api',router)
}