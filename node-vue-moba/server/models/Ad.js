/*
 * @Date: 2020-03-31 10:11:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-01 14:44:51
 */
// 创建数据库模型 英雄
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  items: [{
    image: {type: String},
    // 点击广告图片跳转去的地址
    url: {type: String}
  }]
})

module.exports = mongoose.model('Ad', schema)
