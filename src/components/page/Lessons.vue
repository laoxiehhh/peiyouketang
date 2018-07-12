<template>
  <div class="lessons">
    <div class="lessons-wrap">
      <div class="lessons-card">
        <div class="card-left">
          <div class="card-left-title">{{lessonData.courseName}}</div>
          <div class="card-left-time">
            <span class="iconfont icon-shijianzhongbiao time-icon"></span>
            <span class="time-text">{{lessonData.start}}-{{lessonData.end}}</span>
          </div>
          <div class="card-des">适合{{lessonData.grade}} | 全国地区通用</div>
          <div class="card-teacher">
            <div class="teacher-item">
              <div class="img-wrap">
                <img src="../../assets/image/teacher.jpg" alt="">
              </div>
              <span>{{lessonData.teacherName}}</span>
            </div>
            <div class="teacher-item">
              <div class="img-wrap">
                <img src="../../assets/image/teacher.jpg" alt="">
              </div>
              <span>{{lessonData.teacherName}}</span>
            </div>
            <div class="teacher-item">
              <div class="img-wrap">
                <img src="../../assets/image/teacher.jpg" alt="">
              </div>
              <span>{{lessonData.teacherName}}</span>
            </div>
          </div>
        </div>
        <div class="card-right">
          <div class="card-right-price">￥ <span>{{lessonData.costs}}</span></div>
          <div class="card-right-btn">
            <el-button type="text" @click="handleClick">{{loginKey ? '立即购买' : '请先登录'}}</el-button>
          </div>
        </div>        
      </div>
      <div class="lessons-content">
        <div class="content-nav">课程大纲</div>
        <div class="content-main">
          <ul>
            <li v-for="(item, index) in lessonData.courseItems" :key="index" class="content-item">
              <span class="item-index">{{index}}</span>
              <span class="item-text">{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <foot />
    </div>
  </div>
</template>

<script>
import foot from '../common/foot.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      lessonData: {},
      buyFlag: null,
    }
  },
  created () {
    this.getData()
  },
  components: {
    foot
  },
  computed: {
    ...mapState([
      'loginKey'
    ])
  },
  methods: {
    handleClick () {
      if (this.loginKey) {
        this.$confirm('是否确认购买?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleBuy()
          this.$message({
            type: 'success',
            message: '购买成功！'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消购买'
          });          
        });
      } else {
        this.$router.push('/login')
      }
      
    },
    getData () {
      let data = {courseId: this.courseId}
      this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/courseInfo.action', data)
        .then(res => {
          this.lessonData = res.data.data
          console.log(this.lessonData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleBuy () {
      let data = {courseId: this.lessonData.courseId}
      this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/purchase.action', data)
        .then(res => {
          this.buyFlag = res.data.data.key
          console.log(this.buyFlag)
        })
    }
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.lessons {
  width: 100%;
  margin-top: 30px;
}
.footer {
  margin-top: 20px;
}
.lessons-wrap {
  width: 60%;
  min-width: 960px;
  margin: 0 auto;
}
.lessons-wrap .lessons-card {
  width: 100%;
  height: 225px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
}
.card-left {
  display: flex;
  flex-grow: 2;
  border-right: 1px solid #eee;
  flex-direction: column;
  padding: 30px;

}
.card-left .card-left-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.card-left .card-left-time {
  margin-bottom: 20px;
}
.card-left .card-left-time .time-icon {
  padding-right: 10px;
}
.card-left .card-left-time .time-text {
  font-size: 13px;
  color: #666;
}
.card-left .card-des {
  color: #999;
}
.card-left .card-teacher {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.card-left .card-teacher .teacher-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
}
.teacher-item .img-wrap {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.teacher-item .img-wrap img {
  width: 100%;
  height: 100%;
}
.card-right {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: flex-end;
}
.card-right .card-right-price {
  font-size: 14px;
  color: #ff7400;
}
.card-right .card-right-price span {
  font-size: 40px;
}
.card-right .card-right-btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  background-color: #ff7400;
  cursor: pointer;
  /* font-family: "Microsoft YaHei","WenQuanYi Micro Hei","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3",sans-serif; */
  text-align: center;
  margin-top: 30px;
}
.card-right .el-button {
  font-family: "Microsoft YaHei","WenQuanYi Micro Hei","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3",sans-serif;
  width: 100%;
  height: 100%;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  padding: 0;
}
.lessons-content {
  width: 60%;
  min-width: 960px;
  margin: 30px auto 0;
  border: 1px solid #eee;
}
.lessons-content .content-nav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #f8f8f8;
  color: #333;
  padding-left: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.lessons-content .content-main {
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
}
.content-main .content-item {
  height: 22px;
  line-height: 22px;
  margin-bottom: 15px;
}
.content-main .content-item .item-index {
  font-size: 20px;
  color: #bababa;
  padding-right: 30px;
  font-weight: 500;
}
.content-main .content-item .item-text {
  font-size: 14px;
  color: #333;
  font-weight: 400;
}
</style>



