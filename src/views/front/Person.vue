<template>
  <el-card style="min-height: calc(100vh - 80px); margin: 10px 0;">
    <el-form label-width="80px" >
      <upload 
      :url="form.avatarUrl"
      @handleMediaUrl="handleMediaUrl"/>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker clearable style="width: 100%" v-model="form.birth" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save"> 确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import upload from "@/components/Upload.vue";
import {Storage} from '@/utils/storage'
export default {
  name: "Person",
  components: {
    upload
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(this.$store.state.user.user))
    }
  },
  created() {
  },
  methods: {
    save() {
      this.request.post("/user", this.form).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功")

          // 触发父级更新User的方法
          // this.$emit("refreshUser")

          if(localStorage.getItem('token')){
            localStorage.setItem('token',res.data)
          }else{
            sessionStorage.setItem('token',res.data)
          }
          this.$store.commit('updateUser')
          
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleMediaUrl(res) {
      this.form.avatarUrl = res
    }
  }
}
</script>

<style>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>
