<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="home-content">
      <div class="content-center">
        <p class="content-intro">账户余额(元)</p>
        <p class="content-money">{{store.money}}</p>
        <!--||store.storeAccount.status==3-->
        <!--store.merManager.status==3-->
        <p class="content-getmoney" v-if="store.status==3||$route.query.status==3">冻结中</p>

        <p class="content-getmoney" v-else @click="togetmoney">提现</p>
      </div>
    </div>

    <van-cell-group style="color: #0095FD;">
      <van-cell
        title="收益分账单"
        is-link
        @click="tomoneyrecord"
        :value="'待入账'+store.moneyBrokerageReceivable	 +'元'"
        value-class="oldcell"
      />
      <van-cell title="提现记录" is-link value=" " @click="togetmoneyrecord" v-if="type!=3" />
      <van-cell title="余额明细" is-link value=" " @click="tothin" />
      <van-cell title="汇总" is-link @click="tocollect" value=" " />
    </van-cell-group>

    <van-popup v-model="help.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <p class="helptitle">收益入账</p>
          <p class="helpcontent">
            1、订单支付，获得应收收益，状态为待入账。
            <br />2、订单退款，原应收收益退回，状态为已退回；按未退款的订单金额，重新获得应收收益，状态为待入账。
            <br />3、订单售后期关闭，收益入账，余额增加，状态为已入账。
          </p>
          <p class="helptitle">税费</p>
          <p class="helpcontent">
            1、每月入账的收益，下月可提现。
            <br />2、平台按提现金额的1%收取手续费。
            <br />3、税收
            <br />(1)推广人员
            <br />a.推广员在平台获得的收入应按劳务报酬所得计征个人所得税，平台实行代扣代缴。
            <br />b.推广员在平台通过提供劳务取得报酬，须按劳务报酬所得缴纳增值税及附加税，取得增值税发票。平台去税务局代开增值税发票时，代为缴纳增值税及附加税。
            <br />(2)合作商
            <br />针对合作商从平台获得收益的，合作商需按收益所得提供管理服务类发票至公司方可完成提现,
            <br />(3)省区总
            <br />针对省区总从平台获得收益的，因省区总为公司员工，有固定工资，故此收益为该员工绩效奖金，并入工资一同发放，并计算个税。
            <br />
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { currency, back } from "@/utils";
export default {
  data () {
    return {
      topheader: {
        name: '收益',
        left: '3',
        right6: '1',
        heade: 'header1'
      },
      type: '1', // 省区总合作商推广员推广首页
      havecard: false,
      help: {
        onoff: false,
      },
      store: {
        moneyBrokerageReceivable: 0,
        money: 0,
        status: '',
        storeAccount: {
          status: '',
          idCard: ''
        },
        merManager: {
          status: ''
        }
      },
      twodata: {

      },
      ice: false,
      idCard: ''
    }
  },
  components: {
  },
  methods: {
    goback () {
      if (this.help.onoff) {
        this.help.onoff = !this.help.onoff
        this.topheader.name = '收益'
        this.topheader.right6 = '1'
      } else {
        this.$router.go(-1)
      }
    },
    tohelp () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '收益帮助','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.help.onoff = true
      this.topheader.name = '帮助'
      this.topheader.right6 = ''
    },
    tomoneyrecord () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '收益分账单','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push('/MoneyRecord')
    },
    tocollect () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '汇总','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push('/Collect')
    },
    tothin () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '余额明细','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push('/MoneyThin')
    },
    togetmoney () {
      if (this.havecard) {
        if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '提现','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.$router.push({ path: '/GetMoney', query: { id: this.store.storeAccountId } })
      } else {
        // name=张程&card=421083199102057036&havecard=未绑定

        if (this.type == 0) {
          this.$toast('请绑卡后提现')
          this.$router.push({ path: '/BindCard', query: { havecard: '未绑定', name: this.name, card: this.store.storeAccount.idCard } })

        } else if (this.type == 1) {
          this.$toast('请绑卡后提现')
          // name=任宗豪&card=330381199606091114&havecard=未绑定
          this.$router.push({ path: '/BindCard', query: { havecard: '未绑定', name: this.twodata.name, card: this.twodata.managerSpread.idCard } })

        } else if (this.type == 2) {
          this.$toast('请绑卡后提现')
          this.$router.push({ path: '/BindCard', query: { name: this.twodata.managerCooperation.bcUserName, type: this.twodata.managerCooperation.bcRegisterType, card: this.twodata.managerCooperation.bcUserIdcard, code: this.twodata.managerCooperation.bcCode, store: this.twodata.name, havecard: '未绑定' } })
        } else {
          this.$dialog.alert({
            message: '省区总的每月入账收益，下月随工资发放，无需提现。'
          }).then(() => {
            // on close
          });
        }
      }


    },
    togetmoneyrecord () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '提现记录','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push('/GetMoneyRecord')
    },
    getdata () { // 获取全局数据
      let para = {
        // spreadId: sessionStorage.getItem('id')
      }
      this.Api.money(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        if (res.data.status == 1) {
          this.store = res.data.data
          this.store.moneyBrokerageReceivable = currency(this.store.moneyBrokerageReceivable / 100)
          this.store.money = currency(this.store.money / 100)
        }

      }).catch(error => {
        console.log(error)
      })
    },
    getdata2 () {
      let para = {
        // spreadId: sessionStorage.getItem('id')
      }
      this.Api.money2(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        if (res.data.status == 1) {
          this.store = res.data.data
          this.store.moneyBrokerageReceivable = currency(this.store.moneyBrokerageReceivable / 100)
          this.store.money = currency(this.store.money / 100)
        }

      }).catch(error => {
        console.log(error)
      })
    },
    gettwocard (para2) {
      this.Api.getCardDetail(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        if (res.data.status == 80034) {
          this.havecard = false
        } else {
          this.havecard = true
          // this.rank.card=res.data.data
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    toback () {
      back('#ffffff')
      // window.location.href = `qtkjshop://background?color=#0088FD`
    },

  },
  mounted () {
    if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '我的收益','' ,'' , '']);//其中灰色的为选填项
      
         }
    this.toback()
    this.name = sessionStorage.getItem('accountName')
    this.type = sessionStorage.getItem('accountType')
    this.idCard = sessionStorage.getItem('idCard')
    /* let formdata=new FormData();
     formdata.set("id",sessionStorage.getItem('id'));*/
    let para2 = {
      id: sessionStorage.getItem('id')
    }
    if (sessionStorage.getItem('accountType') == 0) {
      this.getdata2()
      let para = {
        stStoreAccountId: sessionStorage.getItem('id'),
        delFlag: 0,
        cardType: 1
      }
      this.Api.getCardstore(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        console.log(res)
        if (res.data.data.list.length) {  //WAN全正确
          console.log('111')
          let card = res.data.data.list.filter(item => {
            return item.cardType == 1
          })
          this.havecard = true
          card ? '' : this.havecard = false

        } else {
          this.havecard = false
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    } else if (sessionStorage.getItem('accountType') == 2) {
      this.getdata()

      this.Api.togetherDetail(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.twodata = res.data.data
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
      this.gettwocard(para2)
    } else if (sessionStorage.getItem('accountType') == 1) {
      this.getdata()

      this.Api.popularizeDetail(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.twodata = res.data.data
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
      this.gettwocard(para2)
    } else if (sessionStorage.getItem('accountType') == 3) {
      this.getdata()

      this.Api.bossDetail(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.twodata = res.data.data
        // input = input.replace(/-/g,'/');
        // this.store.merManager.createTime=res.data.data.merManager.createTime.replace(/-/g,'/');
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    }

    // this.$store.commit('SET_TYPE', sessionStorage.getItem('accountType'))
    // this.$store.commit('SET_USERID', sessionStorage.getItem('accountId'))
    // console.log(sessionStorage.getItem('accountId'),this.$store.state.user)

  }
}
</script>
<style scoped>
.home-content {
  width: 375px;
  height: 159px;
  background: #0088fd;
  background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
  background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
  background: linear-gradient(to right, #00a7fc, #0088fd);
  position: relative;
}
.content-center {
  text-align: center;
  padding-top: 10px;
}
.content-money {
  font-size: 28px;
  line-height: 36px;
  color: #fff;
  margin-top: 4px;
}
.content-intro {
  font-size: 12px;
  line-height: 17px;
  color: #fff;
  margin-top: 10px;
}
.content-getmoney {
  width: 82px;
  height: 42px;
  position: absolute;
  font-size: 16px;
  line-height: 42px;
  margin-top: 20px;
  color: #ffffff;
  left: 50%;
  transform: translateX(-50%);
  background: url('../../../../assets/img/getmoney.png') no-repeat center 0;
  /*background-size:cover;*/
  background-size: 80px 40px;
  cursor: pointer;
}
.oldcell {
  text-align: right !important;
  display: block !important;
  color: #999 !important;
  font-size: 12px !important;
}
.rightmap {
  background: #fff;
}
.helptitle {
  color: #333;
  font-size: 14px;
  margin: 20px 10px;
}
.helpcontent {
  color: #666;
  font-size: 12px;
  line-height: 20px;
  margin: 0 15px;
}
</style>
