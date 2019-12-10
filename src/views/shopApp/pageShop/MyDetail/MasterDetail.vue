<template>
  <div class="app-init">
    <!-- <top-column :top-header="topheader"></top-column> -->
    <div class="list">
      <header class="listtitle">
        <div class="list-logo" @click.stop="imgBig()">
            <img :src="store.store?store.store.logo:logo" alt />
          </div>
        <div class="list-title"  @click="tochangemaster" >
          <p   class="list-name">{{store.store?store.store.name:''}}</p>
          <div  class="list-user">
            <p  class="list-user-1">{{store.store?store.storeAccount.name:''}}</p>
            <p class="list-user-te">|</p>
            <p>店主</p>
            </div>
          </div>
          
        
        
      </header>
      <div class="list-img">
            <img src="@/assets/img/detailback.png"/>
          </div>
    </div>

    
     <van-cell title="用户付款语音提醒" class="kaiguan">
              <template slot="title">
                <span class="custom-text">语音播报</span>
                <!-- <van-icon name="question-o" @click="tohelp" size="20px" class="custom-texticon"/> -->
              </template>
              <van-switch v-model="checked" @input="onInput" size="20px" />
      </van-cell>
      <van-cell title="基本信息" is-link @click="tochangemaster" />
      <van-cell title="账号安全" is-link value=" " @click="toset(true)"/>
      <van-cell title="检查更新" is-link  @click="toupdata"/>
      <van-cell title="清除缓存" is-link  @click="todeletesave"/>
      <van-cell-group>
      <van-cell title="关于我们" is-link value=" " @click="toset(false)"/>
      <van-cell title="联系我们" is-link value-class='blackcolor2' :value="store.spreadName+store.spreadPhone" @click="services.onoff=true" />
      
    </van-cell-group>
    <homeFooter :actives=1></homeFooter>
    <van-action-sheet
      v-model="services.onoff"
      :actions="services.actions"
      cancel-text="取消"
      @select="onSelect"
    >
    <a :href="'tel:'+store.spreadPhone" class="action-p" @click.prevent="handleRingup(store.spreadPhone)">{{store.spreadPhone}}</a>
    <a  class="action-p blackcolor" @click.prevent="services.onoff=false;services.onoff2=true;">已联系专属经理，问题未解决</a>
    </van-action-sheet>
    <van-action-sheet
      v-model="services.onoff2"
      :actions="services.actions"
      cancel-text="取消"
      @select="onSelect2"
    >
    <a href="tel:400520186" class="action-p" @click.prevent="handleRingup(400520186)">400-520-186</a>
    <!-- <a  class="action-p blackcolor" @click.prevent="handleRingup(400520186)">已联系专属经历，问题未解决</a> -->
    </van-action-sheet>
    
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
            <van-cell title="编码" :value="store.storeAccount?store.storeAccount.code:' '" value-class="colorC0C0C0" />
            <van-cell
              title="入驻时间"
              :value="format(store.storeAccount?store.storeAccount.approvalTime:'', 'yyyy-MM-dd hh:mm:ss')"
              value-class="colorC0C0C0"
            />
            <van-cell title="角色" value="商户老板" value-class="colorC0C0C0" />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="账号" :value="store.storeAccount?store.storeAccount.userName:' '" value-class="colorC0C0C0" />
            <van-cell title="手机号" :value="store.storeAccount?store.storeAccount.phone:' '" value-class="colorC0C0C0" />
            <van-cell title="邮箱" :value="store.storeAccount?store.storeAccount.email:' '" value-class="colorC0C0C0" />
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
              title="管辖区域内种子商户,特色商户平台销售额的"
              value="0.3%"
              title-class="leftcolor"
              value-class="rightcolor"
            />
            <van-cell
              title="管辖区域内同城企业平台销售额的"
              label="注：自己开发的不重复提成，最多就0.3%提成"
              value="0.3%"
              title-class="leftcolor"
              value-class="rightcolor"
            />
            <van-cell
              title="配送平台商品，火的该商品订单价格的"
              label="注：配送费由商品所属企业承担"
              value="3%"
              title-class="leftcolor"
              value-class="rightcolor"
            />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="合同照片">
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <div>注：必须包含首页,费率页,合作期限页,签章页。</div>
          </van-cell-group>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="rank.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <van-cell-group>
            <van-cell title="账户类型" v-if="rank.card.type==2" value="对公账号" />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="开户名称" :value="rank.card.accountName" />
            <van-cell title="银行账号" :value="rank.card.bankNo" />
            <van-cell title="开户银行" :value="rank.card.bankType" />
            <van-cell title="银行支行" :value="rank.card.bankBranch" />
          </van-cell-group>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="shoplist.onoff" position="right" :overlay="false">
      <div class="rightmap" style="margin-top: 44px;">
        <div
          class="list"
          v-for="(item,index) in storelist"
          :key="index"
          @click="todetailss(item.id)"
        >
          <div class="listtitle">
            <p>{{item.nickName}}</p>
            <span v-if="item.platformStatus==1">正常</span>
            <span v-if="item.platformStatus==2">关闭</span>
            <span v-if="item.platformStatus==3">冻结</span>
          </div>
          <ul class="listcontent">
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/position.png" />
              </div>
              <span
                style="overflow: hidden;text-overflow: ellipsis"
              >{{item.province}}{{item.city}}{{item.region}}</span>
            </li>
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/people.png" />
              </div>
              <span>{{item.spreadUsername}}</span>
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
import homeFooter from '@/components/homeFooter/index'
import { format, voiceSwitch,exitvoice, setStorage, getStorage , ringup,appUpdate } from "@/utils";
import { ImagePreview } from 'vant';
export default {
  name: 'MasterDetail',
  data () {
    return {
      format,
      topheader: {
        name: '',
        // left: '3',
        right1: '',
        heade: 'header1'
      },
      type: '1', // 省区总合作商推广员
      list: '1', // 详情页种类（这里没用，只是当做是从list来）
      fromrouter: '',  //从哪里来
      areaIds: '', //辖区id仓超
      name: '',
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
      services: {
        onoff:false,
        onoff2:false,
        actions:[
          // {name: "客服电话", subname: '400-520-186'}
        ],
        
      },
      logo: require('@/assets/img/shopImg.png'),
      rank: {
        onoff: false,
        card: '',
      },
      havecard: '',
      checked: true, //开关
      storeAccount: {
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
      store: {

      },
      storelist: [

      ]
    }
  },
  components: {
     chooseArea,homeFooter
  },
  filters: {
    format
  },
  methods: {
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
        this.rank.onoff = !this.rank.onoff
        this.topheader.name = '详情'
      } else {
        this.$router.go(-1)
      }
    },
    imgBig () {
      this.$store.commit('SET_INSTANCE', ImagePreview([
        this.store.store.logo,
      ]))
    },
    todetailss (item) {


      // this.exitvoice(item)

      this.session.$setSessionStorageByName('storeId', item)

      this.savestore(sessionStorage.getItem('id'), item)

      this.$router.go(-1)
      // this.$router.replace({path:'/shophome',query:{switch:'switch'}})

    },
    onSelect(item) {
      
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      console.log(item)
    },
    onSelect2(item){
      this.show = false;
      console.log(item)
    },
    savevoice(id,storeid,checked){
      checked?voiceSwitch(true):voiceSwitch(false)
       let store = getStorage('store', 1000);
      if (store) {   //如果有缓存
        let index = store.findIndex(item => item.id ? item.id === id : false);
        if (index > 0) {   //如果能找到store的id

          let storeindex = store[index].store.findIndex(item => item.storeid ? item.storeid === storeid : -1)
          console.log(storeindex)
          if (storeindex < 0) {  //如果数组里没有当前登录store
            store[index].defaultid = storeid   //增加一个store并且切换默认店铺
            store[index].defaultvoice = checked
            store[index].store.push({
              storeid: storeid,
              voice: checked
            })

          } else {   //如果数组里有当前登录store
          store[index].store[storeindex].voice=checked
            store[index].defaultid = storeid
            store[index].defaultvoice = checked
          }
        } else {  //如果有store不是我现在弄得，弄一个新的缓存
          store = [{
            id: id,
            defaultid: storeid,
            defaultvoice: checked,
            store: [{
              storeid: storeid,
              voice: checked
            }]
          }]
        }

      } else {  //直接做个现在的店铺的缓存
        store = [{
          id: id,
          defaultid: storeid,
          defaultvoice: checked,
          store: [{
            storeid: storeid,
            voice: checked
          }]
        }]
      }



      setStorage('store', store)
      // alert(JSON.stringify(getStorage('store',1000)))
      
    },
    savestore (id, storeid) {  //缓存要去的店铺和语音播报开关

      let store = getStorage('store', 1000);
      if (store) {   //如果有缓存
        let index = store.findIndex(item => item.id ? item.id === id : false);
        if (index > 0) {   //如果能找到store的id

          let storeindex = store[index].store.findIndex(item => item.storeid ? item.storeid === storeid : -1)
          console.log(storeindex)
          if (storeindex < 0) {  //如果数组里没有当前登录store
            store[index].defaultid = storeid   //增加一个store并且切换默认店铺
            store[index].defaultvoice = true
            store[index].store.push({
              storeid: storeid,
              voice: true
            })

          } else {   //如果数组里有当前登录store
            store[index].defaultid = storeid
            store[index].defaultvoice = store[index].store[storeindex].voice
          }
        } else {  //如果有store不是我现在弄得，弄一个新的缓存
          store = [{
            id: id,
            defaultid: storeid,
            defaultvoice: true,
            store: [{
              storeid: storeid,
              voice: true
            }]
          }]
        }

      } else {  //直接做个现在的店铺的缓存
        store = [{
          id: id,
          defaultid: storeid,
          defaultvoice: true,
          store: [{
            storeid: storeid,
            voice: true
          }]
        }]
      }



      setStorage('store', store)

    },
    areas (msg) {
      console.log(msg)
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '填写资料'
    },

    getdutyArea0 () { // 辖区列表
      let para = {
        id: sessionStorage.getItem('id')

        // areaLevel:2
      }
      this.Api.dutyArea0(para).then(res => {
        console.log(res)
        res.data.data.map(value => {
          if (this.areaIds == '') {  // 仓超要的格式
            this.areaIds = value.areaConfig.id
          } else {
            this.areaIds += ',' + value.areaConfig.id
          }
        })
      }).then(() => {
        this.getList()
      }).catch(error => {
        console.log(error)
      })
    },
    tohelp(){
      if(this.checked){
        this.$dialog.alert({
          title: '语音播报',
          message: `1、“省钱熊商户”的系统通知须开启。<br>2、手机不能处于静音或省电模式。`
        })
      }else{
         this.$dialog.alert({
          title: '语音播报',
          message: `1、“省钱熊商户”的系统通知须开启。<br>2、手机不能处于静音或省电模式。`
        })
      }
    },
    getList () {
      let datejson4 = {
        storeAccountId: sessionStorage.getItem('id'),
        areaId: this.areaId,
      }
      this.Api.storeList(datejson4).then(res => {
        if (res.data.data.list) {


          res.data.data.list.map(value => {
            // console.log(this.store, this.store.length, value)
            this.$set(this.storelist, this.storelist.length, value)
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    toset (type) {
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '账号安全关于我们','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/SetStore', query: { id: sessionStorage.getItem('id'),type:type } })
    },
    onInput (checked) {
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '语音播报','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$dialog.confirm({
        title: '提醒',
        message: '是否切换开关？'
      }).then(() => {
        console.log(checked)
        this.savevoice(sessionStorage.getItem('id'), sessionStorage.getItem('storeId'), checked)

      }).catch(() => {
        this.checked = !checked;
      });

    },
    topopularize () {  //id是进入的哪个列表
      this.$router.push({ path: '/PromotersList', query: { id: 3, merManager: this.store.storeAccount.id } })
    },
    toseed () {
      this.$router.push({ path: '/PromotersList', query: { id: 4, merManager: this.store.storeAccount.id, mine: true } })
    },
    updateApp(an,ping,updata,content){
     
            console.log(content)
            let myDate = new Date();
            if(updata===1){ //强更
                if (process.env.VUE_APP_FLAG === 'pro') {
                    //production 生产环境
                    appUpdate(an,ping,updata,'http://download.shengqianxiong8.com/app2-release.apk',content,true)
                }else {
                    // if(this.local.$getLocalStorageByName('appUpdate')!=myDate.getDate()){
                        if (process.env.NODE_ENV == 'development') { // 本地
                            // host = Config.devhost
                            appUpdate(an,ping,0,'http://download.shengqianxiong8.com/app2-release.apk',content,true)
                        } else if (process.env.VUE_APP_FLAG === 'sit') {
                                //test 预发布
                                appUpdate(an,ping,0,'http://download.shengqianxiong8.com/app2-release.apk',content,true)

                            } else if (process.env.VUE_APP_FLAG === 'test') {
                                //test 测试
                                appUpdate(an,ping,0,'http://download.shengqianxiong8.com/app2-release.apk',content,true)

                            }

                    }
                     setTimeout(() => {

                      // this.$toast('已是最新版本')
                    }, 0);
                    
                    this.local.$setLocalStorageByName('appUpdate', myDate.getDate())
                // }
            }else{
               
                // if(this.local.$getLocalStorageByName('appUpdate')!=myDate.getDate()){

                    if (process.env.NODE_ENV == 'development') { // 本地
                        // host = Config.devhost
                        appUpdate(an,ping,updata,'http://download.shengqianxiong8.com/app2-release.apk',content,true)
                    } else if (process.env.NODE_ENV == 'production') {
                        if (process.env.VUE_APP_FLAG === 'pro') {
                            //production 生产环境
                            appUpdate(an,ping,updata,'http://download.shengqianxiong8.com/app2-release.apk',content,true)
                        } else if (process.env.VUE_APP_FLAG === 'sit') {
                            //test 预发布
                            appUpdate(an,ping,updata,'http://download.shengqianxiong8.com/app2-release.apk',content,true)

                        } else if (process.env.VUE_APP_FLAG === 'test') {
                            //test 测试
                            appUpdate(an,ping,updata,'http://download.shengqianxiong8.com/app2-release.apk',content,true)

                        }
                    }

                // }
                // this.$toast('已是最新版本')
                this.local.$setLocalStorageByName('appUpdate', myDate.getDate())
            }

        },
    toupdata(){
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '检查更新','' ,'' , '']);//其中灰色的为选填项
      
         }
      let an = '1.0.6'
    let ping = '1.0.6'
    let updata = 0
    let content = '1、新增电子合同功能。\n' 
    // +
    //   '2、语音播报优化\n' +
    //   '3、营业时间可按月份、星期、时段设置'
            this.updateApp(an,ping,updata,content)
      // this.$toast('已是最新版本')
    },
    todeletesave(){
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '清除缓存','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$toast('已清除，回到首页')
      setTimeout(() => {
// this.$toast.loading({
//         duration: 0,       // 持续展示 toast
//         mask: true,
//         message: '加载中...'
//       });
      window.location.href = this.HTTPLOCAT + '/shopApp.html?time=' + ((new Date()).getTime());
        
      }, 1500);
        
   
    },
    tochangemaster () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '基本信息','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/ChangeMaster', query: { id: this.store.storeAccount.id, type: this.type ,bcRegisterType:this.store.storeBankCard?this.store.storeBankCard.bcRegisterType:false} })
    },
    tolocal () {
      this.$router.push({ path: '/PromotersList', query: { id: 6, merManager: this.store.storeAccount.id, mine: true } })
    },
    exitvoice (para) {
      exitvoice(para)
      // window.location.href =`qtkjshop://JPushExit?storeId=${this.$route.query.storeid}`
    },
    handleRingup(tel) {
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '联系客服','' ,'' , '']);//其中灰色的为选填项
      
         }
      if (!tel) {
        return false;
      }
      ringup(tel);
    },

  },
  mounted () {
    this.type = sessionStorage.getItem('accountType')
    this.name = sessionStorage.getItem('accountName')
    let para2 = {
      storeId:sessionStorage.getItem('storeId')
    }
    this.Api.storedetails(para2).then(res => {
          console.log(res.data)
      this.store = res.data.data
  
    }).catch(error => {
      console.log(error)
    })
    this.getdutyArea0()
    let stores=getStorage('store',1000)
    console.log(stores)
    let index=stores.findIndex(item => item.id ? item.id === sessionStorage.getItem('id') : false)
    this.checked=stores[index].defaultvoice
    // alert(index)
    //  alert(JSON.stringify(getStorage('store',1000)))
  },
 
}
</script>

