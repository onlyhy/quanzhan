/*
 * @Date: 2020-03-31 10:11:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-01 16:22:40
 */
// 创建数据库模型 管理员用户
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {type: String},
  // selects设为false就是不可查，前端显示不了
  password: {type: String, select: false, set(val) {
      return require('bcrypt').hashSync(val, 10)
  }}
})

module.exports = mongoose.model('AdminUser', schema)
