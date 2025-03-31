<template>
    <div class="upload-container">
      <!-- 上传区域 -->
      <div class="upload-box" @click="triggerFileInput">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*,video/*"
          style="display: none;"
        />
        <div v-if="!mediaUrl" class="upload-placeholder">
          <span v-if="uploading">{{ progress }}%</span>
          <span v-else class="plus-icon">+</span>
        </div>
  
        <!-- 回显区域 -->
        <div v-if="mediaUrl" class="preview-box">
          <img
            v-if="isImage"
            :src="mediaUrl"
            alt="Uploaded Media"
            class="preview-media"
            @click.stop="openFullScreen"
          />
          <video
            v-else
            :src="mediaUrl"
            class="preview-media"
            @click.stop="openFullScreen"
          ></video>
          <span class="remove-btn el-icon-remove" @click.stop="removeMedia"></span>
        </div>
      </div>
  
      <!-- 全屏预览 -->
      <div v-if="showFullScreen" class="fullscreen-overlay" @click="closeFullScreen">
        <img
          v-if="isImage"
          :src="mediaUrl"
          alt="Full Screen Media"
          class="fullscreen-media"
        />
        <video
          v-else
          :src="mediaUrl"
          controls
          autoplay
          class="fullscreen-media"
        ></video>
        <span class="close-btn el-icon-close" @click.stop="closeFullScreen"></span>
      </div>
    </div>
  </template>
  
  <script>
  import { FileUpload } from '@/utils/file.ts';
  
  export default {
    name: 'Upload',
    data() {
      return {
        uploading: false,
        progress: 0,
        mediaUrl: null,
        isImage: true,
        file: null,
        showFullScreen: false,
      };
    },
    props:{
        url:{
            type:String,
        },
    },
    created() {
        if(this.url){
            this.mediaUrl = `${import.meta.env.VITE_BASE_URL}/files/download/${this.url}`;
        }
    },
    methods: {
      // 触发文件输入框点击
      triggerFileInput() {
        if (!this.mediaUrl) {
          this.$refs.fileInput.click();
        }
      },
      // 处理文件选择
      handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;
        this.file = file;
        this.isImage = file.type.startsWith('image/');
        this.startUpload();
      },
      // 上传过程
      startUpload() {
        this.uploading = true;
        this.progress = 0;
        const uploader = new FileUpload(this.file, (process) => {
          this.progress = process;
          if (this.progress >= 100) {
            this.uploading = false;
          }
        });
        uploader.upload().then((res) => {
            this.mediaUrl = `${import.meta.env.VITE_BASE_URL}/files/download/${res}`;
            this.$emit('handleMediaUrl', res)
        });
      },
      // 删除已上传的媒体
      removeMedia() {
        this.mediaUrl = null;
        this.isImage = false;
        this.file = null;
        this.progress = 0;
        this.uploading = false;
        this.$emit('handleMediaUrl', '')

      },
      // 打开全屏预览
      openFullScreen() {
        this.showFullScreen = true;
      },
      // 关闭全屏预览
      closeFullScreen() {
        this.showFullScreen = false;
      },
    },
    beforeDestroy() {
      // 清理URL对象以防止内存泄漏
      if (this.mediaUrl) {
        URL.revokeObjectURL(this.mediaUrl);
      }
    },
  };
  </script>
  
  <style scoped>
  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .upload-box {
    width: 100px;
    height: 100px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    overflow: hidden; /* 确保内容不会溢出盒子 */
  }
  
  .upload-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .plus-icon {
    font-size: 40px;
    color: #ccc;
    font-weight: bold;
  }
  
  .preview-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .preview-media {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover; /* 确保图片和视频撑满盒子并保持比例 */
    object-position: center; /* 居中显示 */
  }
  
  .upload-box .remove-btn {
    display: none;
  }
  
  .upload-box:hover .remove-btn {
    display: block;
    position: absolute;
    top: -1px;
    right: -8px;
    color: red;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  /* 全屏预览样式 */
  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .fullscreen-media {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain; /* 全屏时保持比例 */
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }
  </style>