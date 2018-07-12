<template>
  <div class="user-center">
    <div class="user-wrapper">
      <div class="user-title">
        <router-link to="/home/allcourse/all/all" tag="li">首页</router-link>
        <span class="iconfont icon-gengduo"></span>
        <span>{{tabText}}</span>
      </div>
      <div class="user-content">
        <div class="content-left">
          <div class="user-name">
            <div class="user-name-img">
              <img src="../../assets/image/user.png" alt="">              
            </div>
            <div class="user-name-text">{{this.userInfo.name}}</div>
          </div>
          <div class="tab-bar">
            <div @click="handleClick('个人信息')" :class="{active: flag == 1 ? true : false}">个人信息</div>
            <div @click="handleClick('做题记录')" :class="{active: flag == 2 ? true : false}">做题记录</div>
            <div @click="handleClick('我的订单')" :class="{active: flag == 3 ? true : false}">我的订单</div>       
          </div>
        </div>
        <div class="content-right">
          <div class="user-info" v-show="flag == 1 ? true : false">
            <div class="user-bg">
              <div class="bg-wrapper"><img src="../../assets/image/user-big.png" alt=""></div>
            </div>
            <div class="user-info-item">
              <span class="iconfont icon-yonghuming user-icon"></span>
              <span class="item-title">姓名:</span>
              <span class="item-text">{{this.userInfo.name}}</span>
            </div>
            <div class="user-info-item">
              <span class="iconfont icon-zhanghao user-icon"></span>
              <span class="item-title">账号:</span>
              <span class="item-text">{{this.userInfo.username}}</span>
            </div>
          </div>
          <div class="work-record" v-show="flag == 2 ? true : false">
            <div v-if="recordList.length === 0" class="iconBox">
              <iconpage iconText="快去做题吧"/>
            </div>
            <div class="record-wrap" v-else>
              <div class="record-item" v-for="(item, index) in recordList" :key="index">
                <span class="record-item-title">习题：</span><span class="record-item-text">{{item.description}}</span>
                <span class="record-item-title">分数：</span><span class="record-item-text">{{item.marks}}分</span>
              </div>
            </div>
          </div>
          <div class="user-order" v-show="flag == 3 ? true : false">
            <div v-if="orderList.length === 0" class="iconBox">
              <iconpage iconText="暂无订单"/>
            </div>
            <div class="order-wrap" v-else>
              <div class="order-item" v-for="(item, index) in orderList" :key="index">
                <span class="order-item-title">订单名：</span><span class="order-item-text">{{item.courseName}}</span>
                <span class="order-item-title">订单时间：</span><span class="order-item-text">{{item.purchaseTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <foot />
    </div>
  </div>
</template>

<script>
import iconpage from '../common/iconpage'
import foot from '../common/foot.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      flag: 1,
      tabText: '个人信息',
      orderList: [],
      recordList: [],
      isHasRecord: false,
      isHasOrder: false
    }
  },
  created () {
    console.log(this.userInfo)
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    handleClick (text) {
      switch (text) {
        case '个人信息':
          this.flag = 1
          this.tabText = text
          break
        case '做题记录':
          this.flag = 2
          this.tabText = text
          if (!this.isHasRecord) {
            this.getData(this.flag)  
          }   
          break
        case '我的订单':
          this.flag = 3
          this.tabText = text   
          if (!this.isHasOrder) {
            this.getData(this.flag)   
          }   
          break
      }
    },
    getData (flag) {
      if (flag === 2) {
        this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/myCourseItem.action', {})
          .then(res => {
            this.recordList = res.data.data
            console.log(this.recordList)
            this.isHasRecord = true
          })
          .catch(err => {
            console.log(err)
          })
      } else if (flag === 3) {
        this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/myPurchase.action', {})
          .then(res => {
            this.orderList = res.data.data
            console.log(this.orderList)
            this.isHasOrder = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    } 
  },
  components: {
    iconpage,
    foot
  }
}
</script>

<style scoped>
.user-center {
  width: 100%;
  background-color: #f8f8f8;
}
.user-wrapper {
  width: 70%;
  min-width: 1160px;
  margin: 0 auto 50px;
}
.user-wrapper .user-title {
  width: 100%;
  height: 60px;
  color: 13px;
  line-height: 60px;
}
.user-wrapper .user-title li {
  display: inline-block;
  cursor: pointer;
  color: #666;
}
.user-wrapper .user-title span {
  color: #999
}
.user-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 518px;
}
.user-content .content-left {
  width: 122px;
  padding: 0 34px;
  background-color: #fff;
  height: 430px;
  display: flex;
  flex-direction: column;
}
.user-content .content-right {
  width: 950px;
  background-color: #fff;
  height: 518px;
}
.content-left .user-name {
  flex-grow: 2;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-name .user-name-img {
  margin: 0 auto;
  width: 84px;
  height: 84px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid #eee;
}
.user-name .user-name-text {
  text-align: center;
  margin-top: 20px;
}
.content-left .tab-bar {
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 30px 0;
}
.content-left .tab-bar div {
  cursor: pointer;
}
.content-left .tab-bar div:hover {
  color: #ff7400;
}
.content-left .tab-bar div.active {
  color: #ff7400;
}
.user-info {
  width: 100%;
  box-sizing: border-box;
  padding: 70px 40px;
  display: flex;
  flex-direction: column;
}
.user-info .user-bg {
  width: 100%;
  height: 148px;
  margin-bottom: 60px;
}
.user-info .bg-wrapper {
  width: 140px;
  height: 140px;
  padding: 3px;
  border-radius: 50%;
  border: 1px solid #eee;
  margin: 0 auto;
}
.user-info .bg-wrapper img {
  width: 100%;
  height: 100%;
}
.user-info .user-info-item {
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #eee;
  line-height: 75px;
  vertical-align: center;
}
.user-info .user-info-item .user-icon {
  font-size: 24px;
  color: #ff7400;
  padding-right: 20px;
}
.user-info .user-info-item .item-title {
  font-size: 14px;
  color: #999;
  font-weight: 500;
  padding-right: 30px;
}
.user-info .user-info-item .item-text {
  font-size: 14px;
  font-weight: 500;  
}
.user-order {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  overflow-y: scroll;
}
/* .user-order .order-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
} */
.user-order .order-wrap .order-item {
  width: 100%;
  height: 76px;
  line-height: 76px;
  border-bottom: 1px solid #eee;
}
.order-item .order-item-title {
  font-size: 14px;
  color: #999;
  font-weight: 500;
  padding-right: 30px;
}
.order-item .order-item-text {
  padding-right: 20px;
}
.work-record {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  overflow-y: scroll;
}

.work-record .record-wrap .record-item {
  width: 100%;
  height: 76px;
  line-height: 76px;
  border-bottom: 1px solid #eee;
}
.record-item .record-item-title {
  font-size: 14px;
  color: #999;
  font-weight: 500;
  padding-right: 30px;
}
.record-item .record-item-text {
  padding-right: 20px;
}
.iconBox {
  width: 100%;
  height: 100%;
}
</style>


