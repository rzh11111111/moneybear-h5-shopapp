<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="list">
      <header class="listtitle">
        <p>{{store.name}}</p>
        <!--{{item.managerCooperation.name}}-->
        <span>商户老板</span>
        <span v-if="store.status==1">正常</span>
        <span v-if="store.status==2">关闭</span>
        <span v-if="store.status==3">冻结</span>
      </header>
      <ul class="listcenter">
        <li style="color: #666;">
          <span>编码：</span>
          <span style="overflow: hidden;text-overflow: ellipsis">{{store.code}}</span>
        </li>
        <li>
          <div>
            <img src="@assets/img/detail/phone.png" />
          </div>
          <a
            :href="'tel:' + store.phone"
            style="color:#0095FD"
            @click.prevent="handleRingup(store.phone)"
          >
            <span>
              <span>{{store.phone}}</span>
            </span>
          </a>
        </li>
      </ul>
      <ul class="listcontent">
        <li @click="area.onoff=!area.onoff;topheader.name='查看辖区'">
          <!--<li>-->
          <div>
            <img src="@assets/img/detail/position2.png" />
          </div>
          <span style="overflow: hidden;text-overflow: ellipsis" v-if="!areaIds">空</span>
          <span
            style="overflow: hidden;text-overflow: ellipsis"
            v-else
          >{{areaIds.province}}{{areaIds.city}}{{areaIds.region}}</span>
        </li>
        <li style="color: #999;">
          <div>
            <img src="@assets/img/detail/people.png" />
          </div>无
        </li>
        <li style="color: #999;">
          <div>
            <img src="@assets/img/detail/datachoose.png" />
          </div>
          <span>{{store.approvalTime |format}}</span>
        </li>
      </ul>
    </div>

    <van-cell-group>
      <van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />
      <van-cell title="资料信息" is-link @click="tochangemaster" />

      <van-cell title="费率" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率'" />
      <!--<van-cell title="切换店铺" is-link @click="shoplist.onoff=!shoplist.onoff;topheader.name='切换店铺'"  v-if="fromrouter==='2'"/>-->
      <van-cell
        title="店铺列表"
        is-link
        @click="shoplist.onoff=!shoplist.onoff;topheader.name='店铺列表'"
        v-if="fromrouter==='1'&&type==3"
      />
      <van-cell title="银行账户" is-link :value="havecard" @click="tobindcard" v-if="fromrouter==='2'" />
    </van-cell-group>
    <van-cell-group v-if="fromrouter==='2'">
      <van-cell title="设置" is-link @click="toset" />
    </van-cell-group>

    <van-cell-group v-if="fromrouter==='1'">
      <van-cell title="推广的特色商户" is-link :value="all.mySpreadStoreCount+'家'" @click="toseed" />
      <van-cell title="推广的同城商户" is-link :value="all.mySpreadShopCityCount+'家'" @click="tolocal" />
    </van-cell-group>

    <van-popup v-model="area.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <choose-area :area="area"></choose-area>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="account.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <van-cell-group>
            <van-cell title="编码" :value="store.code" value-class="colorC0C0C0" />
            <van-cell
              title="入驻时间"
              :value="format(store.approvalTime, 'yyyy-MM-dd hh:mm:ss')"
              value-class="colorC0C0C0"
            />
            <van-cell title="角色" value="商户老板" value-class="colorC0C0C0" />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="账号" :value="store.userName" value-class="colorC0C0C0" />
            <van-cell title="手机号" :value="store.phone" value-class="colorC0C0C0" />
            <van-cell title="邮箱" :value="store.email" value-class="colorC0C0C0" />
          </van-cell-group>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="rate.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <van-cell-group>
            <van-cell title="费率">
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>

            <van-cell
              title="推广特色商户，获得特色商户平台销售额的"
              value="0.3%"
              title-class="leftcolor"
              value-class="rightcolor"
            />
            <van-cell
              title="推广同城企业，获得同城企业平台销售额的"
              value="0.3%"
              title-class="leftcolor"
              value-class="rightcolor"
            />
          </van-cell-group>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="rank.onoff" position="right" :overlay="false" v-if="this.rank.card">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <van-cell-group>
            <van-cell title="账户类型" value="个人账号" value-class="colorC0C0C0" />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="开户名称" :value="rank.card.accountName" value-class="colorC0C0C0" />
            <van-cell title="银行账号" :value="rank.card.bankNo" value-class="colorC0C0C0" />
            <van-cell title="开户银行" :value="rank.card.bankName" value-class="colorC0C0C0" />
            <!--<van-cell title="银行支行"  :value="rank.card.bankBranch"   />-->
          </van-cell-group>
          <van-button type="primary" size="large" @click="todeletecard" class="submitbtn">解除绑卡</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="shoplist.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>

        <div class="list" v-for="item in storelist" :key="item.id" @click="todetails(item)">
          <header class="listtitle">
            <p>{{item.nickName}}</p>
            <span v-if="item.platformStatus==1">正常</span>
            <span v-if="item.platformStatus==2">关闭</span>
            <span v-if="item.platformStatus==3">冻结</span>
            <span v-if="item.type==1">种子店铺</span>
            <span v-if="item.type==2">特色店铺</span>
          </header>
          <ul class="listcontent">
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/position.png" />
              </div>
              <span style="overflow: hidden;text-overflow: ellipsis" v-if="!item&&!item.province">空</span>
              <span
                style="overflow: hidden;text-overflow: ellipsis"
                v-else
              >{{item.province}}{{item.city}}{{item.region}}</span>
            </li>
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/people.png" />
              </div>
              <span style="overflow: hidden;text-overflow: ellipsis">{{item.spreadUsername}}</span>
            </li>
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/datachoose.png" />
              </div>
              <span>{{item.createTime|format }}</span>
            </li>
          </ul>
          <div class="listaside">
            <img src="@assets/img/rightlcon.png" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import chooseArea from '@/components/chooseArea/chooseArea'
