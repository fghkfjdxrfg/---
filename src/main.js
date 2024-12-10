//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'

//懒加载插件
import { lazyPlugin } from './directives'
//引入全局组件
import { componentPlugin } from './components'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
//注册插件
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(lazyPlugin)
//app.use(ElementPlus)
app.use(componentPlugin)
app.mount('#app')

