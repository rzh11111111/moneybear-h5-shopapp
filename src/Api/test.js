import {axiosGet, axiosPost} from './baseApi'
// import Config from '../utils/config'
import qs from 'qs'

// mock接口
// 登录
// export const loginByUsername = (params, config) => axiosPost('/sys/login', params, config)

// 获取用户信息
export const getUserInfo = (params, config) => axiosPost('/sys/index', qs.stringify(params), config)

/** ************************** 首页 ****************************/

// 真实接口
    //上传图片
export const upload = (params, config) => axiosPost('/merchant/api/file/config/upload', params, config)

/** ************************** 商户端 ****************************/
// 登录
export const loginByStore = (params, config) => axiosPost('/store/api/login/in', qs.stringify(params), config)
// 退出
export const outByStore = (params, config) => axiosGet('/store/api/login/out', qs.stringify(params), config)
//未登录修改密码获取验证码
export const getMsg = (params, config) => axiosGet('/store/api/login/send/code/by/username', params, config)
// 创建种子店验证码
export const loginByStoreMsg = (params, config) => axiosPost('/store/api/login/send/msg', qs.stringify(params), config)
// 商户老板修改密码获取验证码
export const loginShopByStoreMsg = (params, config) => axiosPost('/store/api/login/send/password/msg', qs.stringify(params), config)
// 商户老板修改手机获取验证码
export const sendNewPhone = (params, config) => axiosPost('/store/api/login/send/new/phone', qs.stringify(params), config)
// 修改密码
export const loginByStorePwd = (params, config) => axiosPost('/store/api/login/update/pwd', qs.stringify(params), config)
//修改商户绑定手机
export const changeMasterPhone = (params, config) => axiosPost('/store/api/login/updatephone', qs.stringify(params), config)
//修改商户邮箱
export const changeMasterEmail = (params, config) => axiosPost('/store/api/login/updateemail', qs.stringify(params), config)
//修改密码检测验证码（新）
export const examineCode = (params, config) => axiosPost('/store/api/login/update/pwd/check/verifyCode', qs.stringify(params), config)
//修改密码（新）
export const examineChange = (params, config) => axiosPost('/store/api/login/update/pwd/new', qs.stringify(params), config)




// 店铺详情
export const storedetails = (params, config) => axiosPost('/merchant/api/st/store/storedetails', qs.stringify(params), config)
// 店铺提交审批
export const storeupdate = (params, config) => axiosPost('/merchant/Api/st/store/update', params, config)
//更新店铺（审批）
export const storeupdateapprove = (params, config) => axiosPost('/merchant/api/st/store/updateapprove', params, config)
//修改商户老板前的判断
export const changeFirstStore = (params, config) => axiosPost('/merchant/api/st/store/account/isapprovalexisit', params, config)
//修改店铺前的判断
export const changeFirstStore2 = (params, config) => axiosPost('/merchant/api/st/store/isapprovalexisit', qs.stringify(params), config)

//修改商户老板
export const changeMaster = (params, config) => axiosPost('/merchant/api/st/store/account/update/storeaccount/information', params, config)
//修改商户老板的店铺列表
export const storeList2 = (params, config) => axiosPost('/merchant/api/st/store/list', params, config)


/** ************************** 推广端 ****************************/
// 登录
export const loginByMerchant = (params, config) => axiosPost('/merchant/api/login/login/in', qs.stringify(params), config)
// 修改密码获取验证码
export const loginByMerchantMsg = (params, config) => axiosPost('/merchant/api/login/login/send/msg', qs.stringify(params), config)
// 修改密码
export const loginBymMerchantPwd = (params, config) => axiosPost('/merchant/api/login/login/update/pwd', qs.stringify(params), config)
//退出登录
export const loginExit = (params, config) => axiosPost('/merchant/api/login/login/out', qs.stringify(params), config)
// 首页
export const getinfomation = (params, config) => axiosPost('/merchant/api/mer/manager/bankroll/account/record/count', params, config)
//店主首页
export const getinfomation2 = (params, config) => axiosPost('/merchant/api/st/store/account/bankroll/account/record/count', params, config)

