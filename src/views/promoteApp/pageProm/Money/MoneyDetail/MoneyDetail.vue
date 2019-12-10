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
      <p class="content-title">分账单明细</p>
      <van-cell-group>
        <!--<van-cell value-class="color999" title="订单实付金额" v-if="store.spreadType!=1" :value="'￥'+store.moneyOrderPay" />-->
        <van-cell
          value-class="color999"
          title="推广员收益"
          v-if="store.spreadType==1"
          :value="'￥'+store.moneyDistribute"
        />
        <van-cell
          value-class="color999"
          title="我的收益比例"
          v-if="store.spreadType==1||store.spreadType==2"
          :value="My"
        />
        <!--<van-cell value-class="color999" title="线下收益，省区总抽成" v-if="store.spreadType==3" :value="other" />-->
        <!--<van-cell value-class="color999" title="线下收益，省区总抽成" v-if="store.spreadType==3&&!fromlist" value="10%" />-->
      </van-cell-group>
      <van-cell title="应收收益" value-class="fontweight" :value="'￥'+store.money" />
    </div>
    <div class="moneydetail-footer">
      <p class="content-title">分账单信息</p>
      <van-cell-group>
        <van-cell
          value-class="color999"
          title="店铺名称"
          v-if="store.store"
          @click="tostoredetail"
          :value="store.store.nickName"
        />
        <van-cell value-class="color999" title="店铺编码" v-if="store.store" :value="store.store.code" />
        <van-cell
          value-class="color999"
          title="店铺名称"
          v-if="store.shop"
          @click="toshopdetail"
          :value="store.shop.nickName"
        />
        <van-cell value-class="color999" title="店铺编码" v-if="store.shop" :value="store.shop.code" />
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
import { currency, accDiv, accMul } from "@/utils";
export default {
  name: "MoneyDetail",
  data () {
    return {
      topheader: {
        name: '分账单详情',
        left: '2',
        heade: 'header1',
      },
      fromlist: true,  //true从收益分账单来，false从余额明细来
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

  },
  methods: {
    getdetail () {

      // let formdata=new FormData();
      let para = {

      }
      if (this.$route.query.id) {

        // formdata.set("id",this.$route.query.id);
        para.id = this.$route.query.id
        this.Api.truemoneyDetail(para).then(res => {
          if (res.data.data) {
            res.data.data.moneyOrderPay = currency(accDiv(res.data.data.moneyOrderPay, 100))
            res.data.data.moneyDistribute = currency(accDiv(res.data.data.moneyDistribute, 100))
            res.data.data.money = currency(accDiv(res.data.data.money, 100))
            this.store = res.data.data
            this.fromlist = true
            // res.data.data.list.forEach(res=> {
            //     res.money=currency(res.money/100)
            // });

          }


        }).catch(error => {
          console.log(error)
        })
      } else {
        para.orderId = this.$route.query.orderId
        para.spreadId = this.$route.query.spreadId
        // formdata.set("orderId",this.$route.query.orderId);
        // formdata.set("spreadId",this.$route.query.spreadId);
        this.Api.moneyDetail(para).then(res => {
          if (res.data.data) {

            res.data.data.moneyOrderPay = currency(accDiv(res.data.data.moneyOrderPay, 100))
            res.data.data.moneyDistribute = currency(accDiv(res.data.data.moneyDistribute, 100))
            res.data.data.money = currency(accDiv(res.data.data.money, 100))
            this.store = res.data.data
            this.fromlist = false
            // res.data.data.list.forEach(res=> {
            //     res.money=currency(res.money/100)
            // });

            // res.data.data.money=(accDiv(res.data.data.money,100))

          }


        }).catch(error => {
          console.log(error)
        })
      }


    },
    tostoredetail () {
      this.$router.push({
        path: '/StoreDetail',
        query: { id: this.store.store.id, type: sessionStorage.getItem('accountType'), list: this.store.store.type == 1 ? 4 : 5, fromrouter: '1' }
      })
    },
    toshopdetail () {
      this.$router.push({
        path: '/LocalDetail',
        query: { id: this.store.shop.id, type: sessionStorage.getItem('accountType'), list: 6, fromrouter: '1' }
      })
    }
  },
  mounted () {
    this.getdetail()
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
