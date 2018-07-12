<template>
  <div class="navbar">
    <div class="grade">
      <ul @click="handleGradeClick($event)">
        <li :class="{active: grade === 'all' ? true : false}">全部</li>        
        <li :class="{active: grade === 'one' ? true : false}">一年级</li>
        <li :class="{active: grade === 'two' ? true : false}">二年级</li>
        <li :class="{active: grade === 'three' ? true : false}">三年级</li>   
      </ul>
    </div>
    <div class="course">
      <ul @click="handleCourseClick($event)">
        <li :class="{active: course === 'all' ? true : false}">全部</li>        
        <li :class="{active: course === 'math' ? true : false}">数学</li>
        <li :class="{active: course === 'chinese' ? true : false}">语文</li>
        <li :class="{active: course === 'english' ? true : false}">英语</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      myCourse: '',
      myGrade: ''
    }
  },
  computed: {
    ...mapState([
      'course',
      'grade'
    ])
  },
  methods: {
    ...mapMutations([
      'setRouter'
    ]),
    handleGradeClick (e) {
      if (e.target.nodeName === 'LI' ) {
        switch (e.target.innerText) {
          case '全部': 
            this.myGrade = 'all'
            break
          case '一年级': 
            this.myGrade = 'one'
            break
          case '二年级': 
            this.myGrade = 'two'
            break
          case '三年级': 
            this.myGrade = 'three'
            break
        }
        let grade = this.myGrade
        let course = this.course
        this.setRouter({grade, course})
        this.$router.push(`/home/allcourse/${this.grade}/${this.course}`)
      }      
    },
    handleCourseClick (e) {
      if (e.target.nodeName === 'LI' ) {
        switch (e.target.innerText) {
          case '全部': 
            this.myCourse = 'all'
            break
          case '数学': 
            this.myCourse = 'math'
            break
          case '语文': 
            this.myCourse = 'chinese'
            break
          case '英语': 
            this.myCourse = 'english'
            break
        }
        let grade = this.grade
        let course = this.myCourse
        this.setRouter({grade, course})      
        this.$router.push(`/home/allcourse/${this.grade}/${this.course}`)
      }    
    }
  },
  
}
</script>

<style scoped>
  .navbar {
    width: 100%;
    box-sizing: border-box;
    /* margin-top: 50px; */
    padding: 0 150px;
  }
  .navbar ul {
    display: flex;
    padding: 10px 0;
  }
  .navbar ul li {
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    width: 74px;
    height: 34px;
    cursor: pointer;
  }
  .navbar ul li.active {
    border-radius: 34px;
    background-color: #ff7400;
    color: #fff;
  } 
</style>
