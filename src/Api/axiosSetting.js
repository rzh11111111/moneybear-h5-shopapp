// import Vue from 'vue';
// import axios from 'axios';
import Config from '@/utils/config'
import local from '../store/localStorage'
import {Toast, Dialog} from 'vant';
import returnMsg from './returnMsg'
// import 'vant/lib/index.css'
/* 定义不同入口，跳转路径配置 index.js */
if (location.hostname === 'localhost') {
    // Vue.prototype.HTTPLOCAT = ''
    Vue.prototype.HTTPLOCAT = '/moneybear-h5-shopApp/dist'
} else {
    Vue.prototype.HTTPLOCAT = '' // （这个路径改为你服务器访问路径）
}
Vue.use(Toast);
let host = ''
if (process.env.NODE_ENV == 'development') { // 本地
    host = Config.devhost
    // host = "http://192.168.0.116:8080/"
} else if (process.env.NODE_ENV == 'production') {
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        host = Config.prohost
    } else if (process.env.VUE_APP_FLAG === 'sit') {
        //test 预发布
        host = Config.sithost

    } else if (process.env.VUE_APP_FLAG === 'test') {
        //test 测试
        host = Config.testhost
    }
}
let AxiosIns = axios.create({
    baseURL: host,
    timeout: 30000,
    ContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    // withCredentials: true // axios 默认不发送cookie，跨域也是一个原因，需要全局设置
})

let timer = [];
let delay = 300;
let loadingall=0; //loading总数
AxiosIns.interceptors.request.use(config => {
    // console.log(config);
    let token = local.$getLocalStorageByName('token')
    // console.log('token',token)
    if (token) {
        // config.headers = Object.assign({}, config.headers, {'Authorization': `Bearer ${getToken()}`});
        config.headers.token = token // 让每个请求携带token-- ['tokenId']为自定义key 请根据实际情况自行修改
    }
    // config.headers.tokenId = sessionStorage.$getSessionStorageByName('tokenId')
    if (navigator.onLine == false) {
        Toast('当前未连接网络，连接网络后请刷新页面')
    } else {
        if (config.showFullLoading !== 'close') {
            timer.push(setTimeout(() => {
                //添加菊花
                Toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration:0
                },delay);
            }))
            loadingall++
            // console.log(loadingall)
        }
        return config;
    }
}, function (error) {
    return Promise.reject(error);
});

AxiosIns.interceptors.response.use(response => {
    if (response.headers && response.headers.token) {
        local.$setLocalStorageByName('token', response.headers.token)
    }
    for (let t of timer) {
        clearTimeout(t);
    }
    // //请求结束 清除菊花

    loadingall--;
    if(loadingall<0){
        loadingall=0
    }
    // console.log(loadingall)
    setTimeout(()=>{ //避免同步执行的loading闪来闪去
        // console.log('deng',loadingall)
        if(loadingall==0) {  //避免异步执行的loading闪来闪去

            Toast.clear()
            if (response.data) {  //loading结束后再弹一次

                let resData = response
            const falsedata = [1, 11, 17, 11106, 80034, 10603, 10601, 60008, 11905,10626]
            if (falsedata.some(res => {
                if (resData.data.status === res) {
                    return res
                }
            })) {
                // return response
            } else {

                // Toast( returnMsg[resData.data.status])
                if (response.data.message) {
                    Toast(response.data.message)
                } else {
                    Toast(response.data.stateMessage)
                }

                // return response
            }
        }
        }
    },200)


    // Toast.clear();
    try {
        // console.log('aaaaa',response, Vue.prototype,window)
        if (response.data) {

            let resData = response
            // console.log(response)
            //11106不能修改资料
            //80034省区总合作商推广员是否绑定银行卡
            //10603用户名去重
            //10601店主是否绑卡
            const falsedata = [11106, 80034, 10603, 10601,60008,11905]
            if (resData.data.status !== 1) {
                // 15150597200
                if (resData.data.status === 11) {
                    Dialog.alert({
                        title: '提示',
                        message: '账号登录失效，请重新登录'
                    }).then(() => {
                        sessionStorage.removeItem('id')
                        sessionStorage.removeItem('accountName')
                        sessionStorage.removeItem('accountType')
                        // sessionStorage.removeItem('isEnable')
                        // sessionStorage.removeItem('status')
                        local.$removeLocalStorageByName('token')
                        local.$removeLocalStorageByName('accountName')
                        local.$removeLocalStorageByName('accountType')
                        local.$removeLocalStorageByName('code')
                        local.$removeLocalStorageByName('id')
                        window.location.href = Vue.prototype.HTTPLOCAT + '/index.html#/login'
                    }).catch(() => {

                    });
                    return resData

                } else if (resData.data.status === 17) { //
                    Toast(response.data.stateMessage)
                    return response.data
                } else if (falsedata.some(res => {
                    if (resData.data.status === res) {
                        return res
                    }
                })) {
                    return response
                }else {

                    // Toast( returnMsg[resData.data.status])
                    if (response.data.message) {
                        Toast(response.data.message)
                    } else {
                        Toast(response.data.stateMessage)
                    }

                    return response
                }

            }
            return resData
            /**
             * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
             * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
             */
            //     if (res.code !== 20000) {
            //       Message({
            //         message: res.message,
            //         type: 'error',
            //         duration: 5 * 1000
            //       });
            //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //           confirmButtonText: '重新登录',
            //           cancelButtonText: '取消',
            //           type: 'warning'
            //         }).then(() => {
            //           store.dispatch('FedLogOut').then(() => {
            //             location.reload();// 为了重新实例化vue-router对象 避免bug
            //           });
            //         })
            //       }
            //       return Promise.reject('error');
            //     }
        }
    } catch (error) {
        console.log(error)
    }
}, (error) => {
    for (let t of timer) {
        clearTimeout(t);
    }
    //关闭菊花
    loadingall=0;
    // if(loadingall==0){
        Toast.clear();
        Toast('可能无网络或网络信号不稳定！')
    // }
    // setTimeout(()=>{  //避免同步执行的loading闪来闪去
    //     console.log('deng',loadingall)
    //     if(loadingall==0){  //避免异步执行的loading闪来闪去
    //
    //         Toast.clear()
    //         Toast('可能无网络或网络信号不稳定！')
    //     }
    // },200)
    try {
        // console.log('222', error.response, error)
        if (error.response) {
            // Toast.clear();
            if (error && error.response) {
                switch (error.response.status) {
                    case 11:
                        // console.log('3333')
                        Toast('请登录！');
                        break
                    case 400:
                        Toast('请求错误！');
                        break
                    // case 401:
                    //     Toast({
                    //         mes: '登录失效,请重新登录！',
                    //         timeout: 1000
                    //     });
                    case 403:
                        Toast('拒绝访问！');
                        break
                    case 404:
                        Toast(`请求地址出错: ${error.response.config.url}`);
                        break
                    case 500:
                        Toast('服务器内部错误！');
                        break
                    default:
                }
            }
            return error
        }
    } catch (e) {
        // Toast(e);
    }
    return Promise.reject(error);
})
export default AxiosIns;
