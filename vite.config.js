/*
 * @Author: 桂佳囿
 * @Date: 2025-03-28 17:17:04
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-28 17:46:17
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9000, // 设置开发服务器端口为 8080
    open: true, // 自动打开浏览器（可选）
    host: '0.0.0.0' // 允许外部访问（可选）
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ 指向 src 目录
    }
  }
})
