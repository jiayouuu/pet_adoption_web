<!--
 * @Author: 桂佳囿
 * @Date: 2024-01-10 13:54:20
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-25 01:00:34
 * @Description: 
-->
<template>
  <div class="wrapper">
    <div
      style="margin: 150px auto; background-color: #fff; width: 400px; height: 380px; padding: 20px;opacity: 0.95; border-radius: 10px;  border-radius: 10px;border: 1px solid grey">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注册新账号</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" size="large" prefix-icon="el-icon-user"
            v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="large" prefix-icon="el-icon-key" 
          show-password
            v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="请确认密码" size="large" prefix-icon="el-icon-key" 
            show-password
            v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" size="large" prefix-icon="el-icon-message" 
            v-model="user.code">
          <template slot="append">
            <el-button :disabled="codeButtondisabled" @click="handleClick">{{ codeButtonTxt }}</el-button>
          </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin: 5px 0; text-align: right">
          <el-button type="primary" autocomplete="off" @click="register"> 注册</el-button>
          <el-button type="warning" autocomplete="off" @click="$router.push('/login')"> 返回登录</el-button>
        </el-form-item>
      </el-form>
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

          const  {code, data,msg} =await this.request.post('/api/public/validateEmailCode',{
            email: this.user.email,
            code: this.user.code
          },{
            headers: {Authorization: `Bearer ${this.tempToken}`}
          })
          if (code !==200) return this.$message.error(msg)
          const {token} =data;
          const { code:finalCode } = await this.request.post("/user/register", this.user,{headers: {Authorization: `Bearer ${token}`}})
            if (finalCode === 200) {
              this.$message.success("注册成功")
            } else {
              this.$message.error('注册失败')
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
      const {code,data} = await this.request.get("/api/public/email/code", {
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
::v-deep .el-button {
  width: 100px;
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
}</style>