/** ************************** 消息 ****************************/
//未读消息
export const notReadMessage = (params, config) => axiosPost('/merchant/api/sm/message/other/record/count/read', params, config)
//店主未读消息
export const notReadMessage2 = (params, config) => axiosPost('/store/api/sm/message/store/account/record/count/read', params, config)
//平台消息
export const noticeMessage = (params, config) => axiosPost('/merchant/api/sm/message/other/record/select/notice', params, config)
//店主平台消息
export const noticeMessage2 = (params, config) => axiosPost('/store/api/sm/message/store/account/record/select/notice', params, config)
//审核消息
export const messageMessage = (params, config) => axiosPost('/merchant/api/sm/message/other/record/select/message', params, config)
//店主审核消息
export const messageMessage2 = (params, config) => axiosPost('/store/api/sm/message/store/account/record/select/message', params, config)
//删除消息
export const deleteMessage = (params, config) => axiosPost('/merchant/api/sm/message/other/record/delete',qs.stringify(params), config)
//删除店老板消息
export const deleteMessage2 = (params, config) => axiosPost('/store/api/sm/message/store/account/record/delete',qs.stringify(params), config)
//标记已读
export const readMessage = (params, config) => axiosPost('/merchant/api/sm/message/other/record/read', qs.stringify(params), config)
//全部已读
export const readMessageAll = (params, config) => axiosPost('/merchant/api/sm/message/other/record/all/read', qs.stringify(params), config)
//全部已读店主
export const readMessageAll2 = (params, config) => axiosPost('/store/api/sm/message/store/account/record/all/read', qs.stringify(params), config)
//消息详情
export const detailMessage = (params, config) => axiosPost('/merchant/api/sm/message/other/record/get', qs.stringify(params), config)


/** ************************** 详情 ****************************/
export const togetherDetail = (params, config) => axiosPost('/merchant/api/mer/manager/get/cooperation', qs.stringify(params), config)
export const bossDetail = (params, config) => axiosPost('/merchant/api/mer/manager/get/region/boss', qs.stringify(params), config)
export const popularizeDetail = (params, config) => axiosPost('/merchant/api/mer/manager/get/spread', qs.stringify(params), config)
export const storeDetail = (params, config) => axiosPost('/merchant/api/st/store/storedetails', qs.stringify(params), config)
export const localDetail = (params, config) => axiosPost('/merchant/api/cs/shop/select',qs.stringify(params), config)
export const localDetail2 = (params, config) => axiosPost('/merchant/api/cs/shop/city/clue/select',qs.stringify(params), config)
export const masterDetail = (params, config) => axiosPost('/merchant/api/st/store/account/getaccount', qs.stringify(params), config)


//统计下辖推广员，商户，企业数量
export const togetherUnder = (params, config) => axiosPost('/merchant/api/mer/manager/count/by/cooperation', params, config)
//统计下辖商户，企业数量
export const popularizeUnder = (params, config) => axiosPost('/merchant/api/mer/manager/count/by/spread', params, config)

/** ************************** 修改密码 ****************************/
//修改省合推密码
export const changeTogetherPassword = (params, config) => axiosPost('/merchant/api/mer/manager/update/manager/password', params, config)
//修改省合推修改密码 -> 发送手机验证码
export const sendCodePassword = (params, config) => axiosPost('store/api/login/send/password/msg', qs.stringify(params), config)
//修改省合推绑定手机
export const changeTogetherPhone = (params, config) => axiosPost('/merchant/api/mer/manager/update/manager/phone', params, config)
//修改省合推绑定手机 -> 发送手机验证码
export const sendCodePhone = (params, config) => axiosPost('/merchant/api/login/login/update/phone/send/msg', qs.stringify(params), config)
//修改省合推邮箱
export const changeTogetherEmail = (params, config) => axiosPost('/merchant/api/mer/manager/update/manager/email', params, config)

/** ************************** 修改资料 ****************************/
//修改合作商
export const changeTogether = (params, config) => axiosPost('/merchant/api/mer/manager/update/manager/cooperation', params, config)
//修改推广员
export const changePopularize = (params, config) => axiosPost('/merchant/api/mer/manager/update/manager/spread', params, config)
//修改合作商推广员前的判断
export const changeFirst = (params, config) => axiosPost('/merchant/api/mer/manager/get/manager/del/flag', params, config)

//修改预添加同城
export const changeLocal2 = (params, config) => axiosPost('/merchant/api/cs/shop/city/clue/update', params, config)


/** ************************** 银行卡 ****************************/
//获取账号银行卡
export const getCardDetail = (params, config) => axiosPost('/merchant/api/mer/manager/bank/card/find', qs.stringify(params), config)
//获取店主银行卡
export const getCardstore = (params, config) => axiosPost('/merchant/api/st/store/bankcard/page', params, config)

