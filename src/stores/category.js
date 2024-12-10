import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout'

//导航列表数据
export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])
    //获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
  }
  return{
    categoryList,
    getCategory
  }

})
