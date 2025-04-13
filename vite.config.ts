/*
 * @Author: 桂佳囿
 * @Date: 2025-03-28 17:17:04
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-04-14 01:47:00
 * @Description: 
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'
// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_PUBLIC_PATH,
    build:{
      outDir:'static'
    },
  plugins: [
    vue(),
  ],
  server: {
    port: 8000, // 设置开发服务器端口为 8080
    open: true, // 自动打开浏览器（可选）
    host: '0.0.0.0' // 允许外部访问（可选）
  },
  define: {
    global: 'globalThis', // 定义 global 为 globalThis
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ 指向 src 目录
    }
  }
  }
})
