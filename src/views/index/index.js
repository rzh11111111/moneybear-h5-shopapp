// import Vue from 'vue'
import App from './index.vue'
// import {Button,Dialog,Toast} from 'vant'
// import 'vant/lib/index.css'
import Api from '@/Api' // Vue全局使用Api
import store from '../../store'
import router from './router'
import localStorage from '../../store/localStorage'
import sessionStorage from '../../store/sessionStorage'
import '@/icons'
Vue.config.productionTip = false
// Vue.use(Button)
Vue.config.productionTip = false
Vue.prototype.Api = Api.testApi
Vue.prototype.local = localStorage // Vue全局使用localStorage
Vue.prototype.session = sessionStorage // Vue全局使用sessionStorage
/* 定义不同入口，跳转路径配置 index.js */
if (location.hostname === 'localhost') {
    // Vue.prototype.HTTPLOCAT = ''
    Vue.prototype.HTTPLOCAT = '/moneybear-h5-shopApp/dist'
} else {
    Vue.prototype.HTTPLOCAT = '' // （这个路径改为你服务器访问路径）
}

router.onError((callback)=>{

        location.reload()


})
/* eslint-disable no-new */
import topColumn from '@/components/topColumn/topColumn'
Vue.component('topColumn',topColumn)
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

