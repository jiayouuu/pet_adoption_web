import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import {Storage} from '@/utils/storage.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPathName: '',
        baseApi: import.meta.env.VITE_BASE_URL,
        user:Storage.parseJWT() || {},
    },
    mutations: {
        setPath (state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        updateUser(state){
            state.user = Storage.parseJWT() || {}
        },
        logout() {
            // 清空缓存
            localStorage.removeItem("user")
            localStorage.removeItem("menus")
            router.push("/login")
            // 重置路由
        }

    }
})

export default store
