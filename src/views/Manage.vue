<!--
 * @Author: 桂佳囿
 * @Date: 2024-01-10 13:54:20
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-04-13 23:08:24
 * @Description: 
-->
<template>
  <el-container style="min-height: 100vh">

    <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc;">
        <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse" :user="user" />
      </el-header>

      <el-main>
        <router-view />
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

import Aside from "@/components/manage/Aside.vue";
import Header from "@/components/manage/Header.vue";

export default {
  name: 'Home',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
    }
  },
  components: {
    Aside,
    Header
  },
  created() {
  },
  methods: {
    collapse() {  // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
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
   
</style>