//绑定银行卡
export const saveCard = (params, config) => axiosPost('/merchant/api/mer/manager/bank/card/save', params, config)
//绑定店主银行卡
export const saveStoreCard = (params, config) => axiosPost('/merchant/api/st/store/bankcard/save', params, config)
//绑卡获取验证码
export const saveCardmsg = (params, config) => axiosPost('/merchant/api/mer/manager/bank/card/send/bank/msg', qs.stringify(params), config)
//绑卡获取验证码店主
export const saveStoreCardmsg = (params, config) => axiosPost('/merchant/api/st/store/bankcard/send/four/msg',  qs.stringify(params), config)

//修改绑定店主银行卡
export const changeStoreCard = (params, config) => axiosPost('/merchant/api/st/store/bankcard/update', params, config)
//修改绑定银行卡
export const changeCard = (params, config) => axiosPost('/merchant/api/mer/manager/bank/card/update', params, config)
//获取银行卡详情

//解除店主绑卡
export const deleteCard2 = (params, config) => axiosPost('/merchant/api/st/store/bankcard/delete/bankcard', params, config)
//解除绑卡
export const deleteCard = (params, config) => axiosPost('/merchant/api/mer/manager/bank/card/delete', qs.stringify(params), config)



/*******列表******/
// 辖区列表
export const dutyArea = (params, config) => axiosPost('/merchant/api/mer/manager/find/manager/dutyArea', params, config)
//店主辖区
export const dutyArea0 = (params, config) => axiosPost('/merchant/api/st/store/account/getaccount/dutyareas', params, config)
//全国辖区
export const allArea = (params, config) => axiosPost('/merchant/api/sys/area/config/page', params, config)
//被占辖区
export const dutyAreaBe = (params, config) => axiosPost('/merchant/api/mer/manager/find/manager/seized/dutyArea', params, config)
//被占辖区(不包括自己)，在修改的时候用
export const dutyAreaBeNo = (params, config) => axiosPost('/merchant/api/mer/manager/find/manager/seized/dutyArea/no/myself', params, config)

// 合作商列表
export const togetherList = (params, config) => axiosPost('/merchant/api/mer/manager/page/cooperations', params, config)
//推广员列表
export const popularizeList = (params, config) => axiosPost('/merchant/api/mer/manager/page/spreads', params, config)
//种子，特色商户列表
export const storeList = (params, config) => axiosPost('/merchant/api/st/store/page', params, config)
// 同城同城企业列表
export const localList = (params, config) => axiosPost('/merchant/api/cs/shop/find/shoplist', params, config)
// 预添加同城同城企业列表
export const localList2 = (params, config) => axiosPost('/merchant/api/cs/shop/city/clue/list', params, config)



/******添加*****/
// 添加合作商
export const addTogether = (params, config) => axiosPost('/merchant/api/mer/manager/save/cooperation', params, config)
// 添加推广员
export const addPopularize = (params, config) => axiosPost('/merchant/api/mer/manager/save/spread', params, config)
//添加合作商推广员账号是否重复
export const togetherUser = (params, config) => axiosPost('/merchant/api/mer/manager/check/username/exist', qs.stringify(params), config)

// 添加种子特色店
export const addStoreEnter = (params, config) => axiosPost('/merchant/api/st/store/merchantstoreenter', params, config)
// 添加种子特色店店铺分类
export const storeInside = (params, config) => axiosPost('/merchant/api/st/store/category/inside/list', params, config)
// 查询子级分类列表
export const storeInsideParent = (params, config) => axiosPost('/merchant/api/st/store/category/inside/list/parent', params, config)

// 判断种子特色用户名是否重复
export const storeUser = (params, config) => axiosPost('/merchant/api/st/store/account/username', qs.stringify(params), config)
//判断种子特色身份证是否重复
export const storeIdcard = (params, config) => axiosPost('/merchant/api/st/store/account/findByParam', params, config)
//判断种子特色营业执照号是否重复
export const storeBcCode = (params, config) => axiosPost('/merchant/api/st/store/find/by/bcCode', params, config)

//添加同城
export const addLocal = (params, config) => axiosPost('/merchant/api/cs/shop/city/add', params, config)
// 判断同城店铺名是否重复
export const localNickName = (params, config) => axiosPost('/merchant/api/cs/shop/nickname/exist', qs.stringify(params), config)

