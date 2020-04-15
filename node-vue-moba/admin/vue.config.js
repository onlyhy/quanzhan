/*
 * @Date: 2020-04-09 09:43:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-15 16:44:00
 */
module.exports = {
  // 这里__dirname就是当前vue.config.js的路径
  outputDir:__dirname + '/../server/admin',
  // 决定部署路径，比如这里就会在'XXX/admin/'访问到资源，默认是'/'
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
  devServer: {
    port: 5556,
    overlay: { // 这里配置 html 页面是否显百示 eslint 错误信息度蒙版 
      errors: false,
      warnings: false
    }
  }
}
