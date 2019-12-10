<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <van-cell title="提现" is-link :value="card.bankName+'('+fourbankno+')'" @click="todetail">
      <div slot="title">
        <div class="bankdiv">
          <img v-if="card.bankName=='工商银行'" src="@/assets/img/bank/gs.png" />
          <img v-if="card.bankName=='光大银行'" src="@/assets/img/bank/gd.png" />
          <img v-if="card.bankName=='广发银行'" src="@/assets/img/bank/gf.png" />
          <img v-if="card.bankName=='杭州银行'" src="@/assets/img/bank/hz.png" />
          <img v-if="card.bankName=='华夏银行'" src="@/assets/img/bank/hx.png" />
          <img v-if="card.bankName=='建设银行'" src="@/assets/img/bank/js.png" />
          <img v-if="card.bankName=='交通银行'" src="@/assets/img/bank/jt.png" />
          <img v-if="card.bankName=='民生银行'" src="@/assets/img/bank/ms.png" />
          <img v-if="card.bankName=='宁波银行'" src="@/assets/img/bank/nb.png" />
          <img v-if="card.bankName=='农业银行'" src="@/assets/img/bank/ny.png" />
          <img v-if="card.bankName=='平安银行'" src="@/assets/img/bank/pa.png" />
          <img v-if="card.bankName=='浦发银行'" src="@/assets/img/bank/pf.png" />
          <img v-if="card.bankName=='兴业银行'" src="@/assets/img/bank/xy.png" />
          <img v-if="card.bankName=='邮储银行'" src="@/assets/img/bank/yc.png" />
          <img v-if="card.bankName=='招商银行'" src="@/assets/img/bank/zs2.png" />
          <img v-if="card.bankName=='浙商银行'" src="@/assets/img/bank/zs.png" />
          <img v-if="card.bankName=='中国银行'" src="@/assets/img/bank/zg.png" />
        </div>
      </div>
    </van-cell>
    <div class="getmoney-title">
      <p>
        可提现余额:
        <span>￥{{store}}</span>
      </p>
      <p class="te" @click="allget">全部提现</p>
    </div>
    <van-cell-group>
      <van-field
        v-model="money"
        required
        clearable
        label="提现金额(￥)："
        placeholder="请输入提现金额"
        size="50"
        type="number"
        @blur="inputblur"
      ></van-field>
      <!--<div class="getmney-notice">实际到账金额=提现金额*（1-个税20%-手续费1%）=<span>321</span></div>-->
    </van-cell-group>

    <van-button type="primary" size="large" @click="inputbtn" class="submitbtn">确认提现</van-button>
    <p class="getmney-notice">每天限提现1次，0手续费</p>

    <van-popup v-model="result.win" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div class="result">
          <van-icon name="checked" color="#00A7FC" size="50px" />
          <p>已提交，平台审核中</p>
          <p class="tixianfont">平台审批通过后，将于1-3个工作日到账</p>
          <p class="tixianfont">具体到账时间以实际为准</p>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="result.lose" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div class="result">
          <van-icon name="clear" color="#FF3232" size="50px" />失败
          <br />
        </div>
        <van-icon slot="right-icon" name="info" class="custom-icon" />失败原因为身份/证件信息有误时，请前往“详情-资料信息”页核对证照信息
      </div>
    </van-popup>
  </div>
</template>

