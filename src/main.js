// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$http = axios;
/* eslint-disable no-new */

//路由守卫
router.beforeEach((to, from, next) => {
  // const role = sessionStorage.getItem('userInfo');
  // if (!role && to.path !== '/login') {
  //   next({path: '/login'})
  // }
  next();
}) 


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

