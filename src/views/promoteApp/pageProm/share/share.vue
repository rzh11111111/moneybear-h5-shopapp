<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <van-cell-group>
      <van-cell title="店铺绑定的会员账号" title-style="max-width:80%;font-weight:700;">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<template slot="right-icon">-->
        <!--<div class="share-bindbind blueborder bluecolor" v-if="!bind" @click="tobind">绑定</div>-->
        <!--<div class="share-bindbind blueborder bluecolor" v-else @click="tobind2">解绑</div>-->
        <!--</template>-->
      </van-cell>
      <div class="share-bind">
        <div v-if="!bind" class="share-bindfalse">
          <p class="share-bindp">未绑定会员账号</p>
          <!--<p class="share-bindp">绑定后持续获得分享红包</p>-->
        </div>
        <div v-else class="share-bindfalse">
          <p
            class="share-bindp"
          >{{member.shareMember?(member.shareMember.nickname?member.shareMember.nickname:'暂无昵称'):''}}</p>
          <p class="share-bindp">{{phone}}</p>
          <!--<div class="share-bindbind" @click="tobindcard" style="right: 0;padding-right: 0;">-->
          <!--<p class="rightlcon3"><van-icon name="qr" size="25px"/></p>-->
          <!--<p  style="white-space:nowrap">分享码</p></div>-->
        </div>
      </div>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="该会员的分享数据" title-style="max-width:80%;font-weight:700;">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<template slot="right-icon"> <div class="share-bindbind blueborder bluecolor" @click="getmoney" v-if="bind">提现</div></template>-->
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
          <p>积累红包收益</p>
          <p class="share-te">￥{{luck}}</p>
        </div>
        <div>
          <p>红包收益余额</p>
          <p class="share-te">￥{{lucks}}</p>
        </div>
      </div>
    </van-cell-group>
    <van-popup v-model="help.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <p class="helptitle">绑定会员账号</p>
          <p class="helpcontent">
            平台新用户到店消费将成为您店铺绑定会员的被分享人。
            <br />
          </p>
          <p class="helptitle">红包门槛</p>
          <p class="helpcontent">
            <!--1、当日订单，T+1后方可提现。<br>-->
            <template v-for="(item,index) in spends">
              · 用户实付{{item/100}}元，分享人得{{gets[index]/100}}元；
              <br />
            </template>
          </p>
          <p class="helptitle">待入账和提现</p>
          <p class="helpcontent">
            用户线上消费、且订单完成后，红包收益入账到余额
            <br />需下载省钱熊APP提现
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { phonestar, accDiv } from '@/utils'
export default {
  name: "share",
  data () {
    return {
      topheader: {
        name: '分享会员',
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
      if (this.member && this.member.shareMember) {
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
        this.topheader.name = '分享会员'
        this.topheader.right6 = true
      } else {
        this.$router.go(-1)
      }
    },
    tohelp () {
      this.help.onoff = true
      this.topheader.name = '帮助'
      this.topheader.right6 = false
    },

  },
  mounted () {
    console.log('111')
    if (this.$route.query.memberid) {
      this.bind = true
      let para = {
        storeId: this.$route.query.id,
      }
      this.Api.shareMembers(para).then(res => {
        console.log(res)
        if (res.data && res.data.status === 1) {
          this.member = res.data.data
        }
      })

      let para2 = {
        memberId: this.$route.query.memberid,
      }
      this.Api.shareStatus(para2).then(res => {
        console.log(res)
        if (res.data && res.data.status === 1) {
          this.status = res.data.data
        }
      })

    } else {
      this.bind = false
    }
    this.Api.shareRed({}).then(res => { //用户花钱用户分享人得到的红包
      console.log(res)
      if (res.data && res.data.status === 1) {
        this.spends = res.data.data.shareMoneyPosition.split(",")
        this.gets = res.data.data.shareMoneyPositionReward.split(",")

        if (this.spends.length > this.gets.length) {  //防止出bug
          this.gets.length = this.spends.length
        } else if (this.spends.length < this.gets.length) {
          this.spends.length = this.gets.length
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
.share-bind {
  padding: 10px 15px;
  .share-bindfalse {
    position: relative;
    .share-bindp {
      font-size: 14px;
      line-height: 30px;
      color: #888;
    }
  }
}
.share-bindbind {
  font-size: 12px;
  padding: 0 9px;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  right: 4%;
  font-weight: 700;
  transform: translateY(-50%);
}
.share-data {
  padding: 10px 15px;
  display: flex;
  width: 100%;
  div {
    width: 33%;
    text-align: center;
    font-size: 16px;
    p {
      font-size: 14px;
      color: #999;
      line-height: 30px;
    }
  }
  .te {
    border-right: 1px solid #ebedf0;
  }
  .share-te {
    color: #333;
  }
}
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
