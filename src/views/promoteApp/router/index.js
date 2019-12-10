// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

const routers = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/prohome'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/prohome',
            component: resolve => require(['@pageProm/Home/home'], resolve),
            name: 'prohome'
        ,
            meta: {
                keepAlive: false
            }},
        {  //详情页
            path: '/PromotersListDetail',
            component: resolve => require(['@pageProm/PromotersList/PromotersListDetail/PromotersListDetail'], resolve),
            name: 'PromotersListDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/PopularizeDetail',
            component: resolve => require(['@pageProm/PromotersList/PromotersListDetail/PopularizeDetail'], resolve),
            name: 'PopularizeDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/BossDetail',
            component: resolve => require(['@pageProm/PromotersList/PromotersListDetail/BossDetail'], resolve),
            name: 'BossDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/StoreDetail',
            component: resolve => require(['@pageProm/PromotersList/PromotersListDetail/StoreDetail'], resolve),
            name: 'StoreDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/LocalDetail',
            component: resolve => require(['@pageProm/PromotersList/PromotersListDetail/LocalDetail'], resolve),
            name: 'LocalDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/MasterDetail',
            component: resolve => require(['@pageProm/PromotersList/MasterDetail/MasterDetail'], resolve),
            name: 'MasterDetail'
        ,
            meta: {
                keepAlive: false
            }},
        { // 我的设置
            path: '/Set',
            component: resolve => require(['@pageProm/set/set'], resolve),
            name: 'Set'
        ,
            meta: {
                keepAlive: false
            }},
        { // 店主的设置
            path: '/SetStore',
            component: resolve => require(['@pageProm/set/setStore'], resolve),
            name: 'SetStore'
        ,
            meta: {
                keepAlive: false
            }},
        { // 绑定银行卡
            path: '/BindCard',
            component: resolve => require(['@pageProm/set/bindCard'], resolve),
            name: 'BindCard'
        ,
            meta: {
                keepAlive: false
            }},
        { // 消息
            path: '/Message',
            component: resolve => require(['@pageProm/Message/Message'], resolve),
            name: 'Message'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/MessageDetail',
            component: resolve => require(['@pageProm/Message/MessageDetail'], resolve),
            name: 'MessageDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/MessageList',
            component: resolve => require(['@pageProm/Message/MessageList'], resolve),
            name: 'MessageList'
        ,
            meta: {
                keepAlive: false
            }},
        { // 列表
            path: '/PromotersList',
            component: resolve => require(['@pageProm/PromotersList/PromotersList'], resolve),
            name: 'PromotersList'
        ,
            meta: {
                keepAlive: false
            }},

        {
            path: '/AddTogether',
            component: resolve => require(['@pageProm/PromotersList/add/AddTogether/AddTogether'], resolve),
            name: 'AddTogether'
        ,
            meta: {
                keepAlive: false
            }},

        {
            path: '/AddLocal',
            component: resolve => require(['@pageProm/PromotersList/add/AddLocal/AddLocal'], resolve),
            name: 'AddLocal'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/AddLocalFirst',
             component: resolve => require(['@pageProm/PromotersList/add/AddLocal/AddLocalFirst'], resolve),
            name: 'AddLocalFirst'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/AddPopularize',
             component: resolve => require(['@pageProm/PromotersList/add/AddPopularize/AddPopularize'], resolve),
            name: 'AddPopularize'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/AddSeed',
            component: resolve => require(['@pageProm/PromotersList/add/AddSeed/AddSeed'], resolve),
            name: 'AddSeed',
            meta: {
                keepAlive: false // 需要被缓存
            }
        },
        { // 修改数据
            path: '/ChangeTogether',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeTogether'], resolve),
            name: 'ChangeTogether',
            meta: {
                keepAlive: false
            }
         },
        {
            path: '/ChangePopularize',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangePopularize'], resolve),
            name: 'ChangePopularize'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeStore',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeStore'], resolve),
            name: 'ChangeStore'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeLocal',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeLocal'], resolve),
            name: 'ChangeLocal'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeMaster',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeMaster'], resolve),
            name: 'ChangeMaster'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeMasterList',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeMasterList'], resolve),
            name: 'ChangeMasterList'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeMasterDetail',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeMasterDetail'], resolve),
            name: 'ChangeMasterDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeList',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeList'], resolve),
            name: 'ChangeList'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ChangeDetail',
            component: resolve => require(['@pageProm/PromotersList/ChangeData/ChangeDetail'], resolve),
            name: 'ChangeDetail'
        ,
            meta: {
                keepAlive: false
            }},
        { // 收益
            path: '/Money',
            component: resolve => require(['@pageProm/Money/Money'], resolve),
            name: 'Money'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/GetMoney',
            component: resolve => require(['@pageProm/Money/GetMoney/GetMoney'], resolve),
            name: 'GetMoney'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/MoneyRecord',
            component: resolve => require(['@pageProm/Money/MoneyRecord/MoneyRecord'], resolve),
            name: 'MoneyRecord'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/GetMoneyRecord',
            component: resolve => require(['@pageProm/Money/GetMoneyRecord/GetMoneyRecord'], resolve),
            name: 'GetMoneyRecord'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/MoneyDetail',
            component: resolve => require(['@pageProm/Money/MoneyDetail/MoneyDetail'], resolve),
            name: 'MoneyDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/GetMoneyDetail',
            component: resolve => require(['@pageProm/Money/MoneyDetail/GetMoneyDetail'], resolve),
            name: 'GetMoneyDetail'
        ,
            meta: {
                keepAlive: false
            }},

        {
            path: '/Collect',
            component: resolve => require(['@pageProm/Money/Collect/Collect'], resolve),
            name: 'Collect'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/MoneyThin',
            component: resolve => require(['@pageProm/Money/MoneyThin/MoneyThin'], resolve),
            name: 'MoneyThin'
        ,
            meta: {
                keepAlive: false
            }},
        { // 审批
            path: '/Examine',
            component: resolve => require(['@pageProm/Examine/Examine'], resolve),
            name: 'Examine'
        ,
            meta: {
                keepAlive: false
            }},

        {
            path: '/FirstLocalList',
            component: resolve => require(['@pageProm/Examine/FirstLocalList/FirstLocalList'], resolve),
            name: 'FirstLocalList'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/FirstLocalDetail',
            component: resolve => require(['@pageProm/Examine/FirstLocalDetail/FirstLocalDetail'], resolve),
            name: 'FirstLocalDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ApprovalList',
            component: resolve => require(['@pageProm/Examine/ApprovalList/ApprovalList'], resolve),
            name: 'ApprovalList'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ApprovalDetail',
            component: resolve => require(['@pageProm/Examine/ApprovalDetail/ApprovalDetail'], resolve),
            name: 'ApprovalDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/AuditList',
            component: resolve => require(['@pageProm/Examine/AuditList/AuditList'], resolve),
            name: 'AuditList'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/AuditDetail',
            component: resolve => require(['@pageProm/Examine/AuditDetail/AuditDetail'], resolve),
            name: 'AuditDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ApprovalRecord',
            component: resolve => require(['@pageProm/Examine/ApprovalRecord/ApprovalRecord'], resolve),
            name: 'ApprovalRecord'
        ,
            meta: {
                keepAlive: false
            }},
        // 合作商-同城企业入驻审核列表
        {
            path: '/PartnerCityList',
            component: resolve => require(['@pageProm/Examine/PartnerCityList/PartnerCityList'], resolve),
            name: 'PartnerCityList'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/PartnerCityDetail',
            component: resolve => require(['@pageProm/Examine/PartnerCityDetail/PartnerCityDetail'], resolve),
            name: 'PartnerCityDetail'
        ,
            meta: {
                keepAlive: false
            }},
        // 待我审核资料变更审核详情
        {
            path: '/DataChangesDetail',
            component: resolve => require(['@pageProm/Examine/DataChangesDetail/DataChangesDetail'], resolve),
            name: 'DataChangesDetail'
        ,
            meta: {
                keepAlive: false
            }},
        // 合作商资料变更审核详情
        {
            path: '/PartnerChangesDetail',
            component: resolve => require(['@pageProm/Examine/PartnerChangesDetail/PartnerChangesDetail'], resolve),
            name: 'PartnerChangesDetail'
        ,
            meta: {
                keepAlive: false
            }},
        // 推广员资料变更审核详情
        {
            path: '/PromotersChangesDetail',
            component: resolve => require(['@pageProm/Examine/PromotersChangesDetail/PromotersChangesDetail'], resolve),
            name: 'PromotersChangesDetail'
        ,
            meta: {
                keepAlive: false
            }},
        // 推广员详情
        {
            path: '/PromotersDetail',
            component: resolve => require(['@pageProm/Examine/PromotersDetail/PromotersDetail'], resolve),
            name: 'PromotersDetail'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/ApplyResult',
            component: resolve => require(['@pageProm/ApplyResult/ApplyResult'], resolve),
            name: 'ApplyResult'
        ,
            meta: {
                keepAlive: false
            }},
        // 待我审核
        {
            path: '/WaitReviewList',
            component: resolve => require(['@pageProm/Examine/WaitReviewList/WaitReviewList'], resolve),
            name: 'WaitReviewList'
        ,
            meta: {
                keepAlive: false
            }},
        // 二级页面
        {
            path: '/onoff',
            component: resolve => require(['@pageProm/Examine/SubPage/onoff'], resolve),
            name: 'onoff'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/changes',
            component: resolve => require(['@pageProm/Examine/SubPage/changes'], resolve),
            name: 'changes'
        ,
            meta: {
                keepAlive: false
            }},
        {
            path: '/enter',
            component: resolve => require(['@pageProm/Examine/SubPage/enter'], resolve),
            name: 'enter'
        ,
            meta: {
                keepAlive: false
            }},
        // 草稿箱
        {
            path: '/Draft',
            component: resolve => require(['@pageProm/Draft/Draft'], resolve),
            name: 'Draft'
        ,
            meta: {
                keepAlive: false
            }},
        { //选择城市
            path: '/chooseCity',
            component: resolve => require(['@pageProm/PromotersList/add/chooseCity/chooseCity'], resolve),
            name: 'chooseCity'
        ,
            meta: {
                keepAlive: false
            }
            },
        { //搜索
            path: '/searchCity',
            component: resolve => require(['@pageProm/PromotersList/add/chooseCity/searchCity'], resolve),
            name: 'searchCity'
            ,
            meta: {
                keepAlive: false
            }
        },
        // 商户老板资料审核详情
        {
            path: '/StoreaccountDetail',
            component: resolve => require(['@pageProm/Examine/StoreaccountDetail/StoreaccountDetail'], resolve),
            name: 'StoreaccountDetail'
        },
        { //我的分享
            path: '/share',
            component: resolve => require(['@pageProm/share/share'], resolve),
            name: 'share'
        },
        { //店铺合同
            path: '/storehetong',
            component: resolve => require(['@pageProm/PromotersList/storehetong'], resolve),
            name: 'storehetong'
        },
        { //店铺签合同
            path: '/historyhetong',
            component: resolve => require(['@pageProm/PromotersList/storehetong/historyhetong'], resolve),
            name: 'historyhetong'
        },
        { //修改合同
            path: '/changehetong',
            component: resolve => require(['@pageProm/PromotersList/storehetong/changehetong'], resolve),
            name: 'changehetong'
        },
        { //修改合同审核
            path: '/changecontract',
            component: resolve => require(['@pageProm/Examine/ChangeContract'], resolve),
            name: 'changecontract'
        },
    ]
})

export default routers
