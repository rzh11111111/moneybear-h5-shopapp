// import Vue from 'vue'
import App from './index.vue'
// import 'vant/lib/index.css'
import Api from '@/Api' // Vue全局使用Api
import store from '../../store'
import router from './router'
import localStorage from '../../store/localStorage'
import sessionStorage from '../../store/sessionStorage'

import 'swiper/dist/css/swiper.css'
import '@/icons'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as shopTestApi from "../../Api/shopTest";
// Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
// Vue.use(Vant)
// Vue.use(Toast)
Vue.config.productionTip = false
Vue.prototype.Api = Api.testApi
Vue.prototype.shopApi = Api.shopTestApi
Vue.prototype.local = localStorage // Vue全局使用localStorage
Vue.prototype.session = sessionStorage // Vue全局使用sessionStorage
/* 定义不同入口，跳转路径配置 index.js */
if (location.hostname === 'localhost') {
    // Vue.prototype.HTTPLOCAT = ''
    Vue.prototype.HTTPLOCAT = '/moneybear-h5-shopApp/dist'
} else {
    Vue.prototype.HTTPLOCAT = '' // （这个路径改为你服务器访问路径）
}
// import BaiduMap from 'vue-baidu-map'
Vue.use(VueBaiduMap.default, {
    ak: 'NPVSI03uvffV6MmG7WH6SoVA71EvjzN1' // 这个地方是官方提供的ak密钥
})
import VeeValidate, {
    Validator
} from 'vee-validate' // 表单验证
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import {
    Dialog,
    Toast
} from "vant";
const formatFileSize = function (size) {
    let units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let threshold = 1024
    size = Number(size) * threshold
    let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold))
    return (((size / Math.pow(threshold, i)).toFixed(2) * 1) + ' ' + (units[i]))
}
// Vue.use(VeeValidate, {events: 'blur'})
const config = {
    delay: 100,
    locale: 'zh_CN',
    events: 'blur',
};
Vue.use(VeeValidate, config)
const fieldName = '' // 原来的i18n的fieldName会显示绑定的name值，就是英文，实际项目中不需要
Validator.localize('zh_CN', {
    name: 'zh_CN',
    attributes: {},
    messages: {
        _default: () => `${fieldName}无效`,
        after: (field, [target]) => `${fieldName}必须在${target}之后`,
        alpha_dash: () => `${fieldName}能够包含字母数字字符、破折号和下划线`,
        alpha_num: () => `${fieldName}只能包含字母数字字符`,
        alpha_spaces: () => `${fieldName}只能包含字母字符和空格`,
        alpha: () => `${fieldName}只能包含字母字符`,
        before: (field, [target]) => `${fieldName}必须在${target}之前`,
        between: (field, [min, max]) => `${fieldName}必须在${min}与${max}之间`,
        confirmed: (field, [confirmedField, label, label2]) => {
            let text = label || confirmedField;
            let text2 = label2 || fieldName;
            return `${text2}和${text}不一致`;
        },
        credit_card: () => `${fieldName}格式错误`,
        date_between: (field, [min, max]) => `${fieldName}必须在${min}和${max}之间`,
        date_format: (field, [format]) => `${fieldName}必须符合${format}格式`,
        decimal: (field, [decimals = '*'] = []) => `${fieldName}必须是数字，且能够保留${decimals === '*' ? '' : decimals}位小数`,
        digits: (field, [length]) => `${fieldName}必须是数字，且精确到${length}位数`,
        dimensions: (field, [width, height]) => `${fieldName}必须在${width}像素与${height}像素之间`,
        email: () => `${fieldName}不是一个有效的邮箱`,
        ext: () => `${fieldName}不是一个有效的文件`,
        image: () => `${fieldName}不是一张有效的图片`,
        included: () => `${fieldName}不是一个有效值`,
        integer: () => `${fieldName}必须是整数`,
        ip: () => `${fieldName}不是一个有效的地址`,
        length: (field, [length, max]) => {
            if (max) {
                return `${fieldName}长度必须在${length}到${max}之间`
            }
            return `${fieldName}长度必须为${length}`
        },
        max: (field, [length]) => `${fieldName}不能超过${length}个字符`,
        max_value: (field, [max]) => `${fieldName}必须小于或等于${max}`,
        mimes: () => `${fieldName}不是一个有效的文件类型`,
        min: (field, [length]) => `${fieldName}必须至少有${length}个字符`,
        min_value: (field, [min]) => `${fieldName}必须大于或等于${min}`,
        excluded: () => `${fieldName}不是一个有效值`,
        numeric: (field, [label]) => `${label || fieldName}只能包含数字字符`,
        regex: () => `${fieldName}格式无效`,
        required: (field, [label]) => `${label || fieldName}不能为空`,
        size: (field, [size]) => `${fieldName}必须小于${formatFileSize(size)}`,
        url: () => `${fieldName}不是一个有效的url`
    }
})
//自定义规则
Validator.extend('password', {
    getMessage: field => `${fieldName}必须为6~32个字符，数字、字母、特殊符号( . _ - @ )至少两种组合`,
    validate: value => {
        return value.length >= 6 && value.length <= 32 && /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[_|\-|\.|@]$)^[\w|\-|\.|@]{6,32}$/.test(value);
    }
})
Validator.extend('idcard', {
    getMessage: (field) => `身份证格式不正确(如果有X则必须为大写)`,
    validate: (value) => {
        return /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(value);
    }
})
Validator.extend('mobile', {
    getMessage: (field) => `手机号格式不正确`,
    validate: (value) => {
        return /^\d{11}$/.test(value);
    }
})
Validator.extend('txlphone', {
    validate: value => {
        return value.length == 11 && /^[1](([3][0-9])|([4][5,7,9])|([5][^4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/.test(value);
    },
    getMessage: (field) => '手机号格式不正确'
})
Validator.extend('bccode', {
    validate: value => {
        return /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(value);
    },
    getMessage: (field) => '营业执照号格式不正确'
})

router.onError((callback) => {
    Toast('版本更新中,请重新登录')
    window.location.href = Vue.prototype.HTTPLOCAT + '/shopApp.html?time=' + ((new Date()).getTime());

})
// import ElementUI from 'element-ui' // 饿了么ui，之后换按需
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
// import { Tree } from 'element-ui' // 饿了么ui，之后换按需
// Vue.use(Tree)
/* eslint-disable no-new */
import topColumn from '@/components/topColumn/topColumn'
Vue.component('topColumn',topColumn)
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
