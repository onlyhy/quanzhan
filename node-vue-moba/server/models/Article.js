/*
 * @Date: 2020-03-31 10:11:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-01 13:42:05
 */
// 创建数据库模型 文章
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String},
  // 可以是多个分类，所以是一个数组，里面的类型如下，关联的模型是Category
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  body: {type: String}
})

module.exports = mongoose.model('Article', schema)
