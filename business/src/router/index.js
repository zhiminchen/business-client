import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'
import ElementUI, {Message} from 'element-ui'

Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$message = Message

const router = new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },
    {
      path: '/login', component: Login
    },
    {
      path: '/home', component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径挑战过来
  // next是一个函数, 表示放行
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }

  next()

})

export default router




