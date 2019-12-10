## Run 开发 



## 技术栈

vue2 + vuex + vue-router + vuecli3 + webpack + ES6/7 + axios + vant + sass + svg + vee-validate(表单验证)

## 项目运行
注意：由于涉及大量的ES6/7等新属性，node需要8.0以上版本
```bash
    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install -g cnpm -registry=https://registry.npm.taobao.org
    # 本地开发 开启服务
    # develop
    npm run dev

    浏览器访问  http://host:prot 
```
## 项目结构(2019.8.5)
```
├─public
└─src                                    // 源码目录
    ├─Api                                // 公共接口
    ├─assets                             // 公共图片
    │  ├─img
    │  │  ├─bank                         // 银行图标
    │  │  ├─detail                       // 推广列表页图片
    │  │  ├─example                      // 添加示例
    │  │  ├─index                        // 小图标
    │  │  └─storehome                    // 商户首页图标
    │  └─style                           // 公共样式
    ├─components            
    │  ├─addimg                          // 添加图片（查看，大图展示）
    │  ├─chooseArea                      // 选择地区
    │  ├─chooseBrand                     // 选择品牌
    │  ├─chooseCategory                  // 饿了么树状结构选择
    │  ├─choosecity                      // 选择城市
    │  ├─chooseMenus                     // 选择所属菜单
    │  ├─createFirst                     // 添加最后一步
    │  ├─example                         // 查看示例
    │  ├─gobackSave                      // 添加放弃保存
    │  ├─mapp                            // 地图
    │  ├─startEndTime                    // 开始结束时间
    │  ├─storeAddress                    // 店铺地址
    │  ├─topBars                         // 商户订单头部
    │  ├─topColumn                       // 通用头部
    │  ├─uploadImg
    │  └─imageCropper                    // 图片裁剪
    ├─icons
    │  └─svg                             // svg图片
    ├─store
    │  └─modules                         // vuex，缓存
    ├─utils
    │  ├─config.js                       // 端口配置（devhost：你连得地址）
    │  └─index.js                        // 公共方法
    └─views
        ├─download                       ** 分享下载
        │  └─img
        ├─index                          ** 首页
        │  ├─forget
        |  |  ├─login.vue                // 登录页  
        │  │  └─forgetpassword.vue       // 忘记密码   
        │  └─router
        ├─promoteApp                     ** 推广端
        │  ├─pageProm
        │  │  ├─ApplyResult              // 结果页
        │  │  ├─Draft                    // 草稿箱
        │  │  ├─Examine                  // 审核中心
        │  │  │  ├─ApprovalDetail        // 合作商入驻审批
        │  │  │  ├─ApprovalList          // 合作商入驻审核列表
        │  │  │  ├─ApprovalRecord        // 待我审核-审核记录
        │  │  │  ├─AuditDetail           // 商户入驻审核详情
        │  │  │  ├─AuditList             // 推广员，我推广的同城入驻审核列
        │  │  │  |                          合作商，推广员资料变更审核列表
        │  │  │  ├─DataChangesDetail     // 商户资料变更审核详情
        │  │  │  ├─FirstLocalDetail      // 预推广同城详情
        │  │  │  ├─FirstLocalList        // 预推广同城列表
        │  │  │  ├─PartnerChangesDetail  // 合作商资料变更审核详情
        │  │  │  ├─PartnerCityDetail     // 同城入驻审核详情
        │  │  │  ├─PartnerCityList       // 同城入驻审核列表
        │  │  │  ├─PromotersChangesDetail// 推广员资料变更审核详情
        │  │  │  ├─PromotersDetail       // 推广员入住审核
        │  │  │  ├─StoreaccountDetail    // 商户老板资料变更审核详情
        │  │  │  ├─SubPage               
        │  │  │  │  ├─changes.vue        // 合作商推广员资料变更审核
        │  │  │  │  ├─enter.vue          // 合作商推广员资料变更审核
        │  │  │  │  └─onoff.vue          // 待我审核
        │  │  │  └─WaitReviewList        // 待我审核-商户入驻，商户资料变更
        │  │  ├─Home                     // 首页
        │  │  ├─Message                  // 消息
        │  │  ├─Money                    // 收益
        │  │  │  ├─Collect               // 收益统计
        │  │  │  ├─GetMoney              // 提现
        │  │  │  ├─GetMoneyRecord        // 提现记录
        │  │  │  ├─MoneyDetail           // 提现详情，分账单详情
        │  │  │  ├─MoneyRecord           // 收益分账单记录
        │  │  │  └─MoneyThin             // 余额明细
        │  │  ├─PromotersList            // 合作商，推广员，店铺，同城列表
        │  │  │  ├─add                   
        │  │  │  │  ├─AddLocal           // 添加同城
        │  │  │  │  ├─AddPopularize      // 添加推广员
        │  │  │  │  ├─AddSeed            // 添加店铺
        │  │  │  │  ├─AddTogether        // 添加合作商
        │  │  │  │  └─chooseCity         // 添加店铺选择地址
        │  │  │  ├─ChangeData
        │  │  │  │  ├─ChangeDetail.vue   // 
        │  │  │  │  ├─ChangeList.vue     // 
        │  │  │  │  ├─ChangeLocal.vue    // 修改，查看同城资料
        │  │  │  │  ├─ChangeMaster.vue   // 修改，查看店主资料
        │  │  │  │  ├─ChangeMasterDetail.vue    // 
        │  │  │  │  ├─ChangeMasterList.vue      // 
        │  │  │  │  ├─ChangePopularize.vue      // 修改，查看推广员资料
        │  │  │  │  ├─ChangeStore.vue    // 修改，查看店铺资料
        │  │  │  │  └─ChangeTogether.vue // 修改，查看合作商资料
        │  │  │  ├─MasterDetail          // 店主详情
        │  │  │  └─PromotersListDetail
        │  │  │  │  ├─BossDetail.vue     // 省区总详情
        │  │  │  │  ├─LocalDetail.vue    // 同城详情
        │  │  │  │  ├─PopularizeDetail.vue      // 推广员详情
        │  │  │  │  ├─PromotersListDetail.vue   // 合作商详情
        │  │  │  │  └─StoreDetail.vue    // 店铺详情
        │  │  ├─set
        │  │  │  ├─bindCard.vue          // 绑卡
        │  │  │  ├─set.vue               // 设置
        │  │  │  └─setStore.vue          // 店主设置
        │  │  └─share                    // 分享会员
        │  └─router                      // 路由
        └─shopApp                        ** 商户端
            ├─pageShop
            │  ├─ApplyResult             // 结果页
            │  ├─Commodity               // 商品
            │  │  └─Commodity            // 商品列表
            │  │     ├─Comb.vue          // 组合菜单
            │  │     ├─Commodity.vue     // 商品菜单
            │  │     ├─Commoditylist.vue // 商品菜单一个排序的列表
            │  │     ├─index.vue         // 所有列表
            │  │     └─Service.vue       // 服务菜单
            │  ├─evaluateManagement      // 评价管理
            │  ├─Home                    // 首页
            │  ├─Message                 // 消息
            │  ├─Money                   // 收益
            │  │  ├─Collect
            │  │  ├─GetMoney
            │  │  ├─GetMoneyRecord
            │  │  ├─MoneyDetail
            │  │  ├─MoneyRecord
            │  │  └─MoneyThin
            │  ├─MyDetail                // 店主详情
            │  ├─OrderManagement         // 订单管理
            │  │  └─OrderDetails         // 订单详情
            │  ├─share                   // 我的分享
            │  └─ShopManagement          // 店铺详情
            │      ├─BindCard            // 绑卡
            │      └─ShopBasic           // 修改店铺资料
            │          └─chooseCity      // 选择地区
            └─router

```
## 使用的缓存
session Storage:
code:登录信息
id:登录信息
accountType:店主（0），推广员（1），合作商（2），省区总（3）
accountName:登录者名字
member:绑定会员
## Build 发布
```bash
    # 发布预发布环境
    npm run sit
    
    # 发布测试环境
    npm run test
    
    # 构建生成环境
    npm run build
```
