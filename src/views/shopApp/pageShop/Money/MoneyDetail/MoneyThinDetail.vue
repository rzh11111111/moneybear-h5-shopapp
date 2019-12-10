<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="moneydetail-header">
      <p class="header-1">应收收益</p>
      <p class="header-2 fontweight">￥{{store.money}}</p>
      <p v-if="store.status==1" class="header-3 bluecolor">待入账</p>
      <p v-if="store.status==2" class="header-3 greencolor">已入账</p>
      <p v-if="store.status==3" class="header-3 redcolor">已退回</p>
    </div>
    <div class="moneydetail-content">
      <p class="content-title">入账明细</p>
      <van-cell-group>
        <van-cell
          value-class="color999"
          title="订单实付金额"
          v-if="store.spreadType!=1"
          :value="'￥'+store.moneyOrderPay"
        />
        <van-cell
          value-class="color999"
          title="推广员收益"
          v-if="store.spreadType==1"
          :value="'￥'+store.moneyDistribute"
        />
        <van-cell value-class="color999" title="我的收益比例" :value="My" />
        <van-cell
          value-class="color999"
          title="线下收益，省区总抽成"
          v-if="store.spreadType==3"
          :value="other"
        />
      </van-cell-group>
      <van-cell title="应收收益" value-class="fontweight" :value="'￥'+store.money" />
    </div>
    <div class="moneydetail-footer">
      <p class="content-title">入账信息</p>
      <van-cell-group>
        <van-cell value-class="color999" title="店铺名称" :value="store.store.name" />
        <van-cell value-class="color999" title="店铺编码" :value="store.store.code" />
        <van-cell value-class="color999" title="订单号" :value="store.onlineOfflineOrderNo" />
        <van-cell value-class="color999" title="支付单号" :value="store.payOrderNo" />
        <van-cell value-class="color999" title="入账单号" :value="store.orderNo" />
        <van-cell value-class="color999" title="入账单创建时间" :value="store.createTime" />
        <van-cell value-class="color999" title="入账/退回时间" :value="store.closeTime" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { accMul, accDiv } from "@utils";
export default {
  name: "MoneyDetail",
  data () {
    return {
      topheader: {
        name: '提现记录',
        left: '2',
        heade: 'header1',
      },
      store: {
        store: {
          code: '',
          name: '',
        },
        moneyOrderPay: '', //订单实付金额
        moneyDistribute: '', //推广员收益
        distributeConfig: '', //线下.省区总抽成，我的收益比例
        money: '', //应收收益
        onlineOfflineOrderNo: '', //订单号
        payOrderNo: '', //支付单号
        orderNo: '',  //流水号、入账单号
        createTime: '', //创建时间
        closeTime: '', //回退时间
      }
    }
  },
  components: {
  },
  computed: {
    My () {
      return (accMul(this.store.distributeConfig, 100) + '%')
    },
    other () {
      return '-' + accMul(this.store.distributeConfig, 100) + '%'
    },
    moneyss () {
      return this.$store.state.record.recordObj
    }
  },
  methods: {

  },
  mounted () {
    this.store = this.moneyss
    this.store.money = accDiv(this.store.money, 100).toFixed(2)
  }
}
</script>

<style scoped>
.van-cell:not(:last-child)::after {
  border: none;
}
.van-cell /deep/ .van-cell__value {
  text-align: right;
  display: block;
}
.moneydetail-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.header-1 {
  font-size: 14px;
  margin-top: 10px;
}
.header-2 {
  font-size: 28px;
  margin-top: 10px;
}
.header-3 {
  font-size: 14px;
  margin-top: 10px;
}
.moneydetail-content {
  margin-top: 40px;
}
.content-title {
  font-size: 14px;
  margin: 20px 18px 10px;
  font-weight: 500;
}
</style>