import { format, ringup } from "@/utils";

export default {
  name: 'PromotersListDetail',
  data () {
    return {
      format,
      topheader: {
        name: '详情',
        left: '3',
        right1: '',
        heade: 'header1'
      },
      type: '1', // 省区总合作商推广员
      list: '1', // 详情页种类（这里没用，只是当做是从list来）
      fromrouter: '',  //从哪里来
      fromstore: false,  //是否从店铺返回来
      areaIds: '', //辖区id仓超
      name: '',
      lookcard: '',
      area: {  //查看辖区
        onoff: false,
        chooseno: false,
        arealist: []
      },
      shoplist: { //店铺列表
        onoff: false
      },
      account: { //账号信息
        onoff: false
      },
      rate: {  //费率合同
        onoff: false,
      },
      rank: {
        onoff: false,
        card: '',
      },
      havecard: '',
      all: {
        mySpreadShopCityCount: '',
        mySpreadStoreCount: '',
      },
      store: {
        approvalTime: '',
        newfont: '0', // 简介字数
        charactar: '1',
        isEnable: '1', // 0,店铺启用不变
        status: '1', // 0,店铺状态不变
        username: '',
        name: '', // 2,推广员姓名
        createTime: '',
        phone: '',
        verifyCode: '',
        email: '',
        remarks: ''
      },
      storelist: []
    }
  },
  components: {
    chooseArea
  },
  filters: {
    format
  },
  methods: {
    handleRingup (tel) {
      if (!tel) {
        return false;
      }
      ringup(tel);
    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '详情'
      } else if (this.shoplist.onoff) {
        this.shoplist.onoff = !this.shoplist.onoff
        this.topheader.name = '详情'
      } else if (this.account.onoff) {
        this.account.onoff = !this.account.onoff
        this.topheader.name = '详情'
      } else if (this.rate.onoff) {
        this.rate.onoff = !this.rate.onoff
        this.topheader.name = '详情'
      } else if (this.rank.onoff) {
        if (this.$route.query.lookcard) {
          this.$router.go(-1)
        } else {
          this.rank.onoff = !this.rank.onoff
          this.topheader.name = '详情'
        }
      } else {
        this.$router.go(-1)
      }
    },
    todetails (item) {
      this.$router.push({
        path: '/StoreDetail',
        query: { id: item.id, type: this.type, list: this.list, fromrouter: '1', fromstore: true }
      })


    },
    areas (msg) {
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '填写资料'
    },
    getdutyArea0 () { // 辖区列表
      let para = {
        id: this.$route.query.id //如果从详情进入辖区就用传过来的id

        // areaLevel:2
      }
      this.Api.dutyArea0(para).then(res => {
        this.areaIds = res.data.data[0]
        // res.data.data.map(value => {
        //   if(this.areaIds==''){  // 仓超要的格式
        //     this.areaIds=value.areaConfig.id
        //   }else{
        //     this.areaIds+=','+value.areaConfig.id
        //   }
        // })
      }).then(() => {
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    getList () {
      let datejson4 = {
        storeAccountId: this.$route.query.id,
        areaId: this.areaId,
      }
      if (datejson4.areaId === '') {
        return
      }
      this.Api.storeList(datejson4).then(res => {
        if (res.data.data.list) {
          res.data.data.list.map(value => {
            this.$set(this.storelist, this.storelist.length, value)
          })
          // if(this.fromstore){
          //     this.shoplist.onoff=!this.shoplist.onoff;
          //     this.topheader.name='店铺列表'
          // }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    toset () {
      this.$router.push('/SetStore')
    },


    topopularize () {  //id是进入的哪个列表
      this.$router.push({ path: '/PromotersList', query: { id: 3, merManager: this.store.id } })
    },
    // toseed() {
    //     this.$router.push({path: '/PromotersList', query: {id: 4, merManager: this.store.id, mine: true}})
    // },
    tochangemaster () {
      this.$router.push({ path: '/ChangeMaster', query: { id: this.store.id, type: this.type, list: this.list } })
    },
    toseed () {
      this.$router.push({ path: '/PromotersList', query: { id: 5, merManager: this.store.id, mine: true } })
    },
    tolocal () {
      this.$router.push({ path: '/PromotersList', query: { id: 6, merManager: this.store.id, mine: true } })
    },
    tobindcard (msg) {
      if (this.havecard == '未绑定' || msg == '1') {
        this.$router.push({
          path: '/BindCard',
          query: { name: this.store.name, card: this.store.idCard, havecard: this.havecard }
        })
      } else {
        this.rank.onoff = !this.rank.onoff;
        this.topheader.name = '银行账户';
      }

    },

    todeletecard () {
      this.$dialog.confirm({
        title: '',
        message: '您确定要解除绑定的银行卡吗',
      }).then(() => {
        this.deletecard()
      }).catch(() => {

      })

    },
    deletecard () {
      let para = {
        id: this.rank.card.id,
      }
      para.storeId = this.rank.card.cardType == 1 ? this.store.id : ''
      this.Api.deleteCard2(para).then(res => {
        if (res.data.status == 1) {
          // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 3 } })
          this.$router.push({ path: '/ApplyResult', query: { result: '解绑成功' } })
        } else {
          // this.$router.push({
          //   path: '/ApplyResult',
          //   query: { win: false, type: 3, result: res.data.stateMessage }
          // })
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },
  mounted () {
    if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '店主详情','' ,'' , '']);//其中灰色的为选填项
      
         }
    this.type = sessionStorage.getItem('accountType')
    this.list = this.$route.query.list
    this.fromrouter = this.$route.query.fromrouter
    // this.areaIds=this.$route.query.areaIds
    // let para = this.$route.query.id, // 0,挂靠合作商id
    if (this.$route.query.lookcard) {
      this.rank.onoff = !this.rank.onoff;
      this.topheader.name = '银行账户';
    }
    this.name = sessionStorage.getItem('accountName')



    let para = {
      stStoreAccountId: this.$route.query.id,
      delFlag: 0,
      cardType: 1
    }
    /*let formdata = new FormData();
    formdata.set("storeAccountId", this.$route.query.id);*/
    let pata2 = {
      storeAccountId: this.$route.query.id
    }
    this.Api.masterDetail(pata2).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      this.store = res.data.data.storeAccount
      this.all.mySpreadShopCityCount = res.data.data.mySpreadShopCityCount
      this.all.mySpreadStoreCount = res.data.data.mySpreadStoreCount
    }).catch(error => {
      console.log(error)
    })
    this.getdutyArea0()

    // let formdata2=new FormData();
    // formdata2.set("stStoreAccountId",this.$route.query.id);

    this.Api.getCardstore(para).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      if (res.data.data.list.length) {  //WAN全正确
        let card = res.data.data.list.filter(item => {
          return item.cardType == 1
        })
        this.havecard = ''
        card ? this.rank.card = card[0] : this.havecard = '未绑定'

      } else {
        this.havecard = '未绑定'
      }
    }).catch(error => {
      console.log(error)
    })



  },

  beforeRouteEnter (to, from, next) {  // 判断是从列表来还是首页来
    if (from.name == 'StoreDetail' && from.query.fromstore == true) { //列表进店铺详情再进
      next(vm => {
        vm.fromstore = true;
      })
    } else {
      next(() => {
      })
    }

  }
}
</script>

<style scoped lang="scss" type="text/scss">
body {
  background: rgba(245, 245, 249, 1);
}

.rightmap {
  background: rgba(245, 245, 249, 1);
}

.van-cell /deep/ .van-cell__title {
  max-width: none;
}

.van-cell /deep/ .van-cell__value {
  text-align: right;
  display: block;
}

.van-cell /deep/ .rightvalue {
  color: #0095fd !important;
}

.van-cell /deep/ .rightcolor {
  color: #ff3232;
  font-weight: 800;
  font-size: 16px;
}

.van-cell /deep/ .leftcolor {
  color: #666;
  font-size: 14px;
}

.list {
  width: 100%;
  height: 102px;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #fff;
  position: relative;
}

.listtitle {
  width: 90%;
  color: #333;
  font-size: 18px;
  font-weight: 800;
  position: absolute;
  left: 16px;
  top: 16px;
}
.listtitle /deep/ p {
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.listtitle /deep/ span {
  display: inline-block;

  height: 16px;
  padding: 0 3px;
  margin-left: 5px;
  font-weight: 300;
  border-radius: 2px;
  border: 0.5px solid #0095fd;
  color: #0095fd;
  opacity: 0.9;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.listcenter {
  font-size: 12px;
  position: absolute;
  color: #0095fd;
  top: 50px;
  left: 6px;
  display: flex;
  line-height: 14px;
}

/* .listcenter /deep/ li {
        width: 105px;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .listcenter /deep/ img {
        width: 14px;
        height: 14px;
        !*transform: translate(0,+10%);*!
        margin-right: 2px;
    }*/

.listcontent {
  font-size: 12px;
  color: #0095fd;
  position: absolute;
  left: 6px;
  top: 74px;
  display: flex;
  line-height: 14px;
}

/*  .listcontent /deep/ li {
        width: 105px;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .listcontent /deep/ img {
        width: 14px;
        height: 14px;
        !*transform: translate(0,+10%);*!
        margin-right: 2px;
    }*/

.listaside {
  width: 12px;
  height: 12px;
  color: #cbcbcb;
  position: absolute;
  right: 19px;
  top: 22px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
