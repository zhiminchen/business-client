import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import ElementUI from 'element-ui'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },
    {
      path: '/login', component: Login
    }
  ]
})
