// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

const routers = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/shophome'
        },
        {
            path: '/shophome',
            component: resolve => require(['@pageShop/Home/home'], resolve),
            name: 'shophome'
        },
        {
            path: '/SetStore',
            component: resolve => require(['@pageShop/MyDetail/setStore'], resolve),
            name: 'SetStore'
        },
        {
            path: '/MasterDetail',
            component: resolve => require(['@pageShop/MyDetail/MasterDetail'], resolve),
            name: 'MasterDetail'
        },
        {
            path: '/ChangeStore',
            component: resolve => require(['@pageShop/MyDetail/ChangeStore'], resolve),
            name: 'ChangeStore'
        },
        {
            path: '/ChangeMaster',
            component: resolve => require(['@pageShop/MyDetail/ChangeMaster'], resolve),
            name: 'ChangeMaster'
        },
   
        {
            path: '/forgetpassword',
            component: resolve => require(['@pageShop/MyDetail/forgetpassword'], resolve),
            name: 'forgetpassword'
        },
        {// 店铺管理
            path: '/ShopManagement',
            component: resolve => require(['@pageShop/ShopManagement/ShopManagement'], resolve),
            name: 'ShopManagement'
        },
        {
            path: '/ShopBasic',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/ShopBasic'], resolve),
            name: 'ShopBasic'
        },
        { //店铺营业时间
            path: '/ShopTime',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/ShopTime'], resolve),
            name: 'ShopTime'
        },
        { //添加店铺营业时间
            path: '/addTimes',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/addTimes'], resolve),
            name: 'addTimes'
        },
        {
            path: '/BindCard',
            component: resolve => require(['@pageShop/ShopManagement/BindCard/bindCard'], resolve),
            name: 'BindCard'
        },

        // {
        //     path: '/ShopInvoice',
        //     component: resolve => require(['@pageShop/ShopInvoice/ShopInvoice'], resolve),
        //     name: 'ShopInvoice'
        // },
        {// 评价管理
            path: '/EvaluateManagement',
            component: resolve => require(['@pageShop/evaluateManagement/evaluateManagement'], resolve),
            name: 'EvaluateManagement'
        },
        {// 订单管理
            path: '/OrderManagement',
            component: resolve => require(['@pageShop/OrderManagement/OrderManagement'], resolve),
            name: 'OrderManagement'
        },
        {
            path: '/searchOrderList',
            component: resolve => require(['@pageShop/OrderManagement/OrderDetails/searchOrderList'], resolve),
            name: 'searchOrderList'
        }, {
            path: '/OrderDetails',
            component: resolve => require(['@pageShop/OrderManagement/OrderDetails/OrderDetails'], resolve),
            name: 'OrderDetails'
        },

        {  //店铺资产
            path: '/Money',
            component: resolve => require(['@pageShop/Money/Money'], resolve),
            name: 'Money'
        },
        {
            path: '/Collect',
            component: resolve => require(['@pageShop/Money/Collect/Collect'], resolve),
            name: 'Collect'
        },
        {
            path: '/MoneyThin',
            component: resolve => require(['@pageShop/Money/MoneyThin/MoneyThin'], resolve),
            name: 'MoneyThin'
        },
        {
            path: '/GetMoney',
            component: resolve => require(['@pageShop/Money/GetMoney/GetMoney'], resolve),
            name: 'GetMoney'
        },
        {
            path: '/GetMoneyRecord',
            component: resolve => require(['@pageShop/Money/GetMoneyRecord/GetMoneyRecord'], resolve),
            name: 'GetMoneyRecord'
        },
        {
            path: '/GetMoneyDetail',
            component: resolve => require(['@pageShop/Money/MoneyDetail/GetMoneyDetail'], resolve),
            name: 'GetMoneyDetail'
        },
        {
            path: '/MoneyThinDetail',
            component: resolve => require(['@pageShop/Money/MoneyDetail/MoneyThinDetail'], resolve),
            name: 'MoneyThinDetail'
        },
        {  //发票详情
            path: '/InvoiceDetail',
            component: resolve => require(['@pageShop/Money/Invoice/InvoiceDetail'], resolve),
            name: 'InvoiceDetail'
        },
        {  //发票列表
            path: '/InvoiceList',
            component: resolve => require(['@pageShop/Money/Invoice/InvoiceList'], resolve),
            name: 'InvoiceList'
        },
        {  //开票信息
            path: '/InvoiceInfo',
            component: resolve => require(['@pageShop/Money/Invoice/InvoiceInfo'], resolve),
            name: 'InvoiceInfo'
        },
        {  //编辑开票信息
            path: '/ChangeInvoiceInfo',
            component: resolve => require(['@pageShop/Money/Invoice/ChangeInvoiceInfo'], resolve),
            name: 'ChangeInvoiceInfo'
        },
        { // 消息
            path: '/Message',
            component: resolve => require(['@pageShop/Message/Message'], resolve),
            name: 'Message'
        },
        {
            path: '/MessageDetail',
            component: resolve => require(['@pageShop/Message/MessageDetail'], resolve),
            name: 'MessageDetail'
        },
        {
            path: '/MessageList',
            component: resolve => require(['@pageShop/Message/MessageList'], resolve),
            name: 'MessageList'
        },
        {
            path: '/ApplyResult',
            component: resolve => require(['@pageShop/ApplyResult/ApplyResult'], resolve),
            name: 'ApplyResult'
        },
        {
            path: '/ShopChangeDetail',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/ShopChangeDetail'], resolve),
            name: 'ShopChangeDetail'
        },
        {
            path: '/ShopChangeList',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/ShopChangeList'], resolve),
            name: 'ShopChangeList'
        },
        {
            path: '/ChangeMasterDetail',
            component: resolve => require(['@pageShop/MyDetail/ChangeMasterDetail'], resolve),
            name: 'ChangeMasterDetail'
        },
        {
            path: '/ChangeMasterList',
            component: resolve => require(['@pageShop/MyDetail/ChangeMasterList'], resolve),
            name: 'ChangeMasterList'
        },
        { //选择城市
            path: '/chooseCity',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/chooseCity/chooseCity'], resolve),
            name: 'chooseCity'

        },
        { //搜索
            path: '/searchCity',
            component: resolve => require(['@pageShop/ShopManagement/ShopBasic/chooseCity/searchCity'], resolve),
            name: 'searchCity'
        },
        { //绑定会员
            path: '/bind',
            component: resolve => require(['@pageShop/share/bind'], resolve),
            name: 'bind'
        },
        { //我的分享
            path: '/share',
            component: resolve => require(['@pageShop/share/share'], resolve),
            name: 'share'
        },
        { //宣传页
            path: '/public',
            component: resolve => require(['@pageShop/share/public'], resolve),
            name: 'public'
        },
        { //宣传页
            path: '/qrCode',
            component: resolve => require(['@pageShop/qrCode/qrCode'], resolve),
            name: 'qrCode'
        },
        { //签署合同
            path: '/contract',
            component: resolve => require(['@pageShop/ShopManagement/contract'], resolve),
            name: 'contract'
        },
        { //推广欢迎
            path: '/promoteHello',
            component: resolve => require(['@pageShop/promoteHello'], resolve),
            name: 'promoteHello'
        },
        { //店铺合同
            path: '/storecontract',
            component: resolve => require(['@pageShop/ShopManagement/contract/contract'], resolve),
            name: 'storecontract'
        },
        { //添加店铺合同
            path: '/addcontract',
            component: resolve => require(['@pageShop/ShopManagement/contract/addcontract'], resolve),
            name: 'addcontract'
        },
        { //查看店铺合同
            path: '/storehetong',
            component: resolve => require(['@pageShop/ShopManagement/contract/storehetong'], resolve),
            name: 'storehetong'
        },
        // { //商品首页
        //     path: '/Commodity',
        //     component: resolve => require(['@pageShop/Commodity/Commodity/index'], resolve),
        //     name: 'Commodity',
        // },
        // {   //菜单设置
        //     path: '/SetMenu',
        //     component: resolve => require(['@pageShop/Commodity/SetMenu'], resolve),
        //     name: 'SetMenu',
        // },
        // {   //菜单设置
        //     path: '/SetMenu/AddMenu',
        //     component: resolve => require(['@pageShop/Commodity/AddMenu'], resolve),
        //     name: 'AddMenu',
        // },
        // {
        //     path: '/Commodity/addGoods',
        //     component: resolve => require(['@pageShop/Commodity/addGoods'], resolve),
        //     name: 'addGoods',
        // },
        // {
        //     path: '/Commodity/addService',
        //     component: resolve => require(['@pageShop/Commodity/addGoods'], resolve),
        //     name: 'addService',
        // },
        // {
        //     path: '/Commodity/addMeal',
        //     component: resolve => require(['@pageShop/Commodity/addMeal'], resolve),
        //     name: 'addMeal',
        // },
        // {
        //     path: '/Commodity/chooseMealCom',
        //     component: resolve => require(['@pageShop/Commodity/chooseMealCom'], resolve),
        //     name: 'chooseMealCom',
        // },
        



    ]
})

export default routers
