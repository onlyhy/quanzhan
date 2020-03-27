/*
 * @Date: 2020-03-27 11:02:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-27 11:04:43
 */
import axios from 'axios'
const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
})
export default http