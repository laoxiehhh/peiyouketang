<template>
  <div class="courseItem">
    <div class="wrapper" @click="handleClick">
      <h3 class="item-title">{{data.courseName}}</h3>
      <p class="item-time"><i class="iconfont icon-shijian"></i>  {{data.start}}-{{data.end}}</p>
      <div class="item-teacher">
        <div class="teacher-title">负责人：</div>
        <div class="teacher-img">
          <img src="../../assets/image/teacher.jpg" alt="">
          <div>{{data.teacherName}}</div>
        </div>
      </div>
      <div class="item-line"></div>
      <div class="item-sell">
        <span>已有<i style="color: #ff7400">{{data.members}}</i>人报名</span>
        <div class="item-price">{{data.costs}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$router.push(`/home/lessons/${this.data.courseId}`)
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .wrapper {
    width: 304px;
    height: 304px;
    padding: 34px 38px 33px;
    position: relative;
    background: url('../../assets/image/item.png') center top no-repeat;
    cursor: pointer;
    transition: transform .2s linear;
    margin-bottom: 15px;
    margin-right: 20px;
  }
  .wrapper:hover {
    transform: translateY(-5px);
  }
  .wrapper:hover:before {
    content: '';
    position: absolute;
    left: 1px;
    top: 1px;
    width: 380px;
    height: 350px;
    /* z-index: -1; */
    box-shadow: 3px 4px 20px #ccc;
    border-radius: 5px 5px 10px 5px;
    /* background-color: #eee; */
    /* background: url('../../assets/image/itemhover.png'); */
  }
  .item-title {
    height: 46px;
  }
  .item-time {
    font-size: 14px;
    margin: 15px 0;
  }
  .item-teacher {
    display: flex;
    flex-direction: row;
    align-items: center
  }
  .teacher-img {
    text-align: center;
    margin-left: 100px;
  }
  .teacher-img img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
  }
  .item-line {
    width: 380px;
    height: 0;
    border-bottom: 1px solid #eee; 
    margin: 30px -38px;
  }
  .item-sell {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
  }
  .item-price {
    color: #ff7400;
    font-size: 40px;
  }
  .item-price::before {
    content: '￥';
    margin-right: 3px;
    font-size: 14px;
  }
</style>