<style scoped lang="scss" type="text/scss">
/*.van-popup{*/
/*overflow: initial;*/
/*}*/
// @import '~@/assets/img/detailback.png';
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
.list-logo {
      width: 50px;
      height: 50px;
      background:rgba(216,216,216,1);
      opacity:0.85;
      border:2px solid rgba(255,255,255,1);
      border-radius: 50%;
      overflow: hidden;
      margin: 10px 10px 0 0px;
      img {
        width: 100%;
        height: 100%;
      }
    }
.list {
  width: 100%;
  height: 102px;
  background: #00a7fc;
  background: linear-gradient(to bottom, #00a7fc 0%, #0088fd 100%);
  // background-image: url('~@/assets/img/detailback.png');
  // margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  .list-img{
    width:100%;
    height:100%;
    position: absolute;
    right:0;
    bottom:0;
    img{
      width:100%;
      height:100%;
    }
  }
}
.listtitle {
  width: 90%;
  color: #333;
  font-size: 18px;
  font-weight: 800;
  position: absolute;
  left: 16px;
  top: 16px;
  align-items: flex-start;
  // cursor: pointer;
  .list-title{
    width:70%;
   margin-top: 10px;
   z-index: 2;
  .list-name{
      color: #fff;
      font-size:15px;
    }
  .list-user{
    // max-width: 50%;
    color:#fff;
    font-size:12px;
    line-height:32px;
     display: flex;
      
  
  }
  .list-user-1{
    max-width: 70%;
    // height: 32px;
      overflow: hidden;
    text-overflow: ellipsis;
  white-space: nowrap;
  }
  .list-user-te{
  //   max-width: 50%;
  //   height: 32px;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // white-space: nowrap;
  margin: 0 10px;
  }
  }
  
}
// .listtitle /deep/ p {
//   max-width: 50%;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   cursor: pointer;
// }
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


.listcontent {
  font-size: 12px;
  color: #0095fd;
  position: absolute;
  left: 6px;
  top: 74px;
  display: flex;
  line-height: 14px;
}

.listaside {
  width: 12px;
  height: 12px;
  color: #cbcbcb;
  position: absolute;
  right: 19px;
  top: 22px;
  img {
    width: 100%;
  }
}
.action-p{
  width:100%;
  font-size:16px;
  line-height:50px;
  display: inline-block;
  text-align: center;

  
  background:#fff;
  color:#0088FD;
  height:50px;
}
.action-p:active{
  // background:#ebedf0;
  background:rgba(235,237,240,.8);
}
.blackcolor{
  color: #000;
}
.blackcolor{
  color: #333;
}
.custom-texticon{
  position: absolute;
  top: 15px;
  margin-left: 10px;
}
</style>
