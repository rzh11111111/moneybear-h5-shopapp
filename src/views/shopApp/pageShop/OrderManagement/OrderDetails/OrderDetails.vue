<template>
  <div class="app-init">
    <top-bars :top-header="topheader"></top-bars>
    <p class="trading-success">交易成功</p>
    <p class="user-info">用户信息</p>
    <div class="cell-box bg-fff" style="padding-bottom: 5px;">
      <div class="cell-shop">
        <p>用户昵称</p>
        <p class="colorC0C0C0">{{orderDetail.memberName || phonestar(orderDetail.memberPhone)}}</p>
      </div>
      <div class="cell-shop">
        <p>用户编码</p>
        <p class="colorC0C0C0">{{orderDetail.memberCode}}</p>
      </div>
    </div>
    <p class="price-info">价格信息</p>
    <div class="cell-box bg-fff">
      <div class="cell-shop">
        <p>消费金额</p>
        <p
          class="colorC0C0C0"
        >¥{{((orderDetail.moneyOrderPayable?orderDetail.moneyOrderPayable:'')/100).toFixed(2)}}</p>
      </div>
      <div class="cell-shop">
        <p class="no-preferential">不参与打折</p>
        <p class="no-preferential">
          <template
            v-if="orderDetail.discountStoreBan || orderDetail.discountStoreBan === 0"
          >{{(orderDetail.discountStoreBan/100).toFixed(2)}}</template>
        </p>
      </div>
      <div class="cell-shop cell-discount">
        <p>
          打折(<span class="discount">{{(orderDetail.storeRate||0).toFixed(1)}}</span>)
        </p>
        <p class="colorC0C0C0">-¥{{(orderDetail.discountStore/100).toFixed(2)}}</p>
      </div>
      <div class="cell-shop evaluation">
        <p>收款</p>
        <p
          class="colorC0C0C0"
        >¥{{((orderDetail.moneyOrderPay?orderDetail.moneyOrderPay:0)/100).toFixed(2)}}</p>
      </div>
      <!-- <div class="cell-shop">
        <p>平台服务费</p>
        <p
          class="colorC0C0C0"
        >-¥{{((orderDetail.platformServiceCharge?orderDetail.platformServiceCharge:0)/100).toFixed(2)}}</p>
      </div> -->
      <!-- <div class="cell-shop cell-discount" v-if="orderDetail.storeType==1">
        <p>平台补贴</p>
        <p
          class="colorC0C0C0"
        >+¥{{((orderDetail.platformSubsidy?orderDetail.platformSubsidy:0)/100).toFixed(2)}}</p>
      </div> -->
      <!-- <div class="paid-amount borderT-1px">
        <p>结算金额</p>
        <p
          class="colorC0C0C0"
        >¥{{((orderDetail.receivablesMoney?orderDetail.receivablesMoney:0)/100).toFixed(2)}}</p>
      </div> -->
    </div>
    <p class="order-info">订单信息</p>
    <div class="cell-box bg-fff">
      <div class="cell-shop">
        <p>订单号</p>
        <p class="colorC0C0C0">{{orderDetail.orderNo}}</p>
      </div>
      <div class="cell-shop">
        <p>支付流水号</p>
        <p class="colorC0C0C0">{{orderDetail.orderPayNo}}</p>
      </div>
      <div class="cell-shop">
        <p>支付方式</p>
        <p class="colorC0C0C0">{{dataTxt.payType[orderDetail.payType]}}</p>
      </div>
      <div class="cell-shop">
        <p>创建时间</p>
        <p class="colorC0C0C0">
          <template
            v-if="orderDetail.createTime"
          >{{format(orderDetail.createTime, 'yyyy-MM-dd hh:mm:ss')}}</template>
        </p>
      </div>
      <div class="cell-shop evaluation">
        <p>支付时间</p>
        <p class="colorC0C0C0">
          <template
            v-if="orderDetail.payTime"
          >{{format(orderDetail.payTime, 'yyyy-MM-dd hh:mm:ss')}}</template>
        </p>
      </div>

     
    </div>
  </div>
</template>

<script>
import topBars from '@/components/topBars'
import dataTxt from "@/utils/common.js"
import { format, phonestar, accMul } from "@/utils"

export default {
  data () {
    return {
      phonestar,
      dataTxt,
      format,
      value: 3,
      topheader: {
        name: '订单详情',
        left: '2',
        heade: 'header1'
      },
      orderDetail: {
        payOrder: {}
      },
    }
  },
  components: {
    topBars
  },
  created () {
    this._orderDetail()
  },
  methods: {
    _orderDetail () {
      let para = {
        orderId: this.$route.query.orderId
      }
      this.shopApi.orderDetail(para).then(res => {
        if (res.data.data) {
          res.data.data.storeRate = accMul(res.data.data.storeRate, 10)
          this.orderDetail = res.data.data
          // this.orderDetail.storeRate=this.orderDetail.storeRate*100/10
          console.log(res.data.data)
        }
      })
    }
  }

}
</script>

<style scoped type="text/scss" lang="scss">
.trading-success {
  height: 46px;
  line-height: 46px;
  color: #353535;
  font-size: 16px;
  padding: 0 18px;
  margin-top: 10px;
  background-color: #ffffff;
}

.user-info,
.price-info,
.order-info {
  font-size: 14px;
  color: rgba(53, 53, 53, 1);
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
}

.cell-box {
  padding: 16px 18px 0 18px;
  .cell-shop {
    display: flex;
    justify-content: space-between;
    color: #323233;
    font-size: 14px;
    margin-bottom: 16px;
    .no-preferential {
      color: #b0b0b0;
    }
    .calc-way {
      color: #0088fd;
    }
  }
  .paid-amount {
    display: flex;
    justify-content: space-between;
    color: #323233;
    font-size: 14px;
    height: 46px;
    line-height: 46px;
    p:nth-child(2) {
      color: #0088fd;
    }
  }
  .cell-discount {
    margin-bottom: 16px;
    p {
      .discount {
        color: #0088fd;
      }
    }
  }
  .evaluation {
    color: #323233;
    font-size: 14px;
    height: 40px;
  }
}
</style>
