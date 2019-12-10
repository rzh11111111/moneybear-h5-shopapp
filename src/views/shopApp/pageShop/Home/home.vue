<template>
  <div style="background:#fff;height:100vh;">
    <top-bars :top-header="topheader" :storename="storeData.nickName" @tominedetail="tominedetail" @tobingcard="tobingcard"></top-bars>
    <van-notice-bar
      :scrollable="false"
      v-if="storeData.contractStatus!==0&&!storeData.contractPicUrls"
      left-icon="info-o"
      mode="closeable"
      style="width: 100%;"
    >
      <div style="display: flex;font-size: 12px;justify-content: space-between">
        <p style='width:70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>{{hetong}}</p>
        <p class="bluecolor" v-if="storeData.contractStatus==2||storeData.contractStatus==3" @click="cause=true">查看原因</p>
        <p class="bluecolor" v-else @click="tocontract">去签合同</p>
      </div>
    </van-notice-bar>
    <van-notice-bar
      :scrollable="false"
      v-else-if="!storeData.shareMember&&storeData.platformStatus=='1'"
      left-icon="info-o"
      mode="closeable"
      style="width: 100%;"
    >
      <div style="display: flex;font-size: 12px;justify-content: space-between">
        <p style>绑定省钱熊账号享奖励。</p>
        <p class="bluecolor" @click="memberok">立即绑定</p>
      </div>
    </van-notice-bar>
    <van-notice-bar
      :scrollable="false"
      v-else-if="storeData.platformStatus=='2'"
      left-icon="info-o"
      mode="closeable"
    >店铺已被关闭，能提现收益，不能推广</van-notice-bar>
    <van-notice-bar
      :scrollable="false"
      v-else-if="storeData.platformStatus=='3'"
      left-icon="info-o"
      mode="closeable"
    >店铺已被冻结，不能提现收益，能推广</van-notice-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="shop-status">
        <div class="shop-box" >
          <div style="height:28px"></div>
          <p  class="shop-box-header">今日收款(元)</p>
          <p  class="shop-box-money" @click="toorder">{{orderObj.orderPrice|currency}}</p>
          <div  class="shop-box-center">
              <p class="shop-box-centerl" @click="toorder">收款  <span  class="shop-box-centerll">{{orderObj.orderNum}} </span>  笔</p>
              <p class="shop-box-centerr" @click="topublic">收款返现  <span  class="shop-box-centerrr">{{((orderData&&orderData.todayRebateMoney)?orderData.todayRebateMoney/100:0.00)|currency}}</span> 元</p>
          </div>
          <div  class="shop-box-bottom">
              <div  class="shop-box-bottoml" @click="tobingcard">
                <svg-icon class="rightIcon" icon-class="home-code"/>
                收款
              </div>
              <div  class="shop-box-bottomr" @click="toorder">
                <svg-icon class="rightIcon" icon-class="home-order"/>
                查单
              </div>
          </div>
        </div>
        
      </div>
      
      <div class="height22"></div>
      <div class="shop-msg" @click="tomessage">
        <svg-icon class="rightIcon" icon-class="home-inform"/>
        <div class="msg-list">
          <template v-if="msgList">
            <div
             
              style="overflow: hidden;white-space:nowrap;text-overflow: ellipsis;font-family:'黑体';font-size: 14px;"
            >
              <span>{{msgList.time}}</span>
              <div class="shop-msg-money" v-if="msgList.notice.tagType===1">{{msgList.money}}</div>
             <div class="shop-msg-money" v-else>+{{msgList.money}}</div>
            
            </div>
            
          </template>
          <p v-else class="no-msgList">暂无消息</p>
        </div>
        
      </div>
      <div class="height22 bg-fff"></div>
      <div class="shop-content-title">
        <div class="title-icon">

        </div>
        <p class="title-p">
          店铺功能
        </p>
      </div>
      
      <div class="shop-menu bg-fff">
        <van-row gutter="20">
          <van-col span="8" v-for="item in list" :key="item.id">
            <div class="shop-menu-list" @click="tomanagement(item)">
              <p>
                <img src="../../../../assets/img/storehome/shopstore.png" alt v-if="item.id==0" />
                <img src="../../../../assets/img/storehome/moneystore.png" alt v-if="item.id==1" />
                <img src="../../../../assets/img/storehome/evaluatestore.png" alt v-if="item.id==2" />
                <img src="../../../../assets/img/storehome/share.png" alt v-if="item.id==3" />
                <img src="../../../../assets/img/storehome/minestore.png" alt v-if="item.id==4" />
                <!-- <img src="../../../../assets/img/storehome/minestore.png" alt v-if="item.id==5" />
                <img src="../../../../assets/img/storehome/commodity.png" alt v-if="item.id==6" /> -->
              </p>
              <p>{{item.name}}</p>
              <p v-if="item.number">{{item.number}}人</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-pull-refresh>
    <!-- <div class="home-bottom" @click="refreshUrl">清除缓存</div> -->
    <!--height: 340px;-->
    <van-popup v-model="qrshow" class="qrtan" style="width: 260px;height: 260px;">
      <vue-qr
        :text="qrCodeUrl"
        v-if="qrCodeUrl"
        colorDark="#000"
        colorLight="#fff"
        :margin="0"
        :logoSrc="storeData.logo"
        :logoScale="0.3"
        :size="200"
        class="qr"
        style="margin: 30px;"
      ></vue-qr>
    </van-popup>
    
    <van-dialog
      v-model="member"
      confirmButtonText="立即绑定"
      showCancelButton
      cancelButtonText="下次再说"
      @confirm="memberok"
      @cancel="membernot"
    >
      <p
        style="margin: 10px 30px;font-size: 13px;line-height: 20px;text-align: center"
      >绑定省钱熊会员APP，可得分享红包</p>
      <p
        style="margin: 20px 10px 10px;font-size: 12px;line-height: 20px;display: flex;align-items: center;justify-content: center"
      >
        <input type="checkbox" v-model="memberkaiguan" id="memberkaiguan" />
        <label for="memberkaiguan" style="margin-left: 5px;">不再提示</label>
      </p>
    </van-dialog>
    <van-dialog
      v-model="seed"
      :title="seedcontent.title"
      confirmButtonText="知道了"
      @confirm="homedialog"
    >
      <p
        style="margin: 10px 30px;font-size: 13px;line-height: 20px;text-align: center"
      >{{seedcontent.content}}</p>
      <p
        style="margin: 20px 10px 10px;font-size: 12px;line-height: 20px;display: flex;align-items: center;justify-content: center"
      >
        <input type="checkbox" v-model="seedkaiguan" id="seedkaiguan" />
        <label for="seedkaiguan" style="margin-left: 5px;">不再提示</label>
      </p>
    </van-dialog>
    <van-dialog
      v-model="contract"
      confirmButtonText="去签合同"
      showCancelButton
      cancelButtonText="查看原因"
      v-if="storeData.contractStatus==3"
      @confirm="tocontract"
      @cancel="cause=true;homedialogtrue()"
    >
      <p
        style="margin: 10px 30px;font-size: 13px;line-height: 20px;text-align: center"
      >{{hetong}}</p>
      
    </van-dialog>
    <van-dialog
      v-model="contract"
      confirmButtonText="去签合同"
      showCancelButton
      cancelButtonText="取消"
      v-if="storeData.contractStatus==1||storeData.contractStatus==4||storeData.contractStatus==5"
      @confirm="tocontract"
      @cancel="cause=false;homedialogtrue()"
    >
      <p
        style="margin: 10px 30px;font-size: 13px;line-height: 20px;text-align: center"
      >{{hetong}}</p>
      
    </van-dialog>
    <van-action-sheet
      v-model="code.show"
      :actions="code.actions"
      cancel-text="取消"
      @select="onSelect"
    />
    <van-popup
  v-model="cause"
  
  position="bottom"
  :style="{ height: '30%' }"
