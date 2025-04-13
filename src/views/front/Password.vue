<!--
 * @Author: 桂佳囿
 * @Date: 2024-01-10 13:54:20
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-04-13 20:39:19
 * @Description: 
-->
<template>
    <el-card style="min-height: calc(100vh - 80px); margin: 10px 0;">
      <el-form label-width="100px"  :model="form" :rules="rules" ref="pass">
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
          placeholder="请输入新密码"
          v-model="form.newPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input 
          placeholder="请再次输入新密码"
          v-model="form.confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="code">
          <el-input placeholder="请输入验证码"
            v-model="form.code">
          <template slot="append">
            <el-button :disabled="codeButtondisabled" @click="getCode" >{{ codeButtonTxt }}</el-button>
          </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save"> 确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      form: {},
      tempToken:'',
      codeButtonTxt:'获取验证码',
      codeButtondisabled:false,
      user: this.$store.state.user,
      rules: {
        newPassword: [
          {required: true,validator: this.validatePassword,trigger: 'change'}
        ],
        confirmPassword: [
          {required: true,validator: this.validateConfrimPassword,trigger: 'change'}
        ],
        code: [
        { required: true, message: '请输入验证码', trigger: 'change' },
        ],
      }
    }
  },
  created() {
  },
  methods: {
    async getCode(){
      delete this.user.code
      this.codeButtondisabled = true
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
      if (!this.form.newPassword) {
        callback(new Error('请先输入密码，再确认密码'))
      }
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    save() {
      this.$refs.pass.validate(async (valid) => {
        if (!valid) return
        const  {code, msg} =await this.request.post('/public/validateEmailCode',{
            email: this.user.email,
            code: this.form.code
          },{
            headers: {Authorization: `Bearer ${this.tempToken}`}
          })
          if (code !==200) return
          const { code:updateCode }=await this.request.post("/user/password", this.form)
            if (updateCode === 200) {
              this.$message.success("修改成功")
              this.$store.dispatch("logout")
            }
      })
    },
  }
}
</script>

<style>

</style>
