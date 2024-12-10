///管理用户数据相关


import { defineStore } from "pinia";
import { loginAPI } from '@/apis/user';
import { ref } from "vue";
import { useCartStore } from "./cartStore";


export const useUserStore = defineStore('user',() => {
    const cartStore = useCartStore()
    //定义state
    const userInfo = ref({})
    //定义获取接口数据的action
    const getUserInfo = async({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.data.result
    }
    //退出时清除
    const clearUserInfo = ()=>{
        userInfo.value = {}
        cartStore.clearCart()
    }
    //返回
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true,
})