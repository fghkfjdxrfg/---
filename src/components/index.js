//全局化注册
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app){
        //使用app.进行插件开发
        //app.component(名字 配置)
        app.component('XtxImageView',ImageView)
        app.component('XtxSku',Sku)

    }
}