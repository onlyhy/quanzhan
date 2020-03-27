/*
 * @Date: 2020-03-27 13:18:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-27 15:34:29
 */
// 创建数据库模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  // 要注意parent的类型，表示是mongodb数据库里面的ObjectId，以及关联的模型
  parent: {type: mongoose.SchemaTypes.ObjectId,ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)
