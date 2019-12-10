<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="moneydetail-header">
      <p class="header-1">提现金额</p>
      <p class="header-2 fontweight">￥{{store.extractMoney?store.extractMoney:store.money}}</p>
      <p v-if="store.status==1||store.status==2" class="header-3 bluecolor">审核中</p>
      <p v-if="store.status==3" class="header-3 greencolor">提现成功</p>
      <p
        v-if="store.status==4||store.status==5||store.status==6||store.status==7"
        class="header-3 redcolor"
      >审核拒绝</p>
    </div>

    <div class="moneydetail-content">
      <p class="content-title">提现明细</p>
      <van-cell-group>
        <van-cell value-class="color999" title="提现金额" :value="'￥'+store.extractMoney" />
        <van-cell value-class="color999" title="税费" :value="shui" />
      </van-cell-group>
      <van-cell title="实际到账金额" value-class="fontweight" :value="'￥'+other" />
    </div>

    <div class="moneydetail-footer">
      <p class="content-title">提现信息</p>
      <van-cell-group>
        <van-cell value-class="color999" title="流水号" :value="store.orderNo" />
        <van-cell value-class="color999" title="到账银行" :value="store.bankCardBankName" />
        <van-cell value-class="color999" title="提现时间" :value="store.createTime" />
        <van-cell value-class="color999" title="审核打款/拒绝时间" :value="store.updateTime" />
        <van-cell value-class="color999" title="备注" :value="store.disposeRemarks" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { currency } from "@/utils";
// import { mapGetters } from 'vuex';
export default {
  name: "MoneyDetail",
  data () {
    return {
      topheader: {
        name: '提现详情',
        left: '2',
        heade: 'header1',
      },
      store: {
        extractMoney: '',
        extractPaymentGoodsOrderIds: '',
        bankCardBankName: "",
        createStartTime: '',
        extractMoneyRate: '',
        tallageMoneyRate: '',
        tallageAttachMoney: '',
        tallageIncrementMoney: '',

        moneyOrderPay: '', //订单实付金额
        moneyDistribute: '', //推广员收益
        distributeConfig: '', //线下.省区总抽成，我的收益比例
        money: '', //应收收益
        onlineOfflineOrderNo: '', //订单号
        payOrderNo: '', //支付单号
        orderNo: '',  //流水号、入账单号
        createTime: '', //创建时间
        closeTime: '', //回退时间
        disposeRemarks: ''  //拒绝原因
      }
    }
  },
  components: {
  },
  computed: {
    shui () {
      if (this.store.tallageIncrementMoney) {
        return (this.store.extractMoneyRate + this.store.tallageMoneyRate + this.store.tallageAttachMoney + this.store.tallageIncrementMoney) / 100
      } else {
        return (this.store.extractMoneyRate + this.store.tallageMoneyRate + this.store.tallageAttachMoney) / 100
      }

    },
    other () {
      let extractmoney = this.store.extractMoney.replace(',', "")
      console.log('1111')
      return currency(extractmoney - (this.store.extractMoneyRate + this.store.tallageMoneyRate + this.store.tallageAttachMoney + this.store.tallageIncrementMoney) / 100)


    },
    // ...mapGetters(['recordObj']),
    moneyss () {
      return this.$store.state.record.recordObj
    }
  },
  methods: {

  },
  mounted () {
    if (this.$route.query.orderId) {
      let para = {
        id: this.$route.query.orderId
      }
      this.Api.getMoneyDetail(para).then(res => {


        this.store = res.data.data
        this.store.extractMoney = currency(this.store.extractMoney / 100)
        this.store.money = (this.store.money / 100).toFixed(2)
      }).catch(error => {
        console.log(error)
      })
    } else {
      this.store = this.moneyss
    }
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