>
<p class="hetong-popt">查看原因</p>
<p class="hetong-popb">原因类型：受渠道成本增长影响。</p>
<p class="hetong-popb">详细说明：{{contractremakes.updateExplain||''}}</p>
<van-button type="primary" size="large" @click="tocontract" class="submitbtn hetong-popbutton">去签合同</van-button>
</van-popup>
     <home-footer :userId="storeData.spreadId" :storeId="storeData.id" :actives=0></home-footer>
  </div>
</template>
<script>
import topBars from '@/components/topBars'
import homeFooter from '@/components/homeFooter'
// import {swiper, swiperSlide} from 'vue-awesome-swiper'
import { ImagePreview } from 'vant';
import vueQr from 'vue-qr'
import { currency, back, voice, voiceSwitch, setStorage, getStorage, loginFirst, accMul ,formNow} from '@/utils';
export default {
  name: 'shophome',
  components: { topBars, vueQr ,homeFooter},
  data () {
    return {
      accMul,
      cause:false, //查看原因
      sortBy: '',
      msgList: '',
      timeTitle: '今日',
      isLoading: false,
      orderObj: {
        orderPrice: '',
        orderNum: ''
      },
      orderData: null,
      topheader: {
        // name: '商户首页',
        left: '4',
        right5: true,
        // right3content: '变更记录',
        heade: 'header1'
      },
      logo: require('@/assets/img/shopImg.png'),
      qrCodeUrl: '',
      qrshow: false,
      storeData: {
        name: '',
        status: '1',
        shareMember: '',
      }, // 店铺
      pagination: {
        page: 1,
        count: 10,
        total: 0
      },
      list: [
        {
          id: 0,
          name: '店铺设置',
          go: '/ShopManagement'
        },
        // {
        //   id: 1,
        //   name: '订单管理',
        //   go: '/OrderManagement'
        // },
        {
          id: 1,
          name: '店铺资产',
          go: '/Money'
        },
        {
          id: 2,
          name: '评价管理',
          go: '/EvaluateManagement'
        },
        
        {
          id: 3,
          name: '收款返现',
          go: '/share'
        },
        {
          id: 4,
          name: '邀店得收益',
          go: '/PromotersList'
        },
        // {
        //   id: 6,
        //   name: '商品',
        //   go: '/Commodity'
        // }

      ],
      swiperOption: {
        notNextTick: true,
        direction: "vertical",   //控制滚动的方向
        paginationClickable: true,
        autoplay: {
          delay: 2000  //这里需要注意，如果想每2秒去自动切换，直接autoplay:2000是失效的，
        },
        loop: true,
        on: {
          //注意点：想要给滚动的列表的每一项加上点击事件，需要在这个回调里面进行，否则不起作用
          /* click: function (e) {let realIndex = this.realIndex;
               vm.jumpDesc(realIndex)  //这里调用的是定义在methods里面的方法
          } */
        }
      },
      topMovieLists: [{ a: '没完成，要修改用户花花朵实付18.5元' }, { a: '用户多多朵朵…实付8888.00元' }], //影视头条列表
      seed: false, //播报
      seedkaiguan: false,
      seedcontent: '',
      member: false,  //绑定会员
      memberkaiguan: false,
      contract:false, //合同
      code:{
        show: false,
        actions: [
          { name: '选项' },
          { name: '选项' },
          { name: '选项', subname: '描述信息' }
        ]
      },
      contractremakes:''
    }
  },
  filters: {
    currency
  },
  computed:{
      hetong(){
        switch(this.storeData.contractStatus){
          case 0:
            return ' '
          case 1:
            return '入驻未完成，请及时签合同。'
          case 2:
            return '合同发生变更，请及时改签。'
          case 3:
            return '合同发生变更，已停用收款功能。请及时续签。'
          case 4:
            return '续签(合同临期)，请及时续签。'
          case 5:
            return '合同已到期，请及时续签。'
            default:
            return ' '
        }
      }
    },
  methods: {
    onRefresh () {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.getinfomation()
      }, 500);
    },
    imgBig () {

      this.$store.commit('SET_INSTANCE', ImagePreview([
        this.storeData.logo,
      ]))
    },
    change(){
         if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '切换店铺','' ,'' , '']);//其中灰色的为选填项
           }
      this.$router.push('/ChangeStore')
    },
    async chooseType (type) {
      if (this.sortBy !== type) {
        this.sortBy = type;
      } else {
        //再次点击相同选项时收回列表
        this.sortBy = "";

      }
    },
    handleTime (val) {
      if (val == 1) {
        this.timeTitle = '今日'
        this.sortBy = "";
        this.orderObj.orderPrice = this.orderData.todayMoney / 100 || '0'
        this.orderObj.orderNum = this.orderData.todayOrderNumber || '0'
      } else if (val == 2) {
        this.timeTitle = '昨日'
        this.sortBy = "";
        this.orderObj.orderPrice = this.orderData.yesterdayMoney / 100 || '0'
        this.orderObj.orderNum = this.orderData.yesterdayOrderNumber || '0'
      } else if (val == 3) {
        this.timeTitle = '本月'
        this.sortBy = "";
        this.orderObj.orderPrice = this.orderData.thisMonthMoney / 100 || '0'
        this.orderObj.orderNum = this.orderData.thisMonthOrderNumber || '0'
      }
    },
    getinfomation () {
      let para
      let storeid = getStorage('store', 10000)
      if (storeid) {
        let index = storeid.findIndex(item => item.id === sessionStorage.getItem('id'));
        if (index < 0) {
          para = {}
          this.getList(para)

        } else {
          para = {
            storeId: storeid[index].defaultid
          }
          this.getList(para)
        }
      } else {
        para = {}
        this.getList(para)
      }

    },
    lookChangeContract(){
      let para={
        storeId:this.storeData.id
      }
      this.shopApi.lookChangeContract(para).then(res=>{
        this.contractremakes=res.data.data
      })
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.$toast(item.name);
    },
    getList (para) {
      this.shopApi.getinfomation(para).then(res => {
        if (res.data && res.data.data && res.data.data.store) {
          this.orderData = res.data.data
          this.orderObj.orderPrice = this.orderData.todayMoney / 100 || '0'
          this.orderObj.orderNum = this.orderData.todayOrderNumber || '0'

          if (sessionStorage.getItem('id') !== res.data.data.storeAccount.id) {  //保持登录第一次进来没有店主id
            this.session.$setSessionStorageByName('id', res.data.data.storeAccount.id)
            this.getinfomation()
            return
          } else {
            this.session.$setSessionStorageByName('id', res.data.data.storeAccount.id)
            this.storeData = res.data.data.store  //避免第一次进来把没被停用的店铺加载进去
            // alert(JSON.stringify(this.storeData))
            // this.topheader.name=this.storeData.nickName
            this.session.$setSessionStorageByName('storeId', this.storeData.id)
          }

          this.session.$setSessionStorageByName('accountType', 0)
          this.session.$setSessionStorageByName('accountName', res.data.data.storeAccount.name)
          this.session.$setSessionStorageByName('status', res.data.data.storeAccount.status)
          this.session.$setSessionStorageByName('bcRegisterType', res.data.data.store.bcRegisterType)
          this.session.$setSessionStorageByName('type', res.data.data.store.type)
          this.createmerchantcode(this.storeData.id)
          this._notReadMessage(this.storeData.id)
          this.savestore(sessionStorage.getItem('id'), sessionStorage.getItem('storeId'))
          // alert(JSON.stringify(this.storeData.shareMember))
          this.contracttrue()
          
          if(this.storeData.contractStatus==2||this.storeData.contractStatus==3){
            this.lookChangeContract()
          }
          
          // voice(sessionStorage.getItem('id'))
          // this.toback()

        } else if(res.data.status===11){
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('accountName')
          sessionStorage.removeItem('accountType')
          sessionStorage.removeItem('status')
          sessionStorage.removeItem('code')
          sessionStorage.removeItem('storeId')
          sessionStorage.removeItem('bcRegisterType')
            this.local.$removeLocalStorageByName('token')
          window.location.href = this.HTTPLOCAT+'/index.html#/'
        } else {
          let para = {
            pageNo: this.pagination.page,
            pageSize: this.pagination.count,
            storeAccountId: this.session.$getSessionStorageByName('id') || this.local.$getLocalStorageByName('id')
          }
          // alert(this.session.$getSessionStorageByName('id'))
          // 获取店铺列表
          this.shopApi.storeList(para).then(item => {
            if (item.data.data.list && item.data.data.list.length > 0 && this.session.$getSessionStorageByName('id') != null) {
              this.$dialog.alert({
                title: '提示',
                message: '当前店铺已被停用，点击确认去切换店铺！'
              }).then(() => {
                this.$router.push({
                  path: '/ChangeStore',
                  query: { id: sessionStorage.getItem('id'), type: 0, fromrouter: '2' }
                })
              })
            } else {
              this.session.$setSessionStorageByName('id', this.local.$getLocalStorageByName('id'))
              this.session.$setSessionStorageByName('code', this.local.$getLocalStorageByName('code'))
              this.session.$setSessionStorageByName('accountType', 0)
              this.session.$setSessionStorageByName('accountName', this.local.$getLocalStorageByName('accountName'))
              this.$dialog.alert({
                title: '提示',
                message: '您的店铺已被停用，点击确认去推广平台！'
              }).then(() => {
                window.location.href = this.HTTPLOCAT + '/promoteApp.html'
              })
            }
          })
        }
      })
    },
    _notReadMessage (id) {
      let para = {
        store: {
          id: id
        }
      }
      this.shopApi.notReadMessage(para).then(res => {
        console.log(res)
        if (res.data && res.data.data && res.data.data.latest) {
          this.msgList = res.data.data.latest
         
            if(this.msgList.notice.tagType===1){
              this.msgList.money=this.msgList.notice.title
            }else{
              if(this.msgList.notice.subTitle.search('后')>0){ //用了折扣的情况
              if(this.msgList.notice.subTitle.search('账')>0){
                   this.msgList.money=(this.msgList.notice.subTitle.slice(this.msgList.notice.subTitle.search('账')+1))
              }else{
                   this.msgList.money=(this.msgList.notice.subTitle.slice(this.msgList.notice.subTitle.search('后')+1))
              }
            }else{
               this.msgList.money=(this.msgList.notice.subTitle.slice(this.msgList.notice.subTitle.search('账')+1))
            }
            }
            
           
            this.msgList.time=formNow(this.msgList.notice.createTime)
          
        }
      })
    },
    // 生成支付二维码
    createmerchantcode (id) {
      let para = {
        storeId: id
      }
      this.shopApi.createmerchantcode(para).then(res => {
        if (res.data && res.data.data) {
          this.qrCodeUrl = res.data.data
        }
      })
    },
    async savestore (id, storeid) {
      let store = getStorage('store', 1000);
      await this.tovoice(storeid)
      if (store) {
        let index = store.findIndex(item => item.id ? item.id === id : false);
        if (index < 0) {  //如果数组里没有当前登录id
          store.push({
            id: id,
            defaultid: storeid,
            defaultvoice: true,
            store: [{
              storeid: storeid,
              voice: true
            }]
          })
          voiceSwitch(true)

        } else {   //如果数组里有当前登录id
          store[index].defaultvoice ? voiceSwitch(true) : voiceSwitch(false)
          // store[index].storeid=storeid  //如果id存在就切换成当前登录的店铺（常驻店铺）
          // store[index].voice?this.tovoice(storeid):''  //如果开关开着就开着不然不开

        }
        setStorage('store', store)
      } else {      //如果没有数组
        store = [{
          id: id,
          defaultid: storeid,
          defaultvoice: true,
          store: [{
            storeid: storeid,
            voice: true
          }]
        }]
        voiceSwitch(true)
        // this.tovoice(storeid)
        setStorage('store', store)
      }
    },
    tominedetail () {
      this.$router.push({
        path: '/MasterDetail',
        query: { id: sessionStorage.getItem('id'), type: 0,  storeid: this.storeData.id }
      })
    },
    tobingcard () {
          if (window._czc) {
                       window._czc.push(['_trackEvent', '首页', '收款','' ,'' , '']);//其中灰色的为选填项
          }
      this.$router.push({
           path: '/qrCode',
        query: {storeRateBase:this.storeData.rateConfig.storeRateBase,name:this.storeData.nickName ,logo:this.storeData.logo }
      })
      // if (this.qrCodeUrl) {
      //   var ua = window.navigator.userAgent.toLowerCase();
      //   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //     // return true;
      //     this.qrshow = !this.qrshow
      //   } else {
      //     merchantcode(this.qrCodeUrl, this.storeData.logo)
      //   }
      // } else {
      //   this.$dialog.alert({
      //     title: '提示',
      //     message: '您的店铺已被关闭，请联系客服！'
      //   }).then(() => {

      //   })
      // }
    },
    tovoice () {
      voice(this.storeData.id)
      // window.location.href = `qtkjshop://JPushRegister?storeId=${this.storeData.id}`
    },


    tomanagement (item) {
      if (item.id == 4) {
          if (window._czc) {
                                       window._czc.push(['_trackEvent', '首页', '邀店得收益','' ,'' , '']);//其中灰色的为选填项
          }
        this.$router.push('promoteHello')
        
      } else if (item.id == 1) {
           if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '店铺设置','' ,'' , '']);//其中灰色的为选填项
           }
        this.$router.push({
          path: item.go,
          query: { id: this.storeData.id, status: this.storeData.platformStatus }
        })
      } else if (item.id == 3) {
         if (window._czc) {
                           window._czc.push(['_trackEvent', '首页', '去收款返现','' ,'' , '']);//其中灰色的为选填项
          }
        // if(this.storeData.shareMember){
        // this.$router.push({
        //   path: item.go,
        //   query: { id: this.storeData.id, memberid: this.storeData.shareMember, phone: this.orderData.storeAccount.phone }
        // })

        // }else{
          this.$router.push({
          path: '/public',
          query: { id: this.storeData.id, phone: this.orderData.storeAccount.phone ,shareMember:this.storeData.shareMember}
        })
        // }
        
      } else {
         if (window._czc) {
                           window._czc.push(['_trackEvent', '首页', ''+item.go+'','' ,'' , '']);//其中灰色的为选填项
          }
        this.$router.push({ path: item.go, query: { id: this.storeData.id } })
      }

    },
    tocontract(){
      this.$router.push({ path:'addcontract', query: { status: this.storeData.contractStatus, } })
    },
    jumpDesc (index) {
      console.log(index)
    },
    topublic(){
      if (window._czc) {
                           window._czc.push(['_trackEvent', '首页', '收款返现','' ,'' , '']);//其中灰色的为选填项
          }
      this.$router.push({
          path: '/public',
          query: { id: this.storeData.id, phone: this.orderData.storeAccount.phone ,shareMember:this.storeData.shareMember}
        })
    },
    toshop () {
      this.$router.push({ path: '/ShopManagement', query: { id: this.storeData.id } })
    },
    tomoney () {
      this.$router.push({ path: '/Money', query: { id: this.storeData.id, status: this.storeData.platformStatus } })
        // this.$router.push({ path: '/B2C', query: { id: this.storeData.id, status: this.storeData.platformStatus } })
    },
    toorder () {
           if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '查单','' ,'' , '']);//其中灰色的为选填项
         }
      this.$router.push({ path: '/OrderManagement', query: { id: this.storeData.id } })
    },
    tomessage () {
           if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '消息','' ,'' , '']);//其中灰色的为选填项
          }
      this.$router.push({ path: '/Message', query: { id: this.storeData.id } })
    },
    refreshUrl () {
      this.$toast.loading({
        duration: 0,       // 持续展示 toast
        mask: true,
        message: '加载中...'
      });
      window.location.href = this.HTTPLOCAT + '/shopApp.html?time=' + ((new Date()).getTime());
    },
    homedialogtrue () {
      this.Api.homeDialog({}).then(res => {
        if (res.data.status == 1) {
          this.seedcontent = res.data.data
          sessionStorage.getItem('bind') ? '' : this.seed = true
        } else {
          this.membertrue()
        }
      })
    },
    homedialog () { //知道了
      sessionStorage.setItem('bind', true)
      if (this.seedkaiguan) {
        let para = {
          messageId: this.seedcontent.id
        }

        this.Api.homeDialogRead(para).then(res => {
          if (res.data.status == 1) {
            this.membertrue()
          } else {
            this.membertrue()
          }
        })
      } else {
        this.membertrue()
      }
    },
    contractok(){

    },
    memberok () {
      console.log('绑定')
        if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '绑定账号','' ,'' , '']);//其中灰色的为选填项
         }
      this.$router.push({
        path: '/bind',
        query: {          id: sessionStorage.getItem('storeId'),
          phone: this.orderData.storeAccount.phone
        }
      })
    },
    
    membernot () {
        if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '取消绑定','' ,'' , '']);//其中灰色的为选填项
         }
      if (this.memberkaiguan) {
        let member = getStorage('member', 1000);
        if (member) { //不用forrach，避免之前存的数据被强行删除的情况
          let index = member.findIndex(item => item.id ? item.id === sessionStorage.getItem('id') : false);
          console.log(index)
          if (index < 0) {  //如果数组里有当前登录id
            member.push({
              id: sessionStorage.getItem('id'),
              show: false
            })

          } else {   //如果数组里没有有当前登录id
            member[index].show = false  //如果开关开着就开着不然不开

          }
          setStorage('member', member)
        } else {      //如果没有数组
          member = [{
            id: sessionStorage.getItem('id'),
            show: false
          }]
          // this.tovoice(storeid)
          setStorage('member', member)
        }
      }
    },
    contracttrue () {

      let member = getStorage('contract', 1000);
      console.log('contract', member)
      if(member){
        let index = member.find(item => item.storeId === sessionStorage.getItem('storeId'));
        console.log(index)
        if(index){
           this.homedialogtrue()
        }else{
          member.push({
            storeId:sessionStorage.getItem('storeId')
          })
          this.contract=true
        }
          
      }else{
        member=[
          {
            storeId:sessionStorage.getItem('storeId')
          }
        ]
        this.contract=true
      }
      setStorage('contract', member)
    },
    membertrue () {
if (window._czc) {
                        window._czc.push(['_trackEvent', '首页', '确定绑定','' ,'' , '']);//其中灰色的为选填项
         }
      let member = getStorage('member', 1000);
      console.log('member', member)
      if (member) {
        let index = member.find(item => item.id === sessionStorage.getItem('id'));
        console.log(index)
        if (index) {  //如果数组里有当前登录id
          if (this.storeData.shareMember) {  //如果已经绑定
            index.show = false
            this.member = false
          } else {
            if (sessionStorage.getItem('member')) {
              return
            } else {
              index.show ? this.member = true : this.member = false
            }

          }



        } else {   //如果数组里没有有当前登录id
          if (this.storeData.shareMember) {  //如果已经绑定
            member.push({
              id: sessionStorage.getItem('id'),
              show: false
            })
            this.member = false
          } else {
            member.push({
              id: sessionStorage.getItem('id'),
              show: true
            })
            if (sessionStorage.getItem('member')) {
              return
            } else {
              this.member = true
            }

          }

        }
        setStorage('member', member)
      } else {      //如果没有数组
        if (this.storeData.shareMember) {  //如果已经绑定
          member = [{
            id: sessionStorage.getItem('id'),
            show: false
          }]
          this.member = false
        } else {
          member = [{
            id: sessionStorage.getItem('id'),
            show: true
          }]
          if (sessionStorage.getItem('member')) {
            return
          } else {
            this.member = true
          }

        }

        // this.tovoice(storeid)
        setStorage('member', member)
      }
      sessionStorage.setItem('member', true)
    }
  },
  mounted () {
    const loading = document.getElementById('preloadingAnimation')
    if (loading != null) {
      document.body.removeChild(loading)

    }
    sessionStorage.removeItem('lng')
    sessionStorage.removeItem('lat')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('city')
    this.$store.commit('SET_SHOP', '')
    this.getinfomation()
    back('#00A7FC')
    window['getNativeSpeech'] = () => {
      this.getinfomation()
    }
  },
  created () {
   
    loginFirst()
  }
}
</script>
<style scoped lang="scss" type="text/scss">
.choose_type {
  .sort_icon {
    transform: rotate(180deg);
  }
}

