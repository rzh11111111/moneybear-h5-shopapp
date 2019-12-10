<template>
    <div class="app-init">
      <top-column :top-header="topheader"></top-column>
      <div class="list">
        <header class="listtitle">
          <p>{{store.name}}</p>
          <!--{{item.managerCooperation.name}}-->
          <span >推广员</span>
          <span v-if="store.status==1">正常</span>
          <span v-if="store.status==2">关闭</span>
          <span v-if="store.status==3">冻结</span>
          <span v-if="store.managerSpread.type==1">兼职</span>
          <span v-if="store.managerSpread.type==2">专职</span>
        </header>
        <ul class="listcenter">
          <li style="color: #666;">
            <span >编码：</span>
            <span  style="overflow: hidden;text-overflow: ellipsis">{{store.code}}</span>
          </li>
          <li>
            <div>
              <img src="@assets/img/detail/phone.png" />
            </div>
            <a :href="'tel:' + store.phone" style="color: #0095FD;" @click.prevent="handleRingup(store.phone)">{{store.phone}}</a>
          </li>
        </ul>
        <ul class="listcontent">
          <li @click="area.onoff=!area.onoff;topheader.name='查看辖区'">
            <div>
              <img src="@assets/img/detail/position2.png" />
            </div>
            <span  style="overflow: hidden;text-overflow: ellipsis" v-if="store.managerDutyAreaConfigs.length==0">空</span>
            <span  style="overflow: hidden;text-overflow: ellipsis" v-else>{{store.managerDutyAreaConfigs[0].province}}{{store.managerDutyAreaConfigs[0].city}}等</span>
          </li>
          <li>
            <div>
              <img src="@assets/img/detail/people.png" />
            </div>
            <span v-if="store.managerSpread.type=='1'" style="overflow: hidden;text-overflow: ellipsis">省区总 {{store.managerSpread.merManager.managerCooperation.merManager.name}}</span>
            <span v-else-if="store.managerSpread.type=='2'" style="overflow: hidden;text-overflow: ellipsis" @click="gotoPartner(store.managerSpread.merManager.id)">合作商 {{store.managerSpread.merManager.name}}</span>
            <!--store.managerSpread.merManager.managerCooperation.merManager.name-->
          </li>
          <li style="color: #999;">
            <div>
              <img src="@assets/img/detail/datachoose.png" />
            </div>
            <span>{{store.approvalTime|format}}</span>
          </li>
        </ul>
      </div>
      <van-cell-group style="color: #0095FD;" v-if="fromrouter==='1'">
        <van-cell title="总入账收益" :value="'￥'+money" value-class="rightvalue" ></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />
        <van-cell title="资料信息" is-link  @click="tochangepopularize"/>
        <van-cell title="费率" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率'"/>
        <van-cell title="银行账户" is-link :value="havecard" @click="tobindcard" v-if="fromrouter==='2'"/>
      </van-cell-group>
      <van-cell-group v-if="fromrouter==='2'||fromrouter===2">
        <van-cell title="设置" is-link  @click="toset"/>
      </van-cell-group>

      <van-cell-group v-if="fromrouter==='1'||fromrouter===1">
        <van-cell title="推广的种子商户" is-link :value="mine.countSeedStore+'家'" @click="toseed(1)" />
        <van-cell title="推广的特色商户" is-link :value="mine.countFeatureStore+'家'" @click="toseed(2)" />
        <van-cell title="推广的同城企业" is-link :value="mine.countSpreadCityShop+'家'" @click="tolocal" />
      </van-cell-group>

      <van-popup
        v-model="area.onoff"
        position="right"
        :overlay="false"
      >
        <div class="rightmap">
          <header class="heade">

          </header>
          <div>
            <choose-area :area="area"></choose-area>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="account.onoff"
        position="right"
        :overlay="false"
      >
        <div class="rightmap">
          <header class="heade">

          </header>
          <div>
            <van-cell-group>
              <van-cell title="编码"  :value="store.code" value-class="colorC0C0C0"/>
              <van-cell title="入驻时间"  :value="format(store.approvalTime, 'yyyy-MM-dd hh:mm:ss')" value-class="colorC0C0C0"/>
              <van-cell title="角色"  value="推广员" value-class="colorC0C0C0"/>
            </van-cell-group>
            <van-cell-group>
              <van-cell title="账号"  :value="store.username" value-class="colorC0C0C0"/>
              <van-cell title="手机号"  :value="store.phone" value-class="colorC0C0C0"/>
              <van-cell title="邮箱"  :value="store.email" value-class="colorC0C0C0"/>
            </van-cell-group>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="rate.onoff"
        position="right"
        :overlay="false"
      >
        <div class="rightmap">
          <header class="heade">

          </header>
          <div>
            <van-cell-group>

              <van-cell title="费率" >
                <div slot="icon" class="vant-collapse-icon"></div>
              </van-cell>

              <van-cell title="推广种子商户,获得种子商户平台销售额的" label="注：省区总获得推广员提成的10%"   value="0.15%" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="推广特色商户,获得特色商户平台销售额的" label="注：省区总获得推广员提成的10%"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="推广同城企业,获得同城企业平台销售额的"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />
            </van-cell-group>

          </div>
        </div>
      </van-popup>

      <van-popup
        v-model="rank.onoff"
        position="right"
        :overlay="false"
      >
        <div class="rightmap">
          <header class="heade">

          </header>
          <div>
            <van-cell-group>
              <van-cell title="账户类型" v-if="rank.card.type==2" value="个人账号" value-class="colorC0C0C0"/>

            </van-cell-group>
            <van-cell-group>
              <van-cell title="开户名称"  :value="rank.card.accountName" value-class="colorC0C0C0"/>
              <van-cell title="银行账号"  :value="rank.card.bankNo" value-class="colorC0C0C0"   />
              <van-cell title="开户银行"  :value="rank.card.bankName" value-class="colorC0C0C0"   />
            </van-cell-group>
            <van-button type="primary" size="large" @click="todeletecard" class="submitbtn">解除绑卡
            </van-button>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script>
