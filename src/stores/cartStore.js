import { calendarEmits } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI,findNewCartListAPI,delCartAPI } from "@/apis/cart";



export const useCartStore = defineStore('cart',()=>{
    const userStore = useUserStore()
    const isLogin = computed(()=>userStore.userInfo.token)
    //定义state
    const cartList = ref([])
    //定义方法
    //抽象一个
    const updateNewList = async()=>{
        const res = await findNewCartListAPI()
        cartList.value = res.data.result
    }
    const addCart = async(goods)=>{
        const {skuId,count} = goods
        if(isLogin.value){
            //已登录
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
            //未登录
             //添加
            //判断购物车里是否已添加过
            const item = cartList.value.find((item)=>goods.skuId === item.skuId)
            if(item){
                item.count++
            }
            else{
                cartList.value.push(goods)
            }
        }
    }
    const delCart = async(skuId)=>{
        if(isLogin.value){
            //调用接口
            await delCartAPI([skuId])
            updateNewList()

        }else{
        //splice
        const idx = cartList.value.findIndex((item)=>skuId === item.skuId)
        cartList.value.splice(idx,1)
        }
    }
    const clearCart = ()=>{
        cartList.value = []
    }
    const singleCheck = (skuId,selected)=>{
        const item = cartList.value.find((item)=>item.skuId===skuId)
        item.selected = selected
    }
    const allCheck =(selected)=>{
        cartList.value.forEach(item=>item.selected = selected)
    }

    //计算
    const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
    const isAll = computed(()=> cartList.value.every((item)=>item.selected))
    const selectCount = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectPrice = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))

    
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectCount,
        selectPrice,
        updateNewList,
        clearCart,
        addCart,
        delCart,
        singleCheck,
        allCheck
    }
},{
    persist:true
})