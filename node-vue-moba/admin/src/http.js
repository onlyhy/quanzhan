/*
 * @Date: 2020-03-27 11:02:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 13:25:16
 */
import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// require拦截器
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    // 行业规范在前面加上'Bearer空格'表示类型,token要是取不到就传空
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  // 一定要返回config，否则会报错（cancelTokrn）
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// response拦截器,当报错时展示错误信息
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({type: 'error',message: err.response.data.message})
    if(err.response.status === 401){
        // 这边前后端约定如果状态码是401就去登录
        router.push('/login')
    }  
}
  return Promise.reject(err)
})

export default http
