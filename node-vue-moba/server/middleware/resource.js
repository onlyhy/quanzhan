/*
 * @Date: 2020-04-02 14:10:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 14:15:30
 */
module.exports = options =>{
    return  async(req,res,next)=>{
        //  小写复数转换为大写单数形式，找到接口需要操作的模型（表）
        const modelName = require('inflection').classify(req.params.resource)
        // 引用模型（表）赋值给req.Model，以便在接口中使用
        req.Model = require(`../models/${modelName}`)
        // 执行接口
        next()
    }
}
