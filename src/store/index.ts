import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import {Storage} from '@/utils/storage'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPathName: '',
        baseApi: import.meta.env.VITE_BASE_URL,
        user: Storage.parseJWT() || {},
    },
    mutations: {
        setPath (state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        updateUser(state) {
            state.user = Storage.parseJWT() || {}
        }
    },
    actions: {
        logout({ commit }) {
            // 清空缓存
            Storage.clear()
            // 调用 updateUser mutation
            commit('updateUser')
            // 重置路由
            router.push("/login")
        },
    }
})

export default store