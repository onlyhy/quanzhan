/*
 * @Date: 2020-03-27 11:02:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 10:12:39
 */
import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 拦截器,当报错时展示错误信息
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({type: 'error',message: err.response.data.message})
  }
  return Promise.reject(err)
})

export default http
