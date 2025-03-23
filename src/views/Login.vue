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
          <el-input size="large" prefix-icon="iconfont icon-r-user1" v-model="user.username" style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" prefix-icon="iconfont icon-r-lock" show-password v-model="user.password"  style="font-size: 22px;"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="large" prefix-icon="iconfont icon-r-lock" show-password v-model="user.password"  style="font-size: 22px;"></el-input>
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
      pass: {},
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          this.request.post("/user/login", this.user).then(res => {
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
    handlePass() {
      this.dialogFormVisible = true
      this.pass = {}
    },
    passwordBack() {
      this.request.put("/user/reset", this.pass).then(res => {
        if (res.code === '200') {
          this.$message.success("重置密码成功，新密码为：123，请尽快修改密码")
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  /* background: url("../assets/background.jpg") center top / cover no-repeat; */
  overflow: hidden;
}
</style>
