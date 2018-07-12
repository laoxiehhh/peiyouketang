<template>
  <div class="footer">
    <div class="footer-top">
      <span class="top-text">加入我们</span>
      <span class="top-text">用户使用协议</span>
      <span>媒体接洽: 849351825@qq.com</span>
    </div>
    <div>
      武汉趣学科技有限公司 版权所有 
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.footer {
  width: 100%;
  box-sizing: border-box;
  padding: 40px 150px;
  background-color: #f3f3f3;
  text-align: center;
  color: #bababa;
  cursor: pointer;
}
.footer .footer-top {
  margin-bottom: 8px;
}
.footer .top-text {
  color: #666;
  font-size: 16px;
  line-height: 24px;
}
.footer .top-text::after {
  content: '|';
  color: #bababa;
  line-height: 24px;
  padding: 0 7px;
}
</style>
