<!--
 * @Author: 桂佳囿
 * @Date: 2025-03-28 17:29:21
 * @LastEditors: 桂佳囿
 * @LastEditTime: 2025-04-13 18:50:20
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
    stompClient.subscribe(`/user/queue/private`, (response) => {
        console.log('收到点对点消息: ' + response.body);
        
    });
    // 订阅广播消息
    stompClient.subscribe('/topic/public', (response) => {
        console.log('收到广播消息: ' + response.body);
    });
    },
    beforeDestroy() {
        WebSocketService.disconnect()
    }
}
</script>
<style>
</style>
