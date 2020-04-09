/*
 * @Date: 2020-03-27 13:18:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-09 15:09:28
 */
// 创建数据库模型 分类
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  // 要注意parent的类型，表示是mongodb数据库里面的ObjectId，以及关联的模型
  parent: {type: mongoose.SchemaTypes.ObjectId,ref: 'Category'}
})

// 虚拟属性
// 此处代码大神未讲
// schema中的虚拟属性方法相当于vue中的计算属性，它是通过已定义的schema属性的计算\组合\拼接得到的新的值
// 虚拟字段不会录入数据库,但可以根据这个字段查找数据库中数据
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)
