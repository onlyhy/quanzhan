/*
 * @Date: 2020-03-27 13:18:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-30 10:01:01
 */
// 创建数据库模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {type: String},
  icon: {type: String}
})

module.exports = mongoose.model('Item', schema)
