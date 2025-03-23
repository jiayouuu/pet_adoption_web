<template>
  <div class="wrapper">
    <div
      style="margin: 150px auto; background-color: #fff; width: 450px; height: 300px; padding: 20px; opacity: 0.8; border-radius: 10px;border: 0px solid grey">
      <div style="margin: 20px 0; text-align: center; font-size: 28px; color: rgb(64, 64, 64);">
        <img src="@/assets/images/public/logo.png"
          style="width: 30px;height: 30px;margin: 0 5px -5px 0;" />
        <b><span style="color: #e75c09">萌宠在线</span></b>
      </div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input size="large" prefix-icon="el-icon-user" v-model="user.username" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" prefix-icon="el-icon-key" show-password v-model="user.password"  style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input size="large" prefix-icon="el-icon-picture-outline-round" v-model="user.captcha"  style="font-size: 22px;">
            <template slot="append">
              <img :src="captchaImg" alt="验证码" @click="getCaptcha" style="cursor: pointer;width: 100px;height: 40px;">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: center">
          <el-button type="warning" autocomplete="off" @click="$router.push('/register')"> 注册</el-button>
          <el-button type="primary" autocomplete="off" @click="login"> 登录</el-button>
        </el-form-item>

      </el-form>
    </div>



  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      user: {},
      captchaImg: "",
      captchaId:"",
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符之间', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          this.request.post("/user/login", {...this.user,captchaId:this.captchaId}).then(res => {
            if (res.code === '200') {
              localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
              localStorage.setItem("menus", JSON.stringify(res.data.menus))  // 存储用户信息到浏览器
              this.$router.push("/front/home")
              this.$message.success("登录成功")
            } else {
              this.$message.error(res.msg)
            }
          }).catch(e => {
            console.log(e);
            if (
              e.response == undefined ||
              e.response.data == undefined
            ) {
              this.$message({
                showClose: true,
                message: e,
                type: "error",
                duration: 5000,
              });
            } else {
              this.$message({
                showClose: true,
                message: e.response.data,
                type: "error",
                duration: 5000,
              });
            }

          })
        }
      });
    },
    async getCaptcha() {
      const {data,code}= await this.request.get("api/public/imgCode")
      if(code !==200) {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        this.getCaptcha()
      }
      const {img,id}=data;
      this.captchaImg = img;
      this.captchaId=id;
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
