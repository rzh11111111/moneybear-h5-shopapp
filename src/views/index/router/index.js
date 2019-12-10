// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

const routers = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },  {
            path: '/login',
            component: resolve => require(['../forget/login'], resolve),
            name: 'login'
        },{
            path: '/loginPromote',
            component: resolve => require(['../forget/loginPromote'], resolve),
            name: 'loginPromote'
        },
        {
            path: '/forgetpassword',
            component: resolve => require(['../forget/forgetpassword'], resolve),
            name: 'forgetpassword'
        },


    ]
})

export default routers
