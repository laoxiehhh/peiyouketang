<template>
  <div class="mycourse">
    <div v-if="!loginKey" class="mycourse-wrap">
      <no-login></no-login>
    </div>
    <div v-else class="mycourse-wrap">
      <div v-if="!isHasCourse">
        <iconpage :iconText="text"/>
      </div>
      <div class="mycourse-content" v-else>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="item.courseName" :name="index + 1" v-for="(item, index) in myCourseList" :key="index">
            <div v-for="(i, n) in item.courseItems" :key="n" @click="handleDoTest(i.courseItemId)" class="courseItem" :class="{purple: i.done}">
              {{n + 1}} - {{i.description}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="footer">
      <foot />
    </div>
  </div>
</template>

<script>
import NoLogin from './NoLogin'
import foot from '../common/foot'
import iconpage from '../common/iconpage'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      text: '暂无课程',
      // myCourseList: [],
      activeNames: ['1'],
      isHasCourse: false
    }
  },
  created () {
    if (this.loginKey) {
      if (this.myCourseList.length === 0) {
        this.getData()
      } else {
        this.isHasCourse = true
      }
    }
  },
  components: {
    noLogin: NoLogin,
    foot,
    iconpage
  },
  computed: {
    ...mapState([
      'loginKey',
      'myCourseList'
    ])
  },
  methods: {
    ...mapMutations([
      'setMyCourseList'
    ]),
    getData () {
      this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/myCourses.action', {})
        .then(res => {
          this.setMyCourseList(res.data.data)
          console.log(this.myCourseList)
          if (this.myCourseList.length === 0) {
            this.isHasCourse = false
          } else {
            this.isHasCourse = true
          }
          console.log(this.isHasCourse)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleChange (val) {
      console.log(val)
    },
    handleDoTest (courseItemId) {
      this.$router.push(`/home/dotest/${courseItemId}`)
    }
  }
}
</script>

<style scoped>
.mycourse {
  width: 100%;
  height: 100%;
}
.mycourse-wrap {
  width: 100%;
  height: 100%;
  min-height: 650px;
  min-width: 1160px;  
  display: flex;
  align-items: center;
  justify-content: center;
}
.mycourse-content {
  width: 60%;
  margin: 0 auto;
}
.courseItem {
  cursor: pointer;
  margin-bottom: 8px;
}
.purple {
  color: chocolate;
}
</style>
