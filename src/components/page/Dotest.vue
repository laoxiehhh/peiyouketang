<template>
  <div class="dotest">
    <div class="dotest-content">
      <div class="content-item" v-for="(item, index) in questionList" :key="index">
        <span class="item-title">第{{index + 1}}题:</span>
        <question v-on:handleAnswer="handleQuesAnswer" :question="item" :myAnswerKey="myAnswerKey" :correctAnswer="correctAnswerList[index] || {}"/>        
      </div>
      <div class="submitBtn">
        <el-button type="primary" round :disabled="submitAbled" @click="handleAnswerSubmit">提交答案</el-button>
      </div>
    </div>
    <div class="dotest-footer">
      <foot />
    </div>
  </div>
</template>

<script>
import foot from '../common/foot'
import question from '../common/question'
export default {
  data () {
    return {
      questionList: [],
      myAnswerList: [],
      correctAnswerList: [],
      marks: '',
      myAnswerKey: false
    }
  },
  props: {
    courseItemId: {
      type: String,
      required: true
    }
  },
  created () {
    this.getData()
  },
  components: {
    foot,
    question
  },
  computed: {
    submitAbled: function () {
      return this.myAnswerList.length < 10 ? true : false
    }
  },
  methods: {
    handleQuesAnswer (val) {
      if (this.myAnswerList.length === 0) {
        this.myAnswerList.push(val)
      } else {
        let key = false
        for (let i = 0; i < this.myAnswerList.length; i ++) {
          if (this.myAnswerList[i].questionId === val.questionId) {
            this.myAnswerList[i].answer = val.answer
            key = true
          }
        }
        if (!key) {
          this.myAnswerList.push(val)
        }
      }
      console.log(this.myAnswerList)
    },
    getData () {
      let data = {courseItemId: this.courseItemId}
      this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/doWork.action', data)
        .then(res => {
          res.data.data.questions.sort(function (a, b) {
            return a.questionId - b.questionId
          })
          this.questionList = res.data.data.questions
          console.log(this.questionList)
        })
    },
    handleAnswerSubmit () {
      let arr = this.myAnswerList
      arr.sort(function (a, b) {
        return a.questionId - b.questionId
      })
      let data = {question: arr}
      this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/results.action', data)
        .then(res => {  
          res.data.data.correct.sort(function (a, b) {
            return a.questionId - b.questionId
          })
          this.correctAnswerList = res.data.data.correct
          this.marks = res.data.data.marks
          this.myAnswerKey = true
          console.log(this.correctAnswerList)
          console.log(this.marks)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.dotest {
  width: 100%;
  height: 100%;
}
.dotest .dotest-content {
  width: 60%;
  min-height: 750px;
  min-width: 960px;  
  margin: 30px auto 10px;
  border: 1px solid #eee;

}
.dotest .dotest-content .content-item {
  width: 100%;
  /* height: 80px; */
  box-sizing: border-box;
  padding: 10px 80px;
  border-bottom: 1px solid #eee;
}
.dotest .dotest-content .content-item:last-child {
  border-bottom: none;
}
.item-title {
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding-bottom: 6px;
}
.submitBtn {
  width: 100%;
  padding: 20px 0; 
  text-align: center;
}
</style>
