<!--
 * @Author: 桂佳囿
 * @Date: 2024-01-10 13:54:20
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-26 01:52:01
 * @Description: 
-->
<template>
  <div class="wrapper">
    <div
      style="margin: 150px auto; background-color: #fff; width: 450px; height: 400px; padding: 20px; opacity: 0.8; border-radius: 10px;border: 0px solid grey">
      <div style="margin: 20px 0; text-align: center; font-size: 28px; color: rgb(64, 64, 64);">
        <img src="@/assets/images/public/logo.png"
          style="width: 30px;height: 30px;margin: 0 5px -5px 0;" />
        <b><span style="color: #e75c09">萌宠在线—注册</span></b>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" size="large" prefix-icon="el-icon-user"
            v-model="user.email" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="large" prefix-icon="el-icon-key" 
          show-password
            v-model="user.password" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="请确认密码" size="large" prefix-icon="el-icon-key" 
            show-password
            v-model="user.confirmPassword" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="custom-form-item">
          <el-input placeholder="请输入验证码" size="large" prefix-icon="el-icon-message" 
            v-model="user.code" style="font-size: 22px;">
          <template slot="append">
            <el-button :disabled="codeButtondisabled" @click="handleClick" >{{ codeButtonTxt }}</el-button>
          </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-direction: column;">
          <el-button type="primary" autocomplete="off" @click="register"> 注册</el-button>
          <div style="margin-top: 15px;text-align: end;">
            已有账号？<router-link :to="{path:'/login'}" class="link">立即登录</router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {},
      tempToken:'',
      codeButtonTxt:'获取验证码',
      codeButtondisabled:false,
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        password: [
          {validator: this.validatePassword,trigger: 'change'}
        ],
        confirmPassword: [
          {validator: this.validateConfrimPassword,trigger: 'change'}
        ],
        code: [
        { required: true, message: '请输入验证码', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    register() {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {  // 表单校验合法

          const  {code, data,msg} =await this.request.post('/public/validateEmailCode',{
            email: this.user.email,
            code: this.user.code
          },{
            headers: {Authorization: `Bearer ${this.tempToken}`}
          })
          if (code !==200) return this.$message.error(msg)
          const {token} =data;
          const { code:finalCode,msg:finalMsg } = await this.request.post("/user/register", this.user,{headers: {Authorization: `Bearer ${token}`}})
            if (finalCode === 200) {
              this.$message.success("注册成功")
            } else {
              this.$message.error(finalMsg)
            }
        }
      });
    },
    handleClick(){
      this.$refs['userForm'].validateField('email', (error) => {
        if (error) return
        else this.getCode()
        delete this.user.code
        this.codeButtondisabled = true
      })
    },
    async getCode(){
      const {code,data} = await this.request.get("/public/email/code", {
        params: {
          email: this.user.email
        }
      })
      if (code !== 200) {
        this.codeButtondisabled = false
        return this.$message.error("验证码发送失败") 
      }
      const {token} = data
      this.tempToken = token
      let count = 60
      const timer = setInterval(() => {
        this.codeButtonTxt = `${count}S`
        count--
        if (count < 0) {
          this.codeButtonTxt = '获取验证码'
          clearInterval(timer)
          this.codeButtondisabled = false
        }
      }, 1000)
    },
    validatePassword(rule, value, callback){
      // 正则表达式：6-20位，必须包含大小写字母和数字
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!passwordReg.test(value)) {
        callback(new Error('密码需为6-20位，且包含大小写字母和数字'))
      } else {
        callback()
      }
    },
    validateConfrimPassword(rule, value, callback){
      if (!this.user.password) {
        callback(new Error('请先输入密码，再确认密码'))
      }
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep .custom-form-item .el-button {
  width: 140px;
}
.link{
  &:hover{
    color: #679AD1;
    text-decoration: underline;
  }
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: #F4D5C6;
  /* background: url("../assets/background.jpg") center top / cover no-repeat; */
  overflow: hidden;
}
</style>
