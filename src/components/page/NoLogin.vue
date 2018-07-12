<template>
  <div class="nologin">
    <span class="el-icon-tickets"></span>
    <div class="text">请登录后查看我的课程</div>
    <el-button type="warning" class="btn" @click="toLogin()">立即登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .nologin {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 650px;
    background-color: #f8f8f8;
  }
  .el-icon-tickets {
    font-size: 104px; 
    color: #bababa;
  }
  .text {
    font-size: 14px;
    color: #bababa;
    padding: 20px 0 24px;
  }
  .btn {
    border-radius: 0;
    width: 150px;
  }

</style>

