<template>
  <div>
    <top-column :top-header="topheader"></top-column>
    <div class="list">
      <header class="listtitle">
        <p>{{store.shopInfo.name}}</p>
        <!--{{item.managerCooperation.name}}-->
        <span >同城企业</span>
        <span v-if="store.status==1">正常</span>
        <span v-if="store.status==2">关闭</span>
        <span v-if="store.status==3">冻结</span>
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
        <li >
          <div>
            <img src="@assets/img/detail/position2.png" />
          </div>
          <span  style="overflow: hidden;text-overflow: ellipsis" v-if="!store.province">空</span>
          <span style="overflow: hidden;text-overflow: ellipsis" v-else>{{store.province}} {{store.city}} 等</span>
        </li>
        <li >
          <div>
            <img src="@assets/img/detail/people.png" />
          </div>
          <!--<span style="overflow: hidden;text-overflow: ellipsis">推广员 {{store.spreadName}}</span>-->
          <span v-if="store.spreadType==3" style="overflow: hidden;text-overflow: ellipsis" @click="todetail">推广员 {{store.spreadUsername}}</span>
          <span v-if="store.spreadType==2" style="overflow: hidden;text-overflow: ellipsis"@click="todetail">合作商 {{store.spreadUsername}}</span>
          <span v-if="store.spreadType==1" style="overflow: hidden;text-overflow: ellipsis">省区总 {{store.spreadUsername}}</span>
          <span v-if="store.spreadType==4" style="overflow: hidden;text-overflow: ellipsis"@click="todetail">店主 {{store.spreadUsername}}</span>
        </li>
        <li style="color: #999;">
          <div>
            <img src="@assets/img/detail/datachoose.png" />
          </div>
          <span>{{store.approvalTime|format}}</span>
        </li>
      </ul>
    </div>
    <van-cell-group>
      <van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />
      <van-cell title="资料信息" is-link  @click="tochangestore"/>
      <van-cell title="费率和合同" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率和合同'"/>
      <!--<van-cell title="银行账户" is-link :value="havecard" @click="rank.onoff=!rank.onoff;topheader.name='银行账户'" v-if="fromrouter==='2'"/>-->
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
            <van-cell title="编码"  :value="store.code" value-class="colorC0C0C0" />
            <van-cell title="入驻时间"  :value="format(store.approvalTime, 'yyyy-MM-dd hh:mm:ss')" value-class="colorC0C0C0" />
            <van-cell title="角色"  value="同城企业" value-class="colorC0C0C0" />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="账号"  :value="store.userName" value-class="colorC0C0C0" />
            <van-cell title="手机号"  :value="store.phone" value-class="colorC0C0C0" />
            <van-cell title="邮箱"  :value="store.email" value-class="colorC0C0C0" />
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
            <div v-if="store.type=='2'">
              <van-cell title="平台收取服务费,收取该同城企业平台销售额的"  title-class="leftcolor" value-class="rightcolor" >{{this.store.rateConfig.storeRatePlatform*100}}%</van-cell>
            </div>
            <!--<van-cell title="管辖区域内种子商户,特色商户平台销售额的"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />-->
            <!--<van-cell title="管辖区域内同城企业平台销售额的" label="注：自己开发的不重复提成，最多就0.3%提成"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />-->
            <!--<van-cell title="配送平台商品，火的该商品订单价格的" label="注：配送费由商品所属企业承担"  value="3%" title-class="leftcolor" value-class="rightcolor" />-->
          </van-cell-group>
          <van-cell-group>
            <van-cell
                    title="合同起止时间"
                    :value="store.shopInfo.contractStartTime+'至'+store.shopInfo.contractEndTime"
                    value-class="colorC0C0C0"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell title="合同照片"  >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell title="" class="hetong" value-class="teadd">
              <some-multiple class="notclickadd" number="8"  :some-multiple="store.shopInfo.contractPicUrls"  filecode="FILE19011225489456"></some-multiple>
              <!--<contract class="notclickadd" number="8"-->
                        <!--:some-multiple="store.shopInfo.contractPicUrls"></contract>-->
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
  import {format,ringup} from '@/utils'
  export default {
    name: 'StoreDetail',
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
            createTime:'',
            id:''
          },
          shopInfo:{
            name:''
          }
        }
      }
    },
    components: {
      chooseArea,someMultiple
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
      areas (msg) {
        this.shop.managerDutyAreaConfigs = msg
        this.area.onoff = false
        this.topheader.name = '填写资料'
      },
      todetail(){
          if(this.store.spreadType==3){
            this.$router.push({path: '/PopularizeDetail', query: {type: '3', list: 3,id:this.store.spreadId}})
          }else if(this.store.spreadType==2){
            this.$router.push({path: '/PromotersListDetail', query: {type: '3', list: 2,id:this.store.spreadId}})
          }else if(this.store.spreadType==4){
            this.$router.push({path: '/MasterDetail', query: {id:this.store.spreadId}})
          }


      },
      toset(){
        this.$router.push('/Set')
      },

      topopularize(){  //id是进入的哪个列表
        this.$router.push({path: '/PromotersList', query: {id:3,merManager:this.store.store.id}})
      },
      toseed(){
        this.$router.push({path: '/PromotersList', query: {id:4,merManager:this.store.store.id}})
      },
      tochangestore(){
        this.$router.push({path: '/ChangeLocal', query: {id:this.store.id,type: this.type, list: this.list}})
      }

    },
    mounted(){
      this.type = sessionStorage.getItem('accountType')
      this.list = this.$route.query.list
      this.fromrouter=this.$route.query.fromrouter
      // let para = this.$route.query.id, // 0,挂靠合作商id
      // this.name=sessionStorage.getItem('accountName')
      /*let formdata=new FormData();
      formdata.set("id",this.$route.query.id);*/
      let para={
        id:this.$route.query.id
      }
      this.Api.localDetail(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.store=res.data.data
        this.store.shopInfo.contractStartTime=format(this.store.shopInfo.contractStartTime, 'yyyy.MM.dd')
        this.store.shopInfo.contractEndTime=format(this.store.shopInfo.contractEndTime, 'yyyy.MM.dd')
      }).catch(error => {
        console.log(error)
      })
      // this.Api.getCardDetail(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
      /*  if(res.data.status==1){
          this.rank.card=res.data.data[0]
        }else if(res.data.status==80034){
          this.havecard='未绑定'
        }*/
      // }).catch(error => {
      //   console.log(error)
      // })


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
  /*  beforeRouteEnter(to, from, next){  // 判断是从列表来还是首页来
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
    width: 90%;
    color: #333;
    font-size: 18px;
    font-weight: 800;
    position: absolute;
    left: 16px;
    top: 16px;
  }
  .listtitle /deep/ p{
    max-width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .listtitle /deep/ span{
    display: inline-block;

    height: 16px;
    padding: 0 3px;
    font-weight: 300;
    border-radius: 2px;
    border: 0.5px solid #0095fd;
    color: #0095fd;
    opacity: .9;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
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

  .listcontent{
    font-size: 12px;
    color: #0095FD;
    position: absolute;
    left: 6px;
    top: 74px;
    display: flex;
    line-height: 14px;
  }

  .listaside{
    width: 12px;
    height: 12px;
    color: #cbcbcb;
    position: absolute;
    right: 19px;
    top: 22px;
  }


</style>
