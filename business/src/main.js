// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/csss/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8082'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