import chooseArea from '@/components/chooseArea/chooseArea'
import {format,currency,getSessionStorage,ringup} from '@/utils'
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
      list: '1', // 详情页种类
      fromrouter:'',  //从哪里来
      name:'',
      lookcard:'',
      area:{  //查看辖区
        onoff:false,
        chooseno:false,
        arealist: []
      },
      account:{ //账号信息
        onoff:false
      },
      rate:{  //费率合同
        onoff:false,
      },
      rank:{
        onoff:false,
        card:'',
      },
      money:0,
      havecard:'未绑定',
      mine: { // 我辖区下的数量
        countSeedStore:0, //种子
        countFeatureStore:0, // 特色
        countSpreadCityShop:0  //同城
      },
      store:{
        managerDutyAreaConfigs: [{province:'',city:''}], // 0,辖区
        managerSpread: {
          merManager: {
            id: '', // 0,挂靠合作商id
            name: '' // 合作商名字
          },
          type1: '', // 0,上级类型
          id1: '', // 0,上级ID
          spreadName:'',
          type: '', // 0,专职兼职
          sysAreaConfigHome: '', // 1,现居住地
          homeName: '',
          address: '', // 1,办公地址
          name: '', // 2,姓名
          idCard: '', // 2,身份证
          idCardJustUrl: '', // 2,身份证正面
          idCardBackUrl: '', // 2,身份证反面
          activeTime: '', // 合同时间2016-12-21 09:09:10
          invalidTime: '',
          createType:3
        },
        newfont: '0', // 简介字数
        charactar: '1',
        isEnable: '1', // 0,店铺启用不变
        status: '1', // 0,店铺状态不变
        username: '',
        name: '', // 2,推广员姓名
        createTime:'',
        phone: '',
        verifyCode: '',
        email: '',
        remarks: ''
      }
    }
  },
  components: {
    chooseArea
  },
  filters: {
    format
  },
  methods: {
    handleRingup(tel) {
      if (!tel) {
        return false;
      }
      ringup(tel);
    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '详情'
      }else if (this.account.onoff) {
        this.account.onoff = !this.account.onoff
        this.topheader.name = '详情'
      }else if (this.rate.onoff) {
        this.rate.onoff = !this.rate.onoff
        this.topheader.name = '详情'
      }else if (this.rank.onoff) {
        if(this.$route.query.lookcard){
          this.$router.go(-1)
        }else{
          this.rank.onoff = !this.rank.onoff
          this.topheader.name = '详情'
        }
      }else if (this.disabled) {
        Dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
        }).catch(() => {
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    },
    areas (msg) {
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '填写资料'
    },
    toset(){
      this.$router.push('/Set')
    },
    gotoPartner(id) {
      if (getSessionStorage('accountType') == 3) {
        this.$router.push({path: '/PromotersListDetail', query: {type: 3, list: 2, id}})
      }
    },


    topopularize(){  //id是进入的哪个列表
      this.$router.push({path: '/PromotersList', query: {id:3,merManager:this.store.id}})
    },
    toseed(msg){
      if(msg==1){
        if(this.mine.countSeedStore){
          this.$router.push({path: '/PromotersList', query: {id:4,merManager:this.store.id,mine:true}})
        }else{
          this.$toast('推广的种子店为0')
        }

      }else{
        if(this.mine.countFeatureStore){
          this.$router.push({path: '/PromotersList', query: {id:5,merManager:this.store.id,mine:true}})
        }else{
          this.$toast('推广的特色店为0')
        }

      }

    },
    tochangepopularize(){
      if(this.fromrouter==2){
        this.$router.push({path: '/ChangePopularize', query: {id:this.store.id,type: this.type}})
      }else{
        this.$router.push({path: '/ChangePopularize', query: {id:this.store.id,type: this.type,list:1}})
      }

    },
    tolocal(){
      if(this.mine.countSpreadCityShop){
        this.$router.push({path: '/PromotersList', query: {id:6,merManager:this.store.id,mine:true}})
      }else{
        this.$toast('推广的同城企业为0')
      }

    },
    tobindcard(msg){
      if(this.havecard=='未绑定'||msg=='1'){
        this.$router.push({path: '/BindCard', query: {name:this.store.name,card:this.store.managerSpread.idCard,havecard:this.havecard}})
      }else{
        this.rank.onoff=!this.rank.onoff;this.topheader.name='银行账户'
      }

    },
    todeletecard(){
      this.$dialog.confirm({
        title: '',
        message: '您确定要解除绑定的银行卡吗',
      }).then(() => {
        this.deletecard()
      }).catch(() => {

      })

    },
    deletecard(){
      let para={
        id:this.rank.card.id,
      }
      this.Api.deleteCard(para).then(res => {
        if(res.data.status==1){
          // this.$router.push({path: '/ApplyResult', query: {win:true,type:3}})
          this.$router.push({ path: '/ApplyResult', query: { result: '解绑成功' } })

        }else{
          // this.$router.push({path: '/ApplyResult', query: {win:false,type:3,result:res.data.stateMessage}})
        }
      }).catch(error => {
        console.log(error)
      })
    },

  },
  mounted(){
    this.type = sessionStorage.getItem('accountType')
    this.list = this.$route.query.list
    this.fromrouter=this.$route.query.fromrouter
    if(this.$route.query.lookcard){
      this.rank.onoff=!this.rank.onoff;this.topheader.name='银行账户';
    }
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name=sessionStorage.getItem('accountName')
    /*let formdata=new FormData();
    formdata.set("id",this.$route.query.id);*/
    let para={
      id:this.$route.query.id


    }
      this.Api.popularizeDetail(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        if(res.data.data){
          this.store=res.data.data
        }

      }).catch(error => {
        console.log(error)
      })
    this.Api.getCardDetail(para).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      if(res.data.status==80034){
        this.havecard='未绑定'
      }else{
        this.havecard=''
        this.rank.card=res.data.data
      }

    }).catch(error => {
      console.log(error)
    })




    this.Api.popularizeUnder(para).then(res => {

      if(res.data.data){
        this.mine=res.data.data
      }
    }).catch(error => {
      console.log(error)
    })
    // let para2={
    //   spreadId:this.$route.query.id
    //
    //
    // }
   /* let formdata2=new FormData();
    formdata2.set("spreadId",this.$route.query.id);*/
    let para2={
      spreadId:this.$route.query.id
    }
    this.Api.getAllMoney(para2).then(res => {
      this.money=currency(res.data.data/100)
    }).catch(error => {
      console.log(error)
    })
  },
 /* beforeRouteEnter(to, from, next){  // 判断是从列表来还是首页来
    console.log(to,from)
    if(from.name=='PromotersList'){
      next(vm=>{
        vm.fromrouter='1';
      })
    }else if(from.name=='prohome'){
      next(vm=>{
        vm.fromrouter='2';
      })
    }else if(from.name=='Set'){
      next(vm=>{
        vm.fromrouter='2';
      })
    }else if(from.name=='ChangePopularize'&&from.query.list){
      next(vm=>{
        vm.fromrouter='1';
      })
    }else if(from.name=='ChangePopularize'&&!from.query.list){
      next(vm=>{
        vm.fromrouter='2';
      })
    }else if(from.name=='BindCard'){
      next(vm=>{
        vm.fromrouter='2';
      })
    }

  }*/
}
</script>

