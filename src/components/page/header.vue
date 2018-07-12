<template>
  <div class="header clear">
    <h1>趣学</h1>
    <ul>
      <router-link :to=" '/home/allcourse/' + grade + '/' + course" tag="li">全部课程</router-link>
      <router-link to="/home/mycourse" tag="li">我的课程</router-link>
      <router-link to="/home/description" tag="li">了解趣学</router-link>      
    </ul>
    <div class="loginTab" v-if="!loginKey">
      <!-- <span>登录</span>
      <span>注册</span> -->
      <router-link to="/login" tag="li">登录</router-link>
      <router-link to="/register" tag="li">注册</router-link>
    </div>
    <div class="userTab" v-else>
      <i class="iconfont icon-wo"></i>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="handleUserCenter()">个人中心</span></el-dropdown-item>
          <el-dropdown-item><span @click="removeUserInfo()">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.grade)
  },
  computed: {
    ...mapState([
      'loginKey',
      'userInfo',
      'grade',
      'course'
    ])
  },
  methods: {
    ...mapMutations([
      'removeUserInfo'
    ]),
    handleUserCenter () {
      this.$router.push('/home/user');
    }
  }
}
</script>

<style scoped>
  .clear::after {
    content: '';
    display: block;
    clear: both;
  }
  .header {
    width: 100%;
    height: 56px;
    background-color: #111;
    color: #fff;
  }
  .header h1 {
    float: left;
    height: 28px;
    width: 122px;
    margin: 14px 51px 14px 51px;
    font-size: 24px;
    font-weight: 400
  }
  .header ul li {
    float: left;
    margin: 0 25px;
    height: 56px;
    line-height: 56px;
    cursor: pointer;
  }
  .router-link-exact-active, .router-link-active {
    color: #949494;
  }  
  .loginTab, .userTab {
    float: right;
    margin-right: 150px;
    font-size: 14px;
    height: 56px;
    line-height: 56px;
  }
  .el-dropdown-link {
    color: #fff;
    font-size: 16px;
  }
  .loginTab li {
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
  }
</style>