.filter_container {
  width: 52px;
  position: absolute;
  right: 20px;
  top: 29px;
  background-color: #0088fd;
  border-radius: 0 0 4px 4px;

  .filter_ul {
    text-align: center;
    font-size: 12px;
    color: #ffffff;

    li {
      height: 30px;
      line-height: 30px;
    }
  }
}

.showlist-enter-active,
.showlist-leave-active {
  transition: all 0.3s;
  transform: translateY(0);
}

.showlist-enter,
.showlist-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}

.shop-status {
  position: relative;
  height: 218px;
  vertical-align: top;
  width: 100%;
  border-radius:0px 0px 8px 8px;
  background: #00a7fc;
  background: linear-gradient(to bottom, #00a7fc 0%, #0088fd 100%);
  .shop-box{
    color: #fff;
    .shop-box-header{
      font-size: 16px;
      text-align: center;
    }
    .shop-box-money{
      font-size: 50px;
      text-align: center;
      font-family:"黑体";
    }
    .shop-box-center{
      display: flex;
      justify-content:space-between;
      font-size:15px;
      font-family:"黑体";
      position:relative;
     
    }
     .shop-box-centerl{
       left: 25%;
       position: absolute;
       transform: translateX(-50%);
        color:rgba(255,255,255,.8);
     }
     .shop-box-centerll{
        color:rgba(255,255,255,1);
        font-weight: 600;
     }
     .shop-box-centerr{
       right:25%;
       position: absolute;
       transform: translateX(50%);
        color:rgba(255,255,255,.8);
      }
      .shop-box-centerrr{
        color:rgba(255,255,255,1);
        font-weight: 600;
     }
    .shop-box-bottom{
      display: flex;
      justify-content:space-around;
      font-size:16px;
      margin-top: 50px;
      .shop-box-bottoml,.shop-box-bottomr{
        width: 49%;
        display: flex;
        justify-content:center;
      align-items: center;
      }
      .shop-box-bottoml{
        border-right: 1px solid #fff;
      }
      svg{
        width: 30px;
        height: 30px;
        margin-right: 8px;

      }
    }
  }
  
}

.price-order {
  height: 76px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 14px;
  background: #ffffff;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.13);
  border-radius: 0 0 8px 8px;

  .price-left,
  .order-right {
    text-align: center;

    p:nth-child(1) {
      font-size: 14px;
      font-weight: 400;
      color: rgba(110, 110, 110, 1);
    }

    p:nth-child(2) {
      font-size: 30px;
      font-weight: 500;
      color: rgba(0, 136, 253, 1);
      text-align: center;
    }
  }
}
.shop-msg{
   position: relative;
  display: flex;
  align-items: center;
  svg{
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }
  .msg-list{
   
    margin-left: 20px;
    font-size: 14px;
    color: #666;
  }
  .shop-msg-money{
    position: absolute;
    right: 20px;
    top: 0;
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }
}

.shop-content-title{
  
  display: flex;
  align-items: center;
  .title-icon{
    width:4px;
    height:12px;
    background:rgba(9,185,254,1);
    background:linear-gradient(123deg,rgba(9,185,254,1) 0%,rgba(9,109,227,1) 100%);
    border-radius:4px;
    margin-left: 20px;
  margin-right: 10px;
  }
  .title-p{
    font-weight:500;
    color:rgba(33,44,104,1);
    font-size:16px;
  }
}
.shop-menu {
  margin-top: 12px;
  padding: 0 38px;

  .shop-menu-list {
    text-align: center;
    margin-bottom: 28px;

    p:nth-child(1) {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      // margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
/*.qr{*/
/*width: 60vw;*/
/*height: 60vw;*/
/*border: 1px solid #00A7FC;*/
/*}*/
/*.qr img{*/
/*width: 95%;*/
/*height: 95%;*/
/*margin: 2.5% 0 0 2.5%;*/
/*}*/
.qrtan {
  z-index: 205000 !important;
}
.home-bottom {
  width: 100%;
  /*position: fixed;*/
  /*bottom: 5px;*/
  /*left: 0;*/
  text-align: center;
  color: rgb(0, 149, 253);
  font-size: 14px;
}
.van-dialog {
  width: 70%;
}
.hetong-popt{
     color: #333;
     font-size: 16px;
     text-align: center;
     margin-top: 18px;
 }
 .hetong-popb{
     color: #666;
     font-size: 14px;
     margin: 14px 18px;
 }
</style>
