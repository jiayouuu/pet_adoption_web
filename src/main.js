/*
 * @Author: 桂佳囿
 * @Date: 2025-03-23 21:17:24
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-03-29 22:22:04
 * @Description: 
 */
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/gloable.scss'
import request from "@/utils/request";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: "mini" });

Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