<script>
import { currency, accMul,back } from "@/utils";
export default {
  name: "GetMoney",
  data () {
    return {
      topheader: {
        name: '提现',
        left: '3',
        heade: 'header1',
      },
      store: {

      },
      card: {
        bankNo: '3213213213213',
        bankName: ''
      },
      money: 0,
      result: {
        win: false,
        lose: false,
        chance: 0,
      },
    }
  },
  components: {
  },
  computed: {
    fourbankno () {
      let par = this.card.bankNo.substr(this.card.bankNo.length - 4)
      return par ? par : ''
    }
  },
  methods: {
    goback () {
      // if(this.result.win){
      //     this.$router.replace({path: '/Money', query: {id: sessionStorage.getItem('id')}})
      // }else if(this.result.lose){
      //     this.$router.replace({path: '/Money', query: {id: sessionStorage.getItem('id')}})
      // }else {
      this.$router.go(-1)
      // }
    },
    allget () {
      let regRule = /,/g;
      let param = this.store
      console.log(typeof param)
      console.log(param)
      this.money = param.replace(regRule, '');
    },
    inputbtn () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '确认提现','' ,'' , '']);//其中灰色的为选填项
      
         }
      if (Number(this.money) < 50) {
        this.$toast('50元起提')
      } else if (Number(this.store.money) < Number(this.money)) {
        this.$toast('可提现余额不足')
      } else {
        let para = {
          memberBankCardId: this.card.id,
          cashAmount: accMul(Number(this.money), 100),
          storeId: this.$route.query.id
        }
        this.shopApi.getMoney(para).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          // this.shop.logo = res.data.url
          // if(res){
          //
          // }
          if (res.data.status == 1) {
            // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 4 } })
        this.$router.push({ path: '/ApplyResult', query: { result: '提现成功',redresult:'平台审批通过后，将于1-3个工作日到账' } })
          } else {
            // this.$toast(res.data.stateMessage)
            // this.$router.push({path: '/ApplyResult', query: {win:false,type:4,result:res.data.stateMessage}})
          }
          // console.log(res)
          // if(res.data.status==1){
          //     this.result.win=true
          //     this.topheader.name='提现成功'
          // }else{
          //     this.result.lose=true
          //     this.topheader.name='提现失败'
          // }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    inputblur (e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null

      console.log('e', e.target.value)
      this.money = e.target.value
    },
    getcard () {

      let para = {
        storeId: this.$route.query.id
      }
      this.Api.getCardstore(para).then(res => {
        console.log(res)
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        // if(res.status==80034){
        //     // this.havecard='未绑定'
        //     console.log('未绑卡')
        // }else{
        //     this.card=res.data.data
        // }
        if (res.data.status == 1 && res.data.data.list.length) {
          this.card = res.data.data.list[0]
        } else {
          this.$router.go(-1)
        }
      }).catch(() => {
        this.$router.go(-1)
      })
    },
    getdata () { // 获取全局数据

      /* let formdata=new FormData();
       formdata.set("storeId",this.$route.query.id);*/
      let para = {
        storeId: this.$route.query.id
      }
      this.shopApi.moneyy(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        if (res.data.status == 1) {
          this.store = currency(res.data.data.total / 100)
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    todetail () {
      this.$router.push({ path: '/ShopManagement', query: { id: this.$route.query.id, lookcard: true } })
      // this.$router.push({path: '/MasterDetail', query: {id: sessionStorage.getItem('id'), type: this.type,fromrouter:'2'}})

    }
  },
  mounted () {

  back('#00A7FC')
    this.getdata()
    this.getcard()

  }
}
</script>

<style scoped lang="scss" type="text/scss">
.bankdiv {
  width: 30px;
  height: 30px;
  margin: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-cell /deep/ .van-cell__title {
  max-width: 30%;
}
.van-cell:not(:last-child)::after {
  width: 90%;
  left: 5%;
}
.getmoney-title {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  p {
    font-size: 12px;
    color: #999;
    span {
      font-size: 14px;
      color: #0088fd;
    }
  }
  .te {
    font-size: 12px;
    color: #0088fd;
    border: 1px solid #0088fd;
    padding: 3px 6px;
  }
}
.van-cell-group {
  border-bottom: 1px solid #fff;
}
.van-cell-group /deep/ .van-cell__value {
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  text-align: right;
  input {
    /*direction: rtl;*/
    text-align: right;
  }
}
.getmney-notice {
  font-size: 12px;
  color: #333;
  margin: 16px 5% 18px 5%;
  span {
    font-size: 14px;
    color: #0088fd;
  }
}
.result {
  width: 100%;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 30px 0 60px 0;
}
.tixianfont {
  font-size: 12px;
  line-height: 20px;
  color: #999;
}
</style>