// 判断同城用户名是否重复
export const localUser = (params, config) => axiosPost('/merchant/api/cs/shop/username/exist', qs.stringify(params), config)
// 店铺名称唯一
export const localStore = (params, config) => axiosPost('/merchant/api/cs/shop/nickname/exist', qs.stringify(params), config)
// 预添加同城
export const addLocalFirst = (params, config) => axiosPost('/merchant/api/cs/shop/city/clue/add', params, config)
// 登录注册验证码
export const localMsg = (params, config) => axiosPost('/merchant/api/cs/shop/send/msg', qs.stringify(params), config)
//同城品牌
export const localInside = (params, config) => axiosPost('/merchant/api/sale/brand/page', params, config)



/*******我的收益******/

//省区总合作商推广员收益首页
export const money = (params, config) => axiosPost('/merchant/api/mer/manager/bankroll/account/get', params, config)
//店老板收益首页
export const money2 = (params, config) => axiosPost('/merchant/api/st/store/account/bankroll/account/get', params, config)
//入账列表
export const moneyList = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/page', params, config)
//入账详情
export const moneyDetail = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/get',qs.stringify(params), config)
//真入账详情
export const truemoneyDetail = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/find', qs.stringify(params), config)

//提现记录列表
export const getMoneyList = (params, config) => axiosPost('/merchant/api/ps/extract/brokerage/order/page', params, config)
//提现记录详情




//汇总
export const allGet = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/count/money',qs.stringify(params), config)
//余额明细列表
export const moneyThin = (params, config) => axiosPost('/merchant/api/mer/manager/bankroll/account/record/page', params, config)
//店主余额明细和入账记录
export const moneyThin2 = (params, config) => axiosPost('/merchant/api/st/store/account/bankroll/account/record/page', params, config)

//提现
export const getMoney = (params, config) => axiosPost('/merchant/api/ps/extract/brokerage/order/withdrawa/cash', qs.stringify(params), config)
// 可提现余额
export const canGetMoney = (params, config) => axiosPost('/merchant/api/mer/manager/bankroll/account/count/money', qs.stringify(params), config)
// 店老板可提现余额
export const canGetMoney2 = (params, config) => axiosPost('/merchant/api/st/store/account/bankroll/account/count/money', qs.stringify(params), config)
//提现手续费
export const togetMoney = (params, config) => axiosPost('/merchant/api/ps/extract/brokerage/order/rate', params, config)
//提现详情（从余额明细来）
export const getMoneyDetail = (params, config) => axiosPost('/merchant/api/ps/extract/brokerage/order/get', qs.stringify(params), config)


//收益统计（详情）
export const getAllMoney = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/count/money/by/spreadId',qs.stringify(params), config)
//收益专职兼职统计（详情）
export const getTypeMoney = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/count/spread/money', qs.stringify(params), config)

//审核列表
export const getApprovalContent = (params, config) => axiosPost('/merchant/api/oa/approval/content/page', params, config)
//审核列表详情
export const getApprovalDetail = (params, config) => axiosPost('/merchant/api/oa/approval/content/get', qs.stringify(params), config)
//审核通过或者不通过
export const approveornot = (params, config) => axiosPost('/merchant/api/oa/approval/content/approveornot', params, config)
//审核统计
export const approvalCount = (params, config) => axiosPost('/merchant/api/oa/approval/content/approval/count', params, config)
//审核记录列表
export const approvalRecord = (params, config) => axiosPost('/merchant/api/oa/approval/record/page', params, config)

/** ************************** 草稿箱 ****************************/
//新增
export const addDraft = (params, config) => axiosPost('/merchant/api/sys/draft/box/save', params, config)
//修改
export const changeDraft = (params, config) => axiosPost('/merchant/api/sys/draft/box/update', params, config)
//列表
export const listDraft = (params, config) => axiosPost('/merchant/api/sys/draft/box/page', params, config)
//详情
export const detailDraft = (params, config) => axiosPost('/merchant/api/sys/draft/box/get',  qs.stringify(params), config)
//删除
export const deleteDraft = (params, config) => axiosPost('/merchant/api/sys/draft/box/delete',  params, config)

/** ************************** 特殊消息 ****************************/
//首页弹窗
export const homeDialog = (params, config) => axiosPost('/store/api/sm/message/show/dialog',  params, config)
//标记首页弹窗已读
export const homeDialogRead = (params, config) => axiosPost('/merchant/api/sm/message/other/record/dialog/read',  qs.stringify(params), config)

