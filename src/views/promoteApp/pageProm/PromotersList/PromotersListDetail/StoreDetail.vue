<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="list">
      <header class="listtitle">
        <div class="listtitle-text">{{store.store.nickName}}</div>
        <!--{{item.managerCooperation.name}}-->
        <span v-if="store.store.type==1">种子店铺</span>
        <span v-if="store.store.type==2">特色店铺</span>
        <span v-if="store.store.platformStatus==1">正常</span>
        <span v-if="store.store.platformStatus==2">关闭</span>
        <span v-if="store.store.platformStatus==3">冻结</span>
      </header>
      <ul class="listcenter">
        <li style="color: #666;">
          <span >编码：</span>
          <span  style="overflow: hidden;text-overflow: ellipsis">{{store.store.code}}</span>
        </li>
        <li>
          <div>
            <img src="@assets/img/detail/phone.png" />
          </div>
          <a :href="'tel:' + store.storeAccount.phone" style="color: #0095FD;" @click.prevent="handleRingup(store.storeAccount.phone)" v-if="!!store.store">{{store.storeAccount.phone}}</a>
        </li>
      </ul>
      <ul class="listcontent">
        <!--<li @click="area.onoff=!area.onoff;topheader.name='查看辖区'">-->
        <li @click="toarea">
          <div>
            <img src="@assets/img/detail/position.png" />
          </div>
          <span  style="overflow: hidden;text-overflow: ellipsis" v-if="!store.store.province">空</span>
          <span style="overflow: hidden;text-overflow: ellipsis" v-else>{{store.store.province}} {{store.store.city}} 等</span>
        </li>
        <li>
          <div>
            <img src="@assets/img/detail/people.png" />
          </div>
          <p style="color: #0095FD;overflow: hidden;text-overflow: ellipsis" @click="todetail" >{{store.spreadRole}} {{store.spreadName}}</p>
          <!--<a :href="'tel:' + store.spreadPhone" style="color: #0095FD;overflow: hidden;text-overflow: ellipsis" @click.prevent="handleRingup(store.spreadPhone)">{{store.spreadRole}} {{store.spreadName}}</a>-->
        </li>
        <li style="color: #999;">
          <div>
            <img src="@assets/img/detail/datachoose.png" />
          </div>
          <span>{{store.store.approvalTime| format}}</span>
        </li>
      </ul>
    </div>
    <van-cell-group>
      <!--<van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />-->
      <van-cell title="资料信息" is-link  @click="tochangestore"/>
      <van-cell title="分享的会员" is-link @click="toshare"/>
      <van-cell title="合同" v-if="list===4||list==='4'" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率和合同'"/>
      <van-cell title="合同"  value-class="overte" v-else is-link @click="tohetong" :value="hetong"/>
      
      <!--<van-cell title="银行账户" is-link :value="havecard" @click="rank.onoff=!rank.onoff;topheader.name='银行账户'" v-if="fromrouter==='2'"/>-->
    </van-cell-group>
    <!--<van-cell-group v-if="fromrouter==='2'">-->
      <!--<van-cell title="设置" is-link  @click="toset"/>-->
    <!--</van-cell-group>-->
    <!--<van-cell-group v-if="fromrouter==='1'">-->
    <van-cell-group>
      <van-cell title="商户老板详情" is-link value=" " @click="tomaster" v-if="type==3"/>
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
            <van-cell title="编码"  :value="store.store.code" value-class="colorC0C0C0"/>
            <van-cell title="入驻时间"  :value="format(store.store.approvalTime, 'yyyy-MM-dd hh:mm:ss')" value-class="colorC0C0C0"/>
            <van-cell title="角色"  value="合作商" value-class="colorC0C0C0"/>
          </van-cell-group>
          <van-cell-group>
            <van-cell title="账号"  :value="store.store.username" value-class="colorC0C0C0"/>
            <van-cell title="手机号"  :value="store.store.phone" value-class="colorC0C0C0"/>
            <van-cell title="邮箱"  :value="store.store.email" value-class="colorC0C0C0"/>
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
            <div v-if="store.store.type==1">
              
              <van-cell title="店铺费率"  :value="store.store.rateConfig.storeRateBase*10+'折'" title-class="leftcolor" value-class="rightcolor" />
            <van-cell title="平台收取服务费,收取该种子商户平台销售额的"  value="4%" title-class="leftcolor" value-class="rightcolor" />
            <van-cell title="平台补贴种子商户,补贴该种子商户平台销售额的"  value="0.15%" title-class="leftcolor" value-class="rightcolor" />
            <van-cell title="配送平台商品，获得该商品订单价格的" label="注：配送费由商品所属企业承担"  value="10%" title-class="leftcolor" value-class="rightcolor" />
            </div>
            <div v-if="store.store.type==2">
               <van-cell title="店铺费率"  :value="accMul(store.store.rateConfig.storeRateBase,10)+'折'" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="平台收取服务费,收取该特色商户平台销售额的"  title-class="leftcolor" value-class="rightcolor" >
                <template v-if="store&&store.store.rateConfig">
                  {{accMul(store.store.rateConfig.storeRatePlatform,100)}}%
                </template>
              </van-cell>
            </div>
          </van-cell-group>
          <van-cell-group>
            <van-cell
                    title="合同起止时间"
                    :value="store.store.contractStartTime+'至'+store.store.contractEndTime"
                    value-class="colorC0C0C0"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell title="合同照片"  >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell title="" class="hetong" value-class="teadd">
              <some-multiple class="notclickadd" number="8"  :some-multiple="store.store.contractPicUrls"  filecode="FILE19011225489456"></some-multiple>
              <!--<contract class="notclickadd" number="8"-->
                        <!--:some-multiple="store.store.contractPicUrls"></contract>-->
            </van-cell>
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
            <van-cell title="账户类型" v-if="rank.card.type==2" value="对公账号" value-class="colorC0C0C0"/>

          </van-cell-group>
          <van-cell-group>
            <van-cell title="开户名称"  :value="rank.card.accountName" value-class="colorC0C0C0"/>
            <van-cell title="银行账号"  :value="rank.card.bankNo" value-class="colorC0C0C0"   />
            <van-cell title="开户银行"  :value="rank.card.bankType" value-class="colorC0C0C0"   />
            <van-cell title="银行支行"  :value="rank.card.bankBranch" value-class="colorC0C0C0"   />
          </van-cell-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import chooseArea from '@/components/chooseArea/chooseArea'
  import someMultiple from '@/components/addimg/someMultiple'
  import {format,phonearea,ringup,back,accMul} from '@/utils'
  export default {
    name: 'StoreDetail',
    data () {
      return {
        accMul,
        format,
        topheader: {
          name: '详情',
          left: '3',
          right1: '',
          heade: 'header1'
        },
        type: '1', // 省区总合作商推广员
        list: 1, // 详情页种类
        fromrouter:'',  //从哪里来
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
        rank:{ //银行卡
          onoff:false,
          card:'',
        },
        havecard:'', // 展示未绑定银行卡
        mine: { // 我辖区下的数量
          countCooperation: 0,
          countDutyAreaCooperation: null,
          countSpread: 0,
          countDutyAreaSpread: null,
          countSeedStore: 0,
          countDutyAreaSeedStore: 0,
          countFeatureStore: 0,
          countDutyAreaFeatureStore: 0,
          countSpreadCityShop: 0,
          countDutyAreaCityShop: 0
        },
        store:{
          store:{
            name:'',
            phone:'',
            code:'',
            managerDutyAreaConfigs:[
              {
                province:'',
                city:'',
              }
            ],
            updateTime:'',
            id:'',

          },
          storeAccount:{
            phone:''
          }

        },

      }
    },
    components: {
      chooseArea,someMultiple
    },
    filters: {
      format
    },
    computed:{
      hetong(){
        switch(this.store.store.contractStatus){
          case 0:
            return ' '
          case 1:
            return '入驻未完成，请督促店铺签合同。'
          case 2:
            return '合同发生变更，请督促店铺改签。'
          case 3:
            return '合同发生变更，已停用收款功能。请督促店铺续签。'
          case 4:
            return '续签(合同临期)，请督促店铺续签。'
          case 5:
            return '合同已到期，请督促店铺续签。'
            default:
            return ' '
        }
      }
    },
    methods: {
      handleRingup(tel) {
        if (!tel) {
          return false;
        }
        ringup(tel);
      },
      tohetong(){
        if(!this.store.store.contractPicUrls){
              this.$router.push({path:'/storehetong',query:{id:this.$route.query.id,img:this.store.contractRecord?this.store.contractRecord.signFile:'',status:this.store.store.contractStatus,list:this.list,contractId:this.store.contractRecord?this.store.contractRecord.id:'',operatorType:this.store.contractRecord?this.store.contractRecord.operatorType:'',ratePlatform:this.store.contractRecord?this.store.contractRecord.ratePlatform:'',rateBase:this.store.contractRecord?this.store.contractRecord.rateBase:'',otherAppointment:this.store.contractRecord?this.store.contractRecord.otherAppointment:''}})
     
        }else{
          this.rate.onoff=true
        }
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
          this.rank.onoff = !this.rank.onoff
          this.topheader.name = '详情'
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
      toshare(){
        this.$router.push({
          path: '/share',
          query: {id: this.store.store.id, memberid: this.store.store.shareMember?this.store.store.shareMember.id:''}
        })
      },
      areas (msg) {
        this.shop.managerDutyAreaConfigs = msg
        this.area.onoff = false
        this.topheader.name = '填写资料'
      },
      toset(){
        this.$router.push('/Set')
      },
      todetail(){
        if(this.store.store.spreadId===sessionStorage.getItem('id')){

        }else{
          // spreadType
          if(sessionStorage.getItem('accountType')==3){ //省区总
            if(this.store.store.spreadType==3){
              this.$router.push({path:'/PopularizeDetail',query:{id: this.store.store.spreadId, type: sessionStorage.getItem('accountType'), list: 3, fromrouter: '1'}})
            }else{
              this.$router.push({path:'/MasterDetail',query:{id: this.store.store.spreadId, type: sessionStorage.getItem('accountType'), list: 4, fromrouter: '1'}})
            }
          }else if(sessionStorage.getItem('accountType')==2){  //合作商

          }


        }
      },
      tomaster(){  //id是进入的哪个列表
        this.$router.push({path: '/MasterDetail', query: {id:this.store.storeAccount.id,list: 4,fromrouter:this.fromrouter}})
      },
      toseed(){
        this.$router.push({path: '/PromotersList', query: {id:4,merManager:this.store.store.id}})
      },
      toarea(){
        phonearea(this.store.store.logo,this.store.store.longitude,this.store.store.latitude,this.store.store.name,this.store.store.address)
        // window.location.href =`qtkjshop://Area?logo=${this.store.store.logo}&longitude=${this.store.store.longitude}&latitude=${this.store.store.latitude}&name=${this.store.store.name}&address=${this.store.store.address}`
      },
      tochangestore(){
        this.$router.push({path: '/ChangeStore', query: {id:this.store.store.id,type: this.type, list: this.list}}) //list用来判断是否从列表进入
      }

    },
    mounted(){
      back('#00A7FC')
      this.type = sessionStorage.getItem('accountType')
      this.list = this.$route.query.list
      this.fromrouter=this.$route.query.fromrouter
      // let para = this.$route.query.id, // 0,挂靠合作商id
      // this.name=sessionStorage.getItem('accountName')
      /*let formdata=new FormData();
      formdata.set("storeId",this.$route.query.id);*/
      let para={
        storeId:this.$route.query.id
      }
      this.Api.storeDetail(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.store=res.data.data
        this.store.store.contractStartTime=format(this.store.store.contractStartTime, 'yyyy.MM.dd')
        this.store.store.contractEndTime=format(this.store.store.contractEndTime, 'yyyy.MM.dd')
      }).catch(error => {
        console.log(error)
      })


   /*   let para={
        id:this.$route.query.id
      }
      this.Api.togetherUnder(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        // this.store=res.data.data
        console.log(res.data)
        this.mine=res.data.data
      }).catch(error => {
        console.log(error)
      })*/
    },
    /*beforeRouteEnter(to, from, next){  // 判断是从列表来还是首页来
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
      }else if(from.name=='ChangeStore'&&from.query.list==4){
        next(vm=>{
          vm.fromrouter='1';
        })
      }else if(from.name='MasterDetail'){
        next(vm=>{
          vm.fromrouter='1';
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
  .van-cell /deep/ .rightcolor{
    color: #FF3232 ;
    font-weight: 800;
    font-size: 16px;
  }
  .van-cell /deep/ .leftcolor{
    color: #666;
    font-size: 14px;
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
    width: calc(100% - 9.6vw);
  }
  .listtitle /deep/ span{

    border: 0.5px solid #0095fd;

  }
  .listtitle /deep/ div.listtitle-text {
    max-width: 50%;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
  .listcenter{
    font-size: 12px;
    position: absolute;
    color: #0095FD;
    top: 50px;
    left: 4.8vw;
    display: flex;
    line-height: 14px;
  }
  .listcenter div{
    display: inline-block;
  }
  .listcenter li:first-child{
      margin-left: 0;
    }

 /* .listcenter /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcenter /deep/ img{
    width: 14px;
    height: 14px;
    !*transform: translate(0,-10%);*!
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
/*  .listcontent /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcontent /deep/ img{
    width: 14px;
    height: 14px;
    !*transform: translate(0,-10%);*!
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
.overte{
  width: 30%;
   overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
