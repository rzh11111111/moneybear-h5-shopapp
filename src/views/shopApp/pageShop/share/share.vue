<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="share-top">
      <div class="share-cir">

      </div>
      <div class="share-div share-divl">
        <p class="share-div-title">返现收益</p>
        <p class="share-div-p">￥{{luck?luck:0}}</p>
      </div>
      <div  class="share-div share-divr">
        <p  class="share-div-title">推荐顾客(人)</p>
        <p  class="share-div-p">{{status.inviteNum?status.inviteNum:0}}</p>
      </div>
    </div>
    <div class="share-bottom">
        <div class="share-bottom-input"  v-if="bind"  @click="getmoney">前往省钱熊APP提现</div>
        <div  class="share-bottom-input" v-else  @click="tobind">绑定省钱熊会员账号</div>
        <p class="share-bottom-p" v-if="bind">已绑定省钱熊账号 {{phone}} <span @click="tobind2">点击解绑</span></p>
        
    </div>
    <!-- <van-cell-group>
      <van-cell title="店铺绑定的会员账号" title-style="max-width:80%;font-weight:700;">
        <div slot="icon" class="vant-collapse-icon"></div>
        <template slot="right-icon">
          <div class="share-bindbind blueborder bluecolor" v-if="!bind" @click="tobind">绑定</div>
          <div class="share-bindbind blueborder bluecolor" v-else @click="tobind2">解绑</div>
        </template>
      </van-cell>
      <div class="share-bind">
        <div v-if="!bind" class="share-bindfalse">
          <p class="share-bindp">未绑定会员账号</p>
          <p class="share-bindp">绑定后持续获得分享红包收益</p>
        </div>
        <div v-else class="share-bindfalse">
          <p
            class="share-bindp"
          >{{member.shareMember?(member.shareMember.nickname?member.shareMember.nickname:'暂无昵称'):''}}</p>
          <p class="share-bindp">{{phone}}</p>
          <div class="share-bindbind" @click="tobindcard" style="right: 0;padding-right: 0;">
            <p class="rightlcon3">
              <van-icon name="qr" size="25px" />
            </p>
            <p style="white-space:nowrap">分享码</p>
          </div>
        </div>
      </div>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="该会员的分享数据" title-style="max-width:80%;font-weight:700;">
        <div slot="icon" class="vant-collapse-icon"></div>
        <template slot="right-icon">
          <div class="share-bindbind blueborder bluecolor" @click="getmoney" v-if="bind">提现</div>
        </template>
      </van-cell>
      <div class="share-data" v-if="!bind">
        <div class="te">
          <p>分享人数</p>
          <p class="share-te">- -人</p>
        </div>
        <div class="te">
          <p>积累红包收益</p>
          <p class="share-te">￥- -</p>
        </div>
        <div>
          <p>红包收益余额</p>
          <p class="share-te">￥- -</p>
        </div>
      </div>
      <div class="share-data" v-else>
        <div class="te">
          <p>分享人数</p>
          <p class="share-te">{{status.inviteNum?status.inviteNum:0}}人</p>
        </div>
        <div class="te">
          <p>积累红包红包</p>
          <p class="share-te">￥{{luck}}</p>
        </div>
        <div>
          <p>红包收益余额</p>
          <p class="share-te">￥{{lucks}}</p>
        </div>
      </div>
    </van-cell-group> -->
    <van-popup v-model="help.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <!-- <p class="helptitle">绑定会员账号</p> -->
          <p class="helptitle">
            1、将店铺账号与您的省钱熊用户账号绑定。
            <br />
          </p>
          <!-- <p class="helptitle">红包门槛</p> -->
          <p class="helptitle">
            2、当省钱熊新用户扫您店铺收款码付款时，便自动成为您的被分享人。
            <!-- <template v-for="(item,index) in spends">· 用户实付{{item/100}}元，分享人得{{gets[index]/100}}元；</template> -->
          </p>
          <!-- <p class="helptitle">待入账和提现</p> -->
          <p class="helptitle">
            3、此后，被分享人每次使用省钱熊在商城购买或店铺支付(地域不限)，您都能获得返现奖励。
          </p>
          <p class="helptitle">
           4、活动时间：长期有效。
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { phonestar, merchantcode, accDiv } from '@/utils'
export default {
  name: "share",
  data () {
    return {
      topheader: {
        name: '收款返现',
        left: '3',
        heade: 'header1',
        right6: true
      },
      bind: false,
      member: {

      },
      status: {

      },
      help: {
        onoff: false,
      },
      spends: [],//用户花费
      gets: [],//分享人得到

    }
  },
  components: {
  },
  computed: {
    phone () {
      if (this.member.shareMember) {
        return phonestar(this.member.shareMember.phone)
      }
    },
    luck () {
      return this.status.luckmoney ? accDiv(this.status.luckmoney, 100) : 0
    },
    lucks () {
      return this.status.luckmoneyBalance ? accDiv(this.status.luckmoneyBalance, 100) : 0
    }
  },
  methods: {
    goback () {
      if (this.help.onoff) {
        this.help.onoff = !this.help.onoff
        this.topheader.name = '收款返现'
        this.topheader.right6 = true
      } else {
        this.$router.go(-1)
      }
    },
    tobind () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '收款返现数据', '绑定省钱熊会员','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({
        path: '/bind',
        query: {          id: sessionStorage.getItem('storeId'),
          phone: this.$route.query.phone
        }
      })
    },
    tobindcard () {
      let host = ''
      if (process.env.NODE_ENV == 'development') { // 本地

        host = 'http://192.168.30.27'

      } else if (process.env.NODE_ENV == 'production') {
        if (process.env.VUE_APP_FLAG === 'pro') {
          //production 生产环境
          // merchantcode(`https://tuiguang.shengqianxiong8.com/index.html?code=${this.member.shareMember.code}`,this.member.logo)
          host = 'https://tuiguang.shengqianxiong8.com'
        } else if (process.env.VUE_APP_FLAG === 'sit') {
          //test 预发布
          host = 'https://pretuiguang.shengqianxiong8.com'


        } else if (process.env.VUE_APP_FLAG === 'test') {
          //test 测试
          host = 'http://192.168.30.27'

        }
      }
      merchantcode(`${host}/index.html?code=${this.member.shareMember.code}`, this.member.logo)


    },
    tobind2 () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '收款返现', '解绑','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$dialog.confirm({
        message: '是否需要解除绑定'
      }).then(() => {
        let para = {
          storeId: this.$route.query.id,
        }
        this.shopApi.shareUntying(para).then(res => {
          console.log(res)
          if (res.data && res.data.status === 1) {

            this.$router.go(-1)
          }
        })
      }).catch(() => {

      })

    },
    inputblur () {

    },
    tohelp () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '收款返现', '说明','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.help.onoff = true
      this.topheader.name = '说明'
      this.topheader.right6 = false
    },
    getmoney () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '收款返现', '前往省钱熊提现','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$dialog.alert({
        message: '需在省钱熊APP提现'
      }).then(() => {
        // on close
      });
    },
    getstatus () {
      let para2 = {
        memberId: this.member.shareMember.id,
      }
      this.shopApi.shareStatus(para2).then(res => {
        console.log(res)
        if (res.data && res.data.status === 1) {
          this.status = res.data.data
        }
      })
    }
  },
  mounted () {


    let para = {
      storeId: this.$route.query.id,
    }
    this.shopApi.shareMembers(para).then(res => {
      console.log(res)
      if (res.data && res.data.status === 1) {
        this.member = res.data.data
        if (this.member.shareMember) {
          this.getstatus()
          this.bind = true
        } else {
          this.bind = false
        }

      } else {
        this.bind = false
      }
    }).catch(() => {
      this.bind = false
    })

    // this.shopApi.shareRed({}).then(res => { //用户花钱用户分享人得到的红包
    //   console.log(res)
    //   if (res.data && res.data.status === 1) {
    //     this.spends = res.data.data.shareMoneyPosition.split(",")
    //     this.gets = res.data.data.shareMoneyPositionReward.split(",")

    //     if (this.spends.length > this.gets.length) {  //防止出bug
    //       this.gets.length = this.spends.length
    //     } else if (this.spends.length < this.gets.length) {
    //       this.spends.length = this.gets.length
    //     }
    //   }
    // })
  }
}
</script>

