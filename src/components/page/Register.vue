<template>
  <div class="register">
    <canvas id="Mycanvas"></canvas>
    <div class="r-content">
      <div class="title">{{title}}</div>
      <div class="r-main">
        <el-form v-if="key" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <div v-if="errorKey">
            <span style="color: red">{{errInfo}}</span>
          </div>
          <el-form-item label="用户姓名" prop="name">
            <el-input type="usrname" v-model="ruleForm.name" :placeholder="placeh.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号邮箱" prop="useremail">
            <el-input type="text" v-model="ruleForm.useremail" :placeholder="placeh.useremail" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" :placeholder="placeh.pass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" :placeholder="placeh.checkPass"></el-input>
          </el-form-item>
          <el-form-item prop="birth" label="出生日期">
            <el-col :span="24">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
            </el-col>
				  </el-form-item>
          <!-- <el-form-item> -->
            <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;" :loading="loadingKey">{{registerText}}</el-button>
          <!-- </el-form-item> -->
        </el-form>
        <div class="registersuc" v-else="!key">
          <img src="../../assets/image/face.png" style="width: 100px; height: 100px">
          <div class="suc-text">注册成功!</div>
          <el-button type="primary" size="medium" style="width: 100%" @click="goLogin()">点击登录</el-button>
        </div>
      </div>
    </div>
    <div class="r-foot" v-show="key">
      已有账号？<span @click="handleCommand">登录</span>
    </div>
  </div>
</template>


<script>
import {bgcanvas} from '../common/bgcanvas'
import Util from '../common/utils';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'));
      } else if (!Util.passReg.test(this.ruleForm.pass)) {
        callback(new Error('请输入不少于6位字母数字组合'));
      } else {
        if(this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!Util.emailReg.test(this.ruleForm.useremail)){
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    return {
      registerText: '注册',
      loadingKey: false,
      title: '注册趣学，更快乐地去学',
      errorKey: false,
      errInfo: '',
      key: true,
      ruleForm: {
        name: '',
        useremail: '',
        pass: '',
        checkPass: '',
        birth: ''
      },
      placeh: {
        name: '请输入真实姓名',
        useremail: '输入邮箱地址作为登录账号',
        pass: '请输入密码',
        checkPass: '请确认密码',
        birth: '请选择出生日期'
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        useremail: [
          {  required: true, validator: validateEmail, trigger: 'blur'}
        ],
        pass: [
          {  required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          {  required: true, validator: validatePass2, trigger: 'blur' }
        ],
        birth: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingKey = true;
          this.registerText = '注册中';
          let data = {
            name: this.ruleForm.name,
            username: this.ruleForm.useremail,
            password: this.ruleForm.pass,
            birth: this.ruleForm.birth
          }
          this.$http.post('https://www.easy-mock.com/mock/5afa75091483315259546162/login/checkInfo', data)
          .then(res => {
            let key = res.data.data.key;
            if (key == -1) {
              this.errorKey = true;
              this.errInfo = '该用户名已被注册'
            } else if (key == 1) {
              this.key = false;
            }
          })
        }
      })
    },
    goLogin() {
      this.$router.push("/login");
    },
    handleCommand() {
      this.$router.push('/login');
    }
  },
  mounted() {
    bgcanvas('Mycanvas');
  }
}
</script>

<style scoped>
  .register {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #Mycanvas {
    position: absolute;
    z-index: -1;
    background-color: #eee;
  }
  .r-content {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    width: 400px;
    border: 1px solid #fff;
    border-radius: 2px; 
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
  }
  .title {
    width: 100%;
    height: 40px;
    font-size: 22px;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    color: #0084ff;
    margin-bottom: 20px;
  }
  .r-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 40px;
  }
  .registersuc {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .registersuc .suc-text {
    font-size: 20px;
    color: red;
    font-weight: 600;
    margin: 10px 0;
  }
  .r-foot {
    width: 400px;
    height: 50px;
    background-color: #f6f6f6;
    border-top: 1px solid #ebebeb;
    color: #000; 
    text-align: center;
    line-height: 50px;
  }
  .r-foot span {
    color: #175199;
    cursor: pointer;
  }
</style>

