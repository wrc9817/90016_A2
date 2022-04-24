import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/font/iconfont.css'
import 'hover.css'
import * as icons from '@element-plus/icons-vue'

import router from './router'
import {store} from './store/index'
import {
    initRouteGuard
} from './init/routeGuard'

function bootStrap(){
    const app = createApp(App)
    Object.keys(icons).forEach(key => {
        app.component(key, icons[key])
    })
    app.use(store)
    app.use(router)
    app.use(ElementPlus)
    app.mount('#app')
    initRouteGuard(router)
}
bootStrap()

