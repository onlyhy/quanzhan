/*
 * @Date: 2020-04-09 09:43:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-09 09:43:53
 */
module.exports = {
  devServer: {
    port: 5556,
    overlay: { // 这里配置 html 页面是否显百示 eslint 错误信息度蒙版 
      errors: false,
      warnings: false
    }
  }
}
