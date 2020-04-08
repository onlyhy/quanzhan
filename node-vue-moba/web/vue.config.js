/*
 * @Date: 2020-04-07 16:43:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-08 16:12:54
 */
module.exports = {
  devServer: {
    port: 5555,
    overlay: { // 这里配置 html 页面是否显百示 eslint 错误信息度蒙版 
      errors: false,
      warnings: false
    }
  }
}
