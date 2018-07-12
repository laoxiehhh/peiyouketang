<template>
  <div class="question">
    <div class="question-main">{{question.questionContent}}?</div>
    <div>
      <select v-model="selected" class="selected">
        <option disabled value="">请选择</option>
        <option>{{question.answers[0].answerContent}}</option>
        <option>{{question.answers[1].answerContent}}</option>
        <option>{{question.answers[2].answerContent}}</option>
      </select>
      <el-button type="primary" round size="mini" @click="handleClick">确认</el-button>
      <span class="answer">你的答案是: {{answer}}</span>
      <div class="correct" v-if="myAnswerKey">
        <span class="err" v-if="correctAnswer.isCorrect === 'false' ? true : false">错误！ 正确答案：{{correctAnswer.answer}}</span>
        <span class="yes" v-else>正确！</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '',
      answer: '',
    }
  },
  methods: {
    handleClick () {
      this.answer = this.selected
      let myAnswer = {questionId: this.question.questionId, answer: this.answer}
      this.$emit('handleAnswer', myAnswer)
    }
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    myAnswerKey: {
      type: Boolean,
      required: true
    },
    correctAnswer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.question-main {
  font-weight: 400;
  margin: 0 0 10px 10px;
}
.selected {
  margin-right: 30px;
}
.answer {
  padding-left: 30px;
}
.correct {
  display: inline-block;
  padding-left: 80px;
}
.err {
  color: red;
}
.yes {
  color: #67c23a;
}
</style>
