import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/page/Login'
import { resolve } from 'url';
//按需加载
const Login = () => import('../components/page/Login.vue');
const Register = () => import('../components/page/Register.vue');
const Home = () => import('../components/page/Home.vue');
import AllCourse from '@/components/page/AllCourse'
const  MyCourse= () => import('../components/page/MyCourse.vue');
const Description = () => import('../components/page/Description.vue');
const UserCenter = () => import('../components/page/UserCenter.vue')
const Lessons = () => import('../components/page/Lessons.vue')
const Dotest = () => import('../components/page/Dotest.vue')
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home/allcourse/all/all'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'mycourse',
          component: MyCourse
        },
        {
          path: 'allcourse/:grade/:course',
          component: AllCourse,
          props: true
        },
        {
          path: 'description',
          component: Description
        },
        {
          path: 'user',
          component: UserCenter
        },
        {
          path: 'lessons/:courseId',
          component: Lessons,
          props: true
        },
        {
          path: 'dotest/:courseItemId',
          component: Dotest,
          props: true
        }
      ]
    },
  ]
})