/** ************************** 分享 ****************************/
//查询手机号是否注册
export const sharePhone = (params, config) => axiosPost('/merchant/api/st/store/find/member/register',  qs.stringify(params), config)
//发送验证码
export const shareCode = (params, config) => axiosPost('/merchant/api/st/store/send/bind/verifyCode',  qs.stringify(params), config)
//店铺绑定及修改分享消费者账号
export const shareChange = (params, config) => axiosPost('/merchant/api/st/store/share/member/bind',  qs.stringify(params), config)
//注册并绑定分享消费者账号接口
export const shareRegister = (params, config) => axiosPost('/merchant/api/st/store/share/member/bind/register',  qs.stringify(params), config)
//查询会员绑定信息
export const shareMembers = (params, config) => axiosPost('/merchant/api/st/store/find/share/member',  qs.stringify(params), config)
//查询会员绑定的数据
export const shareStatus = (params, config) => axiosPost('/merchant/api/st/store/find/share/member/account',  qs.stringify(params), config)
//店铺解绑分享消费者账号
export const shareUntying = (params, config) => axiosPost('/merchant/api/st/store/share/member/untying',  qs.stringify(params), config)
//消费红包档位
export const shareRed = (params, config) => axiosPost('/merchant/api/st/store/find/money/position',  qs.stringify(params), config)
/** ************************** 商品 ****************************/
// 添加商品
export const addGoods = (params, config) => axiosPost('/merchant/api/st/store/goods/save',  params, config)
export const addService = (params, config) => axiosPost('/merchant/api/st/store/server/save',  params, config)
export const addMeal = (params, config) => axiosPost('/merchant/api/st/store/meal/save',  params, config)
export const goodsDetail = (params, config) => axiosPost('/merchant/api/st/store/goods/detail',  params, config)
export const serverDetail = (params, config) => axiosPost('/merchant/api/st/store/server/detail',  params, config)
export const mealDetail = (params, config) => axiosPost('/merchant/api/st/store/meal/detail',  params, config)
// 查询店铺下服务分类列表
export const sellCategoryList = (params, config) => axiosPost('/merchant/api/st/store/sell/category/list',  params, config)
export const brandList = (params, config) => axiosPost('/merchant/api/st/cloud/brand/list',  params, config)
export const goodsList = (params, config) => axiosPost('/merchant/api/st/store/goods/list',  params, config)
export const serverList = (params, config) => axiosPost('/merchant/api/st/store/server/list',  params, config)
export const deleteServer = (params, config) => axiosPost('/merchant/api/st/store/server/remove',  params, config)
export const deleteGoods = (params, config) => axiosPost('/merchant/api/st/store/goods/remove',  params, config)
export const deleteMeal = (params, config) => axiosPost('/merchant/api/st/store/meal/remove',  params, config)


//根据店铺id查审核详情
export const approvalstoreid = (params, config) => axiosPost('/merchant/api/oa/approval/content/get/by/serviceId',  qs.stringify(params), config)

//合同列表
export const listContract = (params, config) => axiosPost('/merchant/api/co/contract/list',  params, config)
//修改合同审核
export const changeContract = (params, config) => axiosPost('/merchant/api/co/contract/update/contract',  params, config)
//合同详情
export const lookContract = (params, config) => axiosPost('/merchant/api/co/contract/get',  qs.stringify(params), config)
// 查询改签详情
export const lookChangeContract = (params, config) => axiosPost('/merchant/api/co/contract/find/updateContract',  qs.stringify(params), config)
//合同预览
export const lookContracts = (params, config) => axiosPost('/merchant/api/co/contract/preview',  qs.stringify(params), config)
//合同修改正在审核
export const examineContracts = (params, config) => axiosPost('/merchant/api/co/contract/find/contract/approval',  qs.stringify(params), config)

//商户开票信息
export const invoiceInfo = (params, config) => axiosPost('/merchant/api/invoice/information/get',  params, config)
//商户修改开票信息
export const invoiceChangeInfo = (params, config) => axiosPost('/merchant/api/invoice/information/update',  params, config)
//商户开票记录
export const invoiceRecord = (params, config) => axiosPost('/merchant/api/invoice/record/page',  params, config)
//开票详情
export const invoiceDetail = (params, config) => axiosPost('/merchant/api/invoice/record/get',  params, config)
//查看电子发票
export const invoiceLook = (params, config) => axiosPost('/merchant/api/invoice/record/invoice/info',  params, config)
