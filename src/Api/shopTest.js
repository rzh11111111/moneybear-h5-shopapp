import {axiosPost,axiosGet} from './baseApi'
// import Config from '../utils/config'
import qs from 'qs'
// export const loginByStorePwd = (params, config) => axiosPost('/store/Api/login/update/pwd', qs.stringify(params), config)
// 首页
export const getinfomation = (params, config) => axiosPost('/merchant/api/mer/firstpageinfo/getinfomation', qs.stringify(params), config)


// 店铺列表
export const storeList = (params, config) => axiosPost('/merchant/api/st/store/page', params, config)

//店铺开关
export const storeonoff = (params, config) => axiosPost('/merchant/api/st/store/status', params, config)

// 生成支付二维码
// export const createmerchantcode = (params, config) => axiosPost('/merchant/api/pay/qcode/createmerchantcode', qs.stringify(params), config)
export const createmerchantcode = (params, config) => axiosPost('/merchant/api/pay/qcode/createmerchant/newcode', qs.stringify(params), config)

// 订单列表
export const orderPageList = (params, config) => axiosPost('/merchant/api/ots/offline/order/page', params, config)
export const orderDetail = (params, config) => axiosPost('/merchant/api/ots/offline/order/find', qs.stringify(params), config)


//未读消息
export const notReadMessage = (params, config) => axiosPost('/store/api/sm/message/store/record/count/read', params, config)

//平台消息
export const noticeMessage = (params, config) => axiosPost('/store/api/sm/message/store/record/select/notice', params, config)

//审核消息
export const messageMessage = (params, config) => axiosPost('/store/api/sm/message/store/record/select/message', params, config)

//删除消息
export const deleteMessage = (params, config) => axiosPost('/store/api/sm/message/store/record/delete', params, config)

//标记已读
export const readMessage = (params, config) => axiosPost('/store/api/sm/message/store/record/read', qs.stringify(params), config)
//全部已读
export const readMessageAll = (params, config) => axiosPost('/store/api/sm/message/store/record/all/read', qs.stringify(params), config)

//消息详情
export const detailMessage = (params, config) => axiosPost('/store/api/sm/message/store/record/get', params, config)

// 营业时间
//店铺营业时间列表
export const shopTimeList = (params, config) => axiosGet('/merchant/api/st/store/business/time/list', params, config)
//删除营业时间
export const shopTimeDelete = (params, config) => axiosPost('/merchant/api/st/store/business/time/delete', qs.stringify(params), config)
//新增或修改营业时间
export const shopTimeAdd = (params, config) => axiosPost('/merchant/api/st/store/business/time/addOrUpdate', params, config)
//删除时段
export const shopTimeDeleteOne = (params, config) => axiosPost('/merchant/api/st/store/business/time/delete/sub', qs.stringify(params), config)


//店铺所有评价
export const evaluate = (params, config) => axiosPost('/store/api/ots/offline/order/evaluate/record/find/storeId', params, config)
//店铺举报评价
export const evaluateDetail = (params, config) => axiosPost('/store/api/ots/offline/order/evaluate/record/update/status', params, config)


//查询平安支持的银行的省份
export const bankProvince = (params, config) => axiosPost('/merchant/api/pay/pubnode/list', params, config)
//查询平安支持的银行的市
export const bankCity = (params, config) => axiosPost('/merchant/api/pay/pubpaycity/list', params, config)
//通过地区code查询支行信息
export const bankBranchbank = (params, config) => axiosPost('/merchant/api/pay/zjjzcnaps/list', params, config)
//我，绑卡，打钱
export const bankMoney = (params, config) => axiosPost('/merchant/api/st/store/bankcard/send/money', params, config)
//资金验证
export const bankSave = (params, config) => axiosPost('/merchant/api/st/store/bankcard/save/money', params, config)
//个人发送验证码
export const bankMsg = (params, config) => axiosPost('/merchant/api/st/store/bankcard/sendbank/vertifycode', params, config)
//个人验证验证码
export const bankSave2 = (params, config) => axiosPost('/merchant/api/st/store/bankcard/savebank/vertifycode', params, config)
//解除绑卡
export const deleteCard = (params, config) => axiosPost('/merchant/api/st/store/bankcard/delete/bankcard', params, config)



