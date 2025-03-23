<template>
  <div class="not-found">
    <el-row type="flex" justify="center" align="middle" class="container">
      <el-col :span="24" class="content">
        <i class="el-icon-sunny icon-404"></i>
        <h1 class="title">404</h1>
        <p class="subtitle">Oops! 页面走丢了...</p>
        <p class="description">你访问的页面不存在，或者已经被移除。</p>
        <el-button type="warning" @click="goHome">返回首页</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.push('/'); // 跳转到首页
    }
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  background-color: #F4D5C6; // 暖色背景，浅橙色
  .container {
    height: 100%;
  }
  .content {
    text-align: center;
    .icon-404 {
      font-size: 120px;
      color: #ff9900; // 暖橙色
      margin-bottom: 20px;
    }
    .title {
      font-size: 80px;
      color: #ff6600; // 深橙色
      margin: 0;
      font-weight: bold;
    }
    .subtitle {
      font-size: 24px;
      color: #cc5200; // 暖棕色
      margin: 20px 0;
    }
    .description {
      font-size: 16px;
      color: #e68a00; // 中等橙色
      margin-bottom: 30px;
    }
  }
}
</style>