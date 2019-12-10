<template>
  <div class="app-init" style="background:#FFF">
    <top-column :top-header="topheader"></top-column>
    <div class="home-content">
      <div class="home-cir home-cirl"></div>
      <div class="home-cir home-cirr"></div>
      <div @click="tohelp" class="tohelp">
        <svg-icon class="rightIcon" icon-class="money-info" />
      </div>
        
      <div class="content-center">
        <p class="content-intro">可用余额</p>
        <p class="content-money">￥{{(store.total/100).toFixed(2)}}</p>
        <p class="content-getmoney" v-if="status1=='3'||status2==3">冻结中</p>
        <p class="content-getmoney" v-else @click="togetmoney">提现</p>
      </div>
      
    </div>

    <van-cell-group style="color: #0095FD;">
        <van-cell title="收款结算" is-link @click="tocollect" value=" " />
      
      <van-cell title="收支汇总" is-link value=" " @click="tothin" />
      <van-cell title="提现明细" is-link  :value="store.ongoing?'提现中：       '+(store.ongoing/100).toFixed(2) +'  元':''" @click="togetmoneyrecord"  value-class='cellte'/>
      <van-cell title="开票记录" is-link @click="toinvoice" value=" " />
    </van-cell-group>



    <van-popup v-model="help.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <p class="helptitle">结算</p>
          <p class="helpcontent">
            1、用户付款后，立即结算到账户余额。
            <br />
          </p>
          <p class="helptitle">提现</p>
          <p class="helpcontent">
            <!--1、当日订单，T+1后方可提现。<br>-->
            1、订单收入提现，无手续费。
            <br />2、店铺状态为冻结时，不能提现。
            <br />3、申请提现，需平台审核。
            <br />
          </p>
          <p class="helptitle">服务费发票</p>
          <p class="helpcontent">1、平台按月开具服务费发票。</p>

          <!--<table border="1" cellspacing="0">
              <tr>
                <th>级数</th>
                <th>应纳税所得额</th>
                <th>税率(%)</th>
                <th>速算扣除数</th>
              </tr>
              <tr>
                <td>1</td>
                <td>超过0元至20000元的部分</td>
                <td>20</td>
                <td>0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>超过20000元至50000元的部分</td>
                <td>30</td>
                <td>2000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>超过50000元的部分</td>
                <td>40</td>
                <td>7000</td>
              </tr>
          </table>-->
          <!-- <p class="helpcontent">
            2019年劳务报酬所得适用税率表如下：<br>


            例如，当次提现金额为3000元，则预扣预缴个税=（3000-800）*20%=440元；<br>

            如当次提现金额为10000元，则则预扣预缴个税=（10000-10000*20%）*20%=1600元；<br>

            如当次提现金额为20000元，则则预扣预缴个税=（20000-20000*20%）*20%=3200元；<br>

            如当次提现金额为30000元，则则预扣预缴个税=（30000-30000*20%）*30%-2000=5200元<br>



            （2）合作商<br>

            针对合作商从平台获得收益的，合作商需按收益所得提供管理服务类发票至公司方可完成提现<br>



            （3）省区总<br>

            针对省区总从平台获得收益的，因省区总为公司员工，有固定工资，故此收益为该员工绩效奖金，并入工资一同发放，并计算个税。
          </p>-->
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getStorage, back } from "@/utils";
export default {
  data () {
    return {
      topheader: {
        name: '店铺资产',
        left: '0',
        heade: 'header'
      },
      type: '1', // 省区总合作商推广员推广首页
      havecard: false,
      help: {
        onoff: false,
      },
      store: '',
      status1: '',
      status2: ''
    }
  },
  components: {
  },
  methods: {
    goback () {
      if (this.help.onoff) {
        this.help.onoff = !this.help.onoff
        this.topheader.name = '店铺资产'
      } else {
        this.$router.go(-1)
      }
    },
    tohelp () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '帮助','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.help.onoff = true
      this.topheader.name = '帮助'
      this.topheader.right6 = ''
    },
    tomoneyrecord () {
      this.$router.push('/MoneyRecord')
    },
    togetmoneyrecord () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '提现明细','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/GetMoneyRecord', query: { id: this.$route.query.id } })
    },
    toinvoice(){
            if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '开票记录','' ,'' , '']);//其中灰色的为选填项
      
         }
    this.$router.push({ path: '/InvoiceList', query: { id: this.$route.query.id } })
    },
    tocollect () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '收款结算','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/Collect', query: { id: this.$route.query.id } })
    },
    tothin () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '收支汇总','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/MoneyThin', query: { id: this.$route.query.id } })
    },
    togetmoney () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '提现','' ,'' , '']);//其中灰色的为选填项
      
         }
      if (this.havecard) {
        this.$router.push({ path: '/GetMoney', query: { id: this.$route.query.id } })
      } else {
        this.$toast('请绑卡后提现')
        if (getStorage(this.$route.query.id, 24)) {
          this.$router.push({ path: '/BindCard', query: { id: this.$route.query.id, wait: true } })
        } else {
          this.$router.push({ path: '/BindCard', query: { id: this.$route.query.id, bcRegisterType: sessionStorage.getItem('bcRegisterType') } })
        }
      }

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
          this.store = res.data.data
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })

      this.shopApi.monebankyy(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        if (res.data.status == 1) {
          this.status2 = res.data.data.status
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
    this.toback()
    this.getdata()
    this.status1 = this.$route.query.status
    // this.$store.commit('SET_TYPE', sessionStorage.getItem('accountType'))
    // this.$store.commit('SET_USERID', sessionStorage.getItem('accountId'))
    // console.log(sessionStorage.getItem('accountId'),this.$store.state.user)
    let para2 = {
      storeId: this.$route.query.id
    }
    this.Api.getCardstore(para2).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      if (res.data.data.list.length > 0) {
        this.havecard = true
      } else {
        this.havecard = false
      }
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
<style scoped>
.home-content {
  width:85%;
  height:192px;
  background:linear-gradient(123deg,rgba(0,171,238,1) 0%,rgba(9,109,227,1) 100%);
  border-radius:10px;
  margin: 25px 7.5%;
  position: relative;
  overflow: hidden;
}
.home-cir{
    background: #01ACEF;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    
}
.home-cirl{
  left: -130px;
  top: -130px;
  opacity: .2;
}
.home-cirr{
  right: -40px;
  bottom: -100px;
  opacity: .3;
}
.content-center {
  /* text-align: center; */
  padding-top: 10px;
  position: relative;
}
.content-money {
  font-size: 28px;
  line-height: 36px;
  color: #fff;
  margin-top: 4px;
  margin-left: 20px;
  position: absolute;
  top: 55px;
}
.content-intro {
  font-size: 12px;
  line-height: 17px;
  color: #fff;
  margin-top: 18px;
  margin-left: 26px;
  position: absolute;
}
.content-getmoney {
  width: 70px;
  height: 30px;
  position: absolute;
  top: 80px;
  font-size: 16px;
  line-height: 28px;
  margin-top: 40px;
  color: #ffffff;
  text-align: center;
  left: 26px;
  background:rgba(82,166,255,1);
border-radius:22px;
border:1px solid rgba(116,184,255,1);
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
.tohelp{
position: absolute;
  right: 28px;
  top: 28px;
}

.cellte{
  text-align: right;
  display: block;
  color: #999;
  font-size: 14px;
}
</style>
