/*
 * @Date: 2020-04-07 16:43:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-15 16:32:16
 */
module.exports = {
  // 这里__dirname就是当前vue.config.js的路径
  outputDir: __dirname + '/../server/web',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/web/'
  //   : '/',
  devServer: {
    port: 5555,
    overlay: { // 这里配置 html 页面是否显百示 eslint 错误信息度蒙版 
      errors: false,
      warnings: false
    }
  }
}
