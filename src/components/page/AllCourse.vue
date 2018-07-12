<template>
  <div class="allcourse">
    <Poster />  
    <Navbar />
    <div class="allcourse-content">
      <div v-for="(item, index) in dataList" :key="index" v-if="flag">
        <courseItem :data="item"/>
      </div>  
    </div>
    <div class="allcourse-nomore">
      没有更多了
    </div>
    <div class="allcourse-footer">
      <foot />
    </div>
  </div>
</template>

<script>
import Poster from '../common/Poster.vue'
import Navbar from '../common/Navbar.vue'
import courseItem from '../common/courseItem.vue'
import foot from '../common/foot.vue'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      subject: '',
      gradeIn: '',
      dataList: [],
      flag: false
    }
  },
  created () {
    this.getData()
  },
  components: {
    Poster,
    Navbar,
    courseItem,
    foot
  },
  props: {
    course: {
      type: String,
      required: true
    },
    grade: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      'setRouter'
    ]),
    getData () {
      let data
      if (this.subject === '' && this.gradeIn === '') {
        data = {}
      } else if (this.subject === '') {
        data = {grade: this.gradeIn}
      } else if (this.gradeIn === '') {
        data = {subject: this.subject}
      } else {
        data = {
          subject: this.subject,
          grade: this.gradeIn
        }
      }
      this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quexue/index.action', data)
        .then(res => {
          this.dataList = res.data.data
          console.log(this.dataList)
          this.flag = true
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  watch: {
    course: function (newValue) {
      switch (newValue) {
        case 'all': 
          this.subject = ''
          break
        case 'math': 
          this.subject = '数学'
          break
        case 'chinese': 
          this.subject = '语文'
          break
        case 'english': 
          this.subject = '英语'
          break
      }
      console.log(this.subject)
      this.getData()
    },
    grade: function (newValue) {
      switch (newValue) {
        case 'all': 
          this.gradeIn = ''
          break
        case 'one': 
          this.gradeIn = '一年级'
          break
        case 'two': 
          this.gradeIn = '二年级'
          break
        case 'three': 
          this.gradeIn = '三年级'
          break
      }
      console.log(this.gradeIn)
      this.getData()
    }
  },
  mounted () {
    this.setRouter({
      grade: this.grade,
      course: this.course
    })
  }
}
</script>

<style scoped>
  .allcourse {
    background-color: #f8f8f8;    
  }
  .allcourse-content {
    width: 100%;
    box-sizing: border-box;
    margin-top: 50px;
    padding: 0 150px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .allcourse-nomore {
    width: 100%;
    box-sizing: border-box;
    height: 80px;
    padding: 0 150px;
    line-height: 80px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
</style>
