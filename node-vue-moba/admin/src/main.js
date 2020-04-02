import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'
Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

// 每一个vue实例都可拥有
Vue.mixin({
  computed:{
    uploadUrl(){
     return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeadersMixin() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
