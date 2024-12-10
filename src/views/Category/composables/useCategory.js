//分类
import { getTopCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import { ref,onMounted } from 'vue'

export function useCategory(){
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async(id = route.params.id)=> { 
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.data.result
    }

    onMounted(()=>getCategory())

    //路由变化时将分类数据接口重新发送
    onBeforeRouteUpdate((to)=>{
    console.log("路由变化")
    getCategory(to.params.id)
    })
    return {
        categoryData
    }
}