<template>
    <div class="wrapper">
        <canvas id="Mycanvas"></canvas>
        <div class="login-wrap">
            <div class="move-area">
                <div class="container">
                    <div class="eye" v-bind:style="eyeStyle"></div>
                    <div class="eye" v-bind:style="eyeStyle"></div>                
                </div>
            </div>
            <div class="ms-login">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <div v-if="errorKey">
                      <span style="color: red">{{errInfo}}</span>
                    </div>
                    <el-form-item prop="name">
                        <el-input v-model="ruleForm.name" placeholder="账号" @input="inputLen" @focus="inputFocus('name')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="ruleForm.password" @focus="inputFocus('password')"></el-input>
                    </el-form-item>
                    <el-form-item  prop="validate">
                        <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        <div class="code" @click="refreshCode">
                            <Identify :identifyCode="identifyCode"></Identify>
                        </div>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                    <el-form-item class="login-remember">
                        <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="记住账号？" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> 
                    <p class="register" @click="handleCommand()">注册</p> 
                    
                </el-form>
        </div>
    </div>
    </div>
</template>

<script>
import Identify from "./Identify";
import {bgcanvas} from '../common/bgcanvas'
import { mapState, mapMutations } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      errorKey: false,
      errInfo: '',
      ruleForm: {
        name: "",
        password: "",
        validate: "",
        type: []
      },
      len: 0,
      dot: 0,
      eyeStyle: { transform: `rotate(0deg)` },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        validate: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.ruleForm.name = localStorage.ms_username || "";
    if (this.ruleForm.name.length !== 0) {
      this.len = this.ruleForm.name.length;
      this.inputLen();
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    bgcanvas('Mycanvas')
  },
  updated() {
    this.len = this.ruleForm.name.length;
  },
  computed: {
    ...mapState([
      'course',
      'grade'
    ])
  },
  methods: {
    ...mapMutations([
      'getUserInfo',
      'hasLogin'
    ]),
    submitForm(formName) {
      const self = this;
      // if (this.ruleForm.name && this.ruleForm.password) {
      //   setTimeout(function() {
      //     alert("login");
      //     if (self.ruleForm.type.length !== 0) {
      //       localStorage.username = self.ruleForm.name;
      //     }
      //   }, 1000);
      // }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.validate === this.identifyCode) {
            this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/checkInfo', {
              username: this.ruleForm.name,
              password: this.ruleForm.password
            })
            .then(res => {
              console.log(res);
              let data = res.data.data;
              let key = res.data.key;
              if (key == -1) {
                this.errorKey = true;
                this.errInfo = '该用户名不存在！'
              } else if (key == 0) {
                this.errorKey = true;
                this.errInfo = '密码错误'
              } else if (key == 1) {
                // let userInfo = {name: data.name, username: data.username, sessionId: data.sessionId};
                let userInfo = res.data;            
                // sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                this.getUserInfo(userInfo);
                this.hasLogin(true);
                if (this.ruleForm.type.length !== 0) {
                  localStorage.setItem('ms_username', this.ruleForm.name)
                }
                this.$router.push(`/home/allcourse/${this.grade}/${this.course}`);
              }
            })
            .catch(err => {
              console.log(err)
            }); 
          } else {
            this.errorKey = true;
            this.errInfo = '验证码输入不正确'
            this.refreshCode();
          }
        }
      });
    },
    handleCommand() {
      this.$router.push("/register");
    },
    inputLen() {
      if (this.len <= 17) {
        var i = this.len / 17 * 125;
        this.dot = -125 - i;
        this.eyeStyle.transform = `rotate(${this.dot}deg)`;
      } else {
        this.eyeStyle.transform = `rotate(${this.dot}deg)`;
      }
    },
    inputFocus(type) {
      if (type == "name") {
        this.eyeStyle.transform = `rotate(${this.dot}deg)`;
      } else if (type == "password") {
        this.eyeStyle.transform = `rotate(0deg)`;
      }
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    }
  },
  components: {
    Identify
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    width: 100%;
    height: 100%;

}
#Mycanvas {
    position: absolute;
    /* overflow: hidden; */
    z-index: -1;
    background-color: #eee;
}
.login-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: #eee; */
}
.move-area {
  width: 100px;
  height: 100px;
}
.container {
  width: 100%;
  text-align: center;
}
.eye {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background: #ccc;
}
.eye:after {
  position: absolute;
  bottom: 17px;
  right: 10px;
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 50%;
  content: " ";
}
.login-wrap .ms-login {
  box-sizing: border-box;
  width: 400px;
  /* height: 320px; */
  padding: 50px;
  padding-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}
.login-btn button {
  width: 100%;
}
.register {
  float: left;
  margin-top: 10px;
  cursor: pointer;
}
.login-remember {
  float: right;
}
.code {
  width: 111px;
  height: 38px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
</style>