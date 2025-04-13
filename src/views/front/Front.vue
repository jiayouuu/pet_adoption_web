<template>
  <div style="background-color:rgba(231,92,9,0.27);">
<!--    头部-->
    <div style="display: flex; background-color: #fff; height: 60px; line-height: 60px; border-bottom: 1px solid #eee">
      <div style="width: 240px; display: flex; padding-left: 30px">
        <div style="width: 60px">
          <img src="@/assets/images/public/logo.png" alt="" style="width: 40px; position: relative; top: 10px; right: 0">
        </div>
        <div style="flex: 1; font-size: 20px; color: #e75c09; font-weight: bold">萌宠在线</div>
      </div>
      <div style="flex: 1">
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/front/home">主页</el-menu-item>
          <el-menu-item index="/front/adopt">宠物领养</el-menu-item>
          <el-menu-item index="/front/salvation">宠物救助</el-menu-item>
          <el-menu-item index="/front/lost">宠物遗失</el-menu-item>
          <el-menu-item index="/front/article">宠物论坛</el-menu-item>
        </el-menu>
      </div>
      <div style="width: 160px">
        <div v-if="!user.email" style="text-align: right; padding-right: 30px">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown style="width: 150px; cursor: pointer; text-align: right">

            <div style="display: inline-block;margin-top: -20px;font-size: 18px;">
        <img :src="$store.state.baseApi+'/files/download/'+user.avatarUrl" alt=""
             style="width: 57px; border-radius: 10%; position: relative; top: 21px; right: 5px">
        <span>{{ user.nickname }}</span>
        <i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
      </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
              <el-dropdown-item style="font-size: 14px; padding: 5px 0" v-if="user.role === 'ROLE_ADMIN'">
                <router-link to="/home">后台管理</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/front/password">修改密码</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/front/person">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <span style="text-decoration: none" @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div style="width: 800px; margin: 0 auto">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$message.success("退出成功")
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
}
</script>

<style>
.item{
  display: inline-block;
  width: 100px;

  text-align: center;
  cursor: pointer
}
.item a {
  color: 	#1E90FF;
}
.item:hover{
  background-color: 	LightPink;
}
</style>
