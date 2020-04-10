/*
 * @Date: 2020-03-31 10:11:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-10 13:57:12
 */
// 创建数据库模型 英雄
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  avatar: {type: String},
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: {
    difficult: {type: Number},
    skills: {type: Number},
    attack: {type: Number},
    survive: {type: Number}
  },
  skills: [{
    icon: {type: String},
    name: {type: String},
    description: {type: String},
    tips: {type: String}
  }],
  // 装备(顺风出装，逆风出装)是单独管理的（物品），所以是关联
  items1: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  items2: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  //   技巧
  usageTips: {type: String},
  battleTips: {type: String},
  teamTips: {type: String},
  //   英雄关系
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }]
})

module.exports = mongoose.model('Hero', schema,'heroes')
