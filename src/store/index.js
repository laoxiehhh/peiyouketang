import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}, // 用户信息
  loginKey: JSON.parse(sessionStorage.getItem('loginKey')) || false, // 是否登录  默认没有
  grade: sessionStorage.getItem('grade') || '', // 记录路由年级
  course: sessionStorage.getItem('course') || '', // 记录路由课程
  myCourseList: [] // 记录我的课程的信息
}
const mutations = {
  // 存储用户信息
  getUserInfo (state, info) {
    sessionStorage.setItem('userInfo', JSON.stringify(info)); // 防止刷新后vuex数据丢失
    state.userInfo = info
  },
  // 存储登录状态
  hasLogin (state, flog) {
    sessionStorage.setItem('loginKey', flog)
    state.loginKey = flog;
  },
  // 退出登录，删除用户信息
  removeUserInfo (state) {
    sessionStorage.removeItem('userInfo')
    sessionStorage.setItem('loginKey', false)
    state.userInfo = null
    state.loginKey = false
  },
  setRouter (state, option) {
    sessionStorage.setItem('grade', option.grade)
    sessionStorage.setItem('course', option.course)    
    state.grade = option.grade
    state.course = option.course
  },
  setMyCourseList (state, option) {
    state.myCourseList = option
  }
}
export default new Vuex.Store({
  state,
  mutations
}) 