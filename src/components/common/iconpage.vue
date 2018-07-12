<template>
  <div class="iconpage">
    <span class="iconfont icon-daixiugai my-icon"></span>
    <div class="text">{{iconText}}</div>
  </div>
</template>

<script>
export default {
  props: {
    iconText: String,
    required: true
  }
}
</script>

<style scoped>
.iconpage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #f8f8f8; */
}
.my-icon {
  font-size: 104px; 
  color: #bababa;
  font-weight: 400;
}
.text {
  margin-top: 10px;
}
</style>