<style scoped>
  body{
    background:rgba(245,245,249,1);
  }
  .rightmap{
    background:rgba(245,245,249,1);
  }
  .van-cell /deep/ .van-cell__title{
    max-width: none;
  }
  .van-cell /deep/ .van-cell__value{
    text-align: right;
    display: block;

  }
  .van-cell /deep/ .rightvalue{
    color: #0095fd !important;
  }

  .list{
    width: 100%;
    height: 102px;
    background: #FFF;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #FFF;
    position: relative;
  }
  .listtitle{
    width: 90%;
  }
  .listtitle /deep/ p{
    max-width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .listtitle /deep/ span{

    border: 0.5px solid #0095fd;

  }
.listcenter{
  font-size: 12px;
  position: absolute;
  color: #0095FD;
  top: 50px;
  left: 6px;
  display: flex;
  line-height: 14px;
}
/*  .listcenter /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcenter /deep/ img{
    width: 14px;
    height: 14px;
    !*transform: translate(0,+10%);*!
    margin-right: 2px;
  }*/
  .listcontent{
    font-size: 12px;
    color: #0095FD;
    position: absolute;
    left: 6px;
    top: 74px;
    display: flex;
    line-height: 14px;
  }
 /* .listcontent /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcontent /deep/ img{
    width: 14px;
    height: 14px;
    !*transform: translate(0,+10%);*!
    margin-right: 2px;
  }*/
  .listaside{
    width: 12px;
    height: 12px;
    color: #cbcbcb;
    position: absolute;
    right: 19px;
    top: 22px;
  }


</style>