<style scoped lang="scss">
.share-top{
  width: 100%;
  height: 220px;
  background:rgba(9,109,227,.9);
  background:linear-gradient(to top,rgba(9,109,227,.9) 0%,rgba(9,185,254,.9) 100%);
  position: relative;
  overflow: hidden;
  .share-cir{
    width: 440px;
    height: 440px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    background: #00A7FC;
    box-shadow:0 0 5px 5px #00A7FC;
    border: 1px solid #00A7FC;
  }
}
.share-bottom{
  width: 100%;
  height: calc(100vh-264px);
  background:linear-gradient(to bottom,rgba(9,109,227,.9) 0%,#fff 50%);
  position: relative;
}
.share-div{
  text-align: center;
  position: absolute;
  bottom: 0px;
  color: #fff;
  .share-div-title{
    font-size: 14px;
    opacity: .8;
  }
  .share-div-p{
    font-size: 44px;
  }
}
.share-divl{
  left: 33px;
}
.share-divr{
  right: 33px;
}
.share-bottom-input{
  width: 300px;
  height: 50px;
  font-size: 16px;
  color: #0095FD;
  line-height: 50px;
  border: 1px solid #0095FD;
  background: #fff;
  border-radius: 50px;
  text-align: center;
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.share-bottom-input:active{
  background: rgb(233, 233, 233);
  // color: #fff;
}
.share-bottom-p{
  width: 100%;
  color: #999999;
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 50px;
  span{
    color: #666;

  }
}
// .share-bind {
//   padding: 10px 15px;
//   .share-bindfalse {
//     position: relative;
//     .share-bindp {
//       font-size: 14px;
//       line-height: 30px;
//       color: #888;
//     }
//   }
// }
// .share-bindbind {
//   font-size: 12px;
//   padding: 0 9px;
//   border-radius: 3px;
//   position: absolute;
//   top: 50%;
//   right: 4%;
//   font-weight: 700;
//   transform: translateY(-50%);
// }
// .share-data {
//   padding: 10px 15px;
//   display: flex;
//   width: 100%;
//   div {
//     width: 33%;
//     text-align: center;
//     font-size: 16px;
//     p {
//       font-size: 14px;
//       color: #999;
//       line-height: 30px;
//     }
//   }
//   .te {
//     border-right: 1px solid #ebedf0;
//   }
//   .share-te {
//     color: #333;
//   }
// }
.rightlcon3 {
  text-align: center;
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