//店铺收益
//收益首页
export const moneyy = (params, config) => axiosPost('/merchant/api/st/store/bankroll/account/get/money', qs.stringify(params), config)
//资金账户详情
export const monebankyy = (params, config) => axiosPost('/merchant/api/st/store/bankroll/account/select', qs.stringify(params), config)

//入账收益列表
export const moneyList = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/page', params, config)
//入账收益详情
export const moneyDetail = (params, config) => axiosPost('/merchant/api/ps/brokerage/distribute/order/get', params, config)
//汇总
export const allGet = (params, config) => axiosPost('/merchant/api/ps/settle/count/money', qs.stringify(params), config)
//资金明细列表
export const moneyThin = (params, config) => axiosPost('/merchant/api/st/store/bankroll/account/record/page', params, config)
//店铺提现
export const getMoney = (params, config) => axiosPost('/merchant/api/ps/extract/goods/order/withdrawa/cash', qs.stringify(params), config)
//提现记录列表
export const getMoneyList = (params, config) => axiosPost('/merchant/api/ps/extract/goods/order/page', params, config)
//提现详情（从余额明细来）
export const getMoneyDetail = (params, config) => axiosPost('/merchant/api/ps/extract/goods/order/get', qs.stringify(params), config)
//收款结算
export const collection = (params, config) => axiosPost(`/merchant/api/ots/settle/account/api/page?storeId=${params.storeId}`, params.data, config)
//收支汇总
export const collect = (params, config) => axiosPost('/merchant/api/ots/settle/account/api/summary', qs.stringify(params), config)


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

/** ************************** 店中店 ****************************/
//菜单列表
export const menuList = (params, config) => axiosPost('/merchant/api/st/store/sell/category/list',  params, config)
//添加菜单所属行业类目
export const menuCategory = (params, config) => axiosPost('/merchant/api/st/cloud/category/list',  params, config)
//添加/修改菜单
export const addMenu = (params, config) => axiosPost('/merchant/api/st/store/sell/category/save',  params, config)
//删除菜单
export const deleteMenu = (params, config) => axiosPost('/merchant/api/st/store/sell/category/remove',  params, config)
//修改菜单顺序
export const changeMenu = (params, config) => axiosPost('/merchant/api/st/store/sell/category/sort',  params, config)

//线下店铺商品列表
export const goodsList = (params, config) => axiosPost('/merchant/api/st/store/goods/list',  params, config)
//商品上架
export const goodsUp = (params, config) => axiosPost('/merchant/api/st/store/goods/upperShelf',  params, config)
//商品下架
export const goodsLower = (params, config) => axiosPost('/merchant/api/st/store/goods/lowerShelf',  params, config)
//商品删除
export const goodsDelete = (params, config) => axiosPost('/merchant/api/st/store/goods/remove',  params, config)
//商品推荐
export const goodsSetRecommend = (params, config) => axiosPost('/merchant/api/st/store/goods/setRecommend',  params, config)
//商品取消推荐
export const goodsNotRecommend = (params, config) => axiosPost('/merchant/api/st/store/goods/cancelRecommend',  params, config)

/** ************************** 商品 ****************************/
//消费红包档位
export const addGoods = (params, config) => axiosPost('/merchant/api/st/store/goods/save',  qs.stringify(params), config)

/** ************************** 新合同 ****************************/
//合同预览
export const lookContract = (params, config) => axiosPost('/merchant/api/co/contract/preview',  qs.stringify(params), config)
//合同验证码
export const codeContract = (params, config) => axiosPost('/merchant/api/co/contract/send/message',  qs.stringify(params), config)
//合同签
export const addContract = (params, config) => axiosPost('/merchant/api/co/contract/sign/contract',  qs.stringify(params), config)
// 查询改签详情
export const lookChangeContract = (params, config) => axiosPost('/merchant/api/co/contract/find/updateContract',  qs.stringify(params), config)
