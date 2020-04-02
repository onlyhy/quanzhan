/*
 * @Date: 2020-04-02 14:05:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 14:14:10
 */

 // 登录校验中间件
   module.exports = options => {
    const jwt = require('jsonwebtoken')
    // 处理http异常
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    
        return async(req,res,next)=>{
      //  获取请求头要用小写,用空格分隔（因为前端提交的时候token前面加了Bearer空格），分隔完后是一个数组用pop方法提取最后一个元素
      // 获取客户端请求发过来的token
      const token =String(req.headers.authorization || '').split(' ').pop()
      // assert(token,401,'请提供jwt token')
      assert(token,401,'请先登录')
      // 解密token
      const {id} = jwt.verify(token,req.app.get('secret'))
      //assert(id,401,'无效的jwt token')
      assert(id,401,'请先登录')
      // 根据解密后的token去模型里查是否有这个用户
      // 为保证后续能用，则挂载上req上
      req.user = await AdminUser.findById(id)
      assert(req.user,401,'请先登录')
      await next()
     }
   }
