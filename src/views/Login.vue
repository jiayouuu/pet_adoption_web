<template>
  <div class="wrapper">
    <div
      style="margin: 150px auto; background-color: #fff; width: 450px; height: 400px; padding: 20px; opacity: 0.8; border-radius: 10px;border: 0px solid grey">
      <div style="margin: 20px 0; text-align: center; font-size: 28px; color: rgb(64, 64, 64);">
        <img src="@/assets/images/public/logo.png"
          style="width: 30px;height: 30px;margin: 0 5px -5px 0;" />
        <b><span style="color: #e75c09">萌宠在线—登录</span></b>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="email">
          <el-input size="large" prefix-icon="el-icon-user" v-model="user.email" placeholder="请输入邮箱" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" prefix-icon="el-icon-key" show-password v-model="user.password" placeholder="请输入密码" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input size="large" prefix-icon="el-icon-picture-outline-round" v-model="user.code"
          placeholder="请输入验证码"       style="font-size: 22px;">
            <template slot="append">
              <img :src="user.img" alt="验证码" @click="getCode" style="cursor: pointer;width: 100px;height: 40px;">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: center;">
          <el-checkbox v-model="user.remeber">记住我</el-checkbox>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-direction: column;">
        <el-button type="primary" autocomplete="off" @click="login"> 登录</el-button>
        <div style="margin-top: 15px;text-align: end;">
          还没有账号？<router-link :to="{path:'/register'}" class="link">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Storage } from '@/utils/storage.ts'
export default {
  name: "Login",
  data() {
    return {
      user: {},
      tempCode:'',
      rules: {
        email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 20, message: '长度在6到20个字符之间', trigger: 'change' }
        ],
        code: [
          {validator: this.validateCaptcha,trigger: 'change'}
        ],
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    login() {
      this.$refs['userForm'].validate(async(valid) => {
        if (valid) {  // 表单校验合法
          const {email,password} = this.user
          const {data}=await this.request.post("/user/login", {email,password})
          const {token} =data;
          Storage.setItem('token',token,Boolean(this.user.remeber))
          this.$store.commit('updateUser')
          this.$router.push("/front/home")
          this.$message.success("登录成功")
        }
      });
    },
    async getCode() {
      try {
        const {data}= await this.request.get("/public/imgCode")
        this.user ={...this.user,...data}
        this.tempCode = ''
        delete this.user.code
      } catch{
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return this.getCode()
      }
      
        
      
    },
    async validateCaptcha(rules,value,callback) {
      if(!value) return callback(new Error("请输入验证码"))
      if(value.length !==5) return callback(new Error("验证码长度为5位"))
      if(this.tempCode){
        if(value.toLocaleLowerCase() !== this.tempCode.toLocaleLowerCase()) return callback(new Error("验证码错误"))
        return callback()
      }
      try {
        await this.request.post("/public/validateImgCode",{
        id:this.user.id,
        code:this.user.code,
      })
      this.tempCode = value
      } catch (error) {
        return callback(new Error('验证码错误'))
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-input-group__append{
  padding: 0;
  background: unset;
  border: 0;
}
::v-deep .el-checkbox__label{
  font-size: 18px;
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
  /* background: thenurl("../assets/background.jpg") center top / cover no-repeat; */
  overflow: hidden;
}
</style>
