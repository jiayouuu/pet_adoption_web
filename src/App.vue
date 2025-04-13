<!--
 * @Author: 桂佳囿
 * @Date: 2025-03-28 17:29:21
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-04-13 22:10:43
 * @Description: 
-->
<template>
    <router-view/>
</template>
<script>
import {WebSocketService} from '@/utils/websocket'
export default {
    name: "App",
    data() {
        return {
            wsService: new WebSocketService()
        }
    },
   async mounted() {
    const stompClient = await this.wsService.connect();
    // 订阅点对点消息
    stompClient.subscribe(`/user/queue/private/notice`, (response) => {
        const data = JSON.parse(response.body);
        this.$notify({
          title: data.name,
          message: data.content,
          duration: 0
        });
        
    });
    // 订阅广播消息
    stompClient.subscribe('/topic/public/notice', (response) => {
        const data = JSON.parse(response.body);
        this.$notify({
          title: data.name,
          message: data.content,
          duration: 0
        });
    });
    },
    beforeDestroy() {
        WebSocketService.disconnect()
    }
}
</script>
<style>
</style>
