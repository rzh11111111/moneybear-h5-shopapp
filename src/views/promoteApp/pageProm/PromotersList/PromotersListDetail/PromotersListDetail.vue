<template>
    <div class="app-init">
      <top-column :top-header="topheader"></top-column>
<!--合作商详情-->
      <div class="list">
        <header class="listtitle">
          <p>{{store.name}}</p>
          <!--{{item.managerCooperation.name}}-->
          <span >合作商</span>
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
            <span  style="overflow: hidden;text-overflow: ellipsis">省区总 {{store.managerCooperation.merManager.name}}</span>
          </li>
          <li style="color: #999;">
            <div>
              <img src="@assets/img/detail/datachoose.png" />
            </div>
            <span>{{store.approvalTime| format}}</span>
          </li>
        </ul>
      </div>
      <van-cell-group style="color: #0095FD;" v-if="fromrouter==='1'">
        <van-cell title="专职推广员总收益" :value="'￥'+money.type2" value-class="rightvalue" ></van-cell>
        <van-cell title="兼职推广员总收益" :value="'￥'+money.type1" value-class="rightvalue" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />
        <van-cell title="资料信息" is-link  @click="tochangetogether"/>
        <van-cell title="费率和合同" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率和合同'"/>
        <van-cell title="银行账户" is-link :value="havecard" @click="tobindcard" v-if="fromrouter==='2'"/>
      </van-cell-group>
      <van-cell-group v-if="fromrouter==='2'">
        <van-cell title="设置" is-link  @click="toset"/>
      </van-cell-group>
      <van-cell-group v-if="fromrouter==='1'">
        <van-cell title="推广员" is-link :value="mine.countSpread+'人'" @click="topopularize"/>
      </van-cell-group>
      <van-cell-group v-if="fromrouter==='1'">
        <van-cell title="辖区内的种子商户" is-link :value="mine.countDutyAreaSeedStore+'家'" @click="toseed('1')" />
        <van-cell title="辖区内的特色商户" is-link :value="mine.countDutyAreaFeatureStore+'家'" @click="toseed('2')" />
        <van-cell title="辖区内的同城企业" is-link :value="mine.countDutyAreaCityShop+'家'" @click="tolocal('1')" />
      </van-cell-group>
      <van-cell-group v-if="fromrouter==='1'">
        <van-cell title="推广的同城企业" is-link :value="mine.countSpreadCityShop+'家'" @click="tolocal('2')" />

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
              <van-cell title="角色"  value="合作商" value-class="colorC0C0C0"/>
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

              <van-cell title="管辖区域内种子商户,特色商户平台销售额的"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="管辖区域内同城企业平台销售额的" label="注：自己开发的不重复提成，最多就0.3%提成"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="配送平台商品，获得该商品订单价格的" label="注：配送费由商品所属企业承担"  value="3%" title-class="leftcolor" value-class="rightcolor" />
            </van-cell-group>
            <van-cell-group>
              <van-cell
                      title="合同起止时间"
                      :value="store.managerCooperation.activeTime+'至'+store.managerCooperation.invalidTime"
                       value-class="colorC0C0C0"
              >
                <div slot="icon" class="vant-collapse-icon"></div>
              </van-cell>
              <van-cell title="合同照片"  >
                <div slot="icon" class="vant-collapse-icon"></div>
              </van-cell>
              <!--<div class="hetongnote">注：必须包含首页,费率页,合作期限页,签章页。</div>-->
              <van-cell title="" class="hetong" value-class="teadd">
                <some-multiple class="notclickadd" number="8"  :some-multiple="store.managerCooperation.contractPicUrls"  filecode="FILE19011225489456"></some-multiple>
                <!--<contract class="notclickadd" number="8"-->
                               <!--:some-multiple="store.managerCooperation.contractPicUrls"></contract>-->
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
              <van-cell title="账户类型" v-if="rank.card.type==1" value="对公账号" value-class="colorC0C0C0"/>
              <van-cell title="账户类型" v-if="rank.card.type==2" value="个人账号" value-class="colorC0C0C0"/>

            </van-cell-group>
            <van-cell-group>
              <van-cell title="开户名称"  :value="rank.card.accountName" value-class="colorC0C0C0"/>
              <van-cell title="银行账号"  :value="rank.card.bankNo" value-class="colorC0C0C0"   />
              <van-cell title="开户银行"  :value="rank.card.bankName" value-class="colorC0C0C0"   />
              <!--<van-cell title="银行支行"  :value="rank.card.bankBranch"   />-->
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
import someMultiple from '@/components/addimg/someMultiple'
import {currency,format,ringup} from '@/utils'
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
      lookcard:'',  //看银行卡
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
      havecard:'未绑定', // 展示未绑定银行卡
      money:{
        type1:0,
        type2:0
      },
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
        name:'',
        phone:'',
        code:'',
        managerCooperation:{
          merManager:{
            name:''
          }
        },
        managerDutyAreaConfigs:[
          {
            province:'',
            city:'',
        }
        ],
        createTime:'',
        id:''
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


    topopularize(){  //id是进入的哪个列表
      if(this.mine.countSpread){
        this.$router.push({path: '/PromotersList', query: {id:3,merManager:this.store.id}})
      }else{
        this.$toast('推广员为0')
      }

    },
    toseed(msg){
      if(msg=='1'){
        if(this.mine.countDutyAreaSeedStore){
          this.$router.push({path: '/PromotersList', query: {id:4,merManager:this.store.id}})
        }else{
          this.$toast('辖区内的种子店为0')
        }

      }else{
        if(this.mine.countDutyAreaFeatureStore){
          this.$router.push({path: '/PromotersList', query: {id:5,merManager:this.store.id}})
        }else{
          this.$toast('辖区内的特色店为0')
        }

      }

    },
    tochangetogether(){
      this.$router.push({path: '/ChangeTogether', query: {id:this.store.id,type: this.type, list: this.list}})
    },
    tolocal(msg){
      if(msg=='1'){
        if(this.mine.countDutyAreaCityShop){
          this.$router.push({path: '/PromotersList', query: {id:6,merManager:this.store.id}})
        }else{
          this.$toast('辖区内的同城企业为0')
        }

      }else{
        if(this.mine.countSpreadCityShop){
          this.$router.push({path: '/PromotersList', query: {id:6,merManager:this.store.id,mine:true}})
        }else{
          this.$toast('我推广的的同城企业为0')
        }

      }
    },
    tobindcard(msg){
      if(this.havecard=='未绑定'||msg=='1'){ //name身份证名字，type营业执照类型，card身份证号，code营业执照号,store店铺名称
        this.$router.push({path: '/BindCard', query: {name:this.store.managerCooperation.bcUserName,type:this.store.managerCooperation.bcRegisterType,card:this.store.managerCooperation.bcUserIdcard,code:this.store.managerCooperation.bcCode,store:this.store.name,havecard:this.havecard}})
      }else{
        this.rank.onoff=!this.rank.onoff;this.topheader.name='银行账户';
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
  async created(){
    this.type = sessionStorage.getItem('accountType')
    this.list = this.$route.query.list
    this.fromrouter=this.$route.query.fromrouter
    if(this.$route.query.lookcard){
      this.rank.onoff=!this.rank.onoff;this.topheader.name='银行账户';
    }
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name=sessionStorage.getItem('accountName')
   /* let formdata=new FormData();
    formdata.set("id",this.$route.query.id);*/
    let para={
      id:this.$route.query.id
    }
    await this.Api.togetherDetail(para).then(res => {
      // alert('aaaaaa',res)
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
      if(res.data.data){
        this.store=res.data.data
        this.store.managerCooperation.activeTime=format(this.store.managerCooperation.activeTime, 'yyyy.MM.dd')
        this.store.managerCooperation.invalidTime=format(this.store.managerCooperation.invalidTime, 'yyyy.MM.dd')
      }

      }).catch(error => {
        // alert(error)
      })
    if(!this.$route.query.list){
      await this.Api.getCardDetail(para).then(res => {
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
    }




    if(this.fromrouter==1){
      await this.Api.togetherUnder(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        // this.store=res.data.data
        if(res.data.data){
          this.mine=res.data.data
        }

      }).catch(error => {
        console.log(error)
      })

      /*let formdata2=new FormData();
      formdata2.set("merManagerCooperationId",this.$route.query.id);
      formdata2.set("spreadType",1);*/
      let para2={
        merManagerCooperationId:this.$route.query.id,
        spreadType:1
      }
      await this.Api.getTypeMoney(para2).then(res => {
        // this.money=currency(res.data.data/100)
        this.money.type1=currency(res.data.data/100)
      })
      // let formdata3=new FormData();
      // formdata3.set("merManagerCooperationId",this.$route.query.id);
      // formdata2.set("spreadType",2);
      para2.spreadType=2
      await this.Api.getTypeMoney(para2).then(res => {
        // this.money=currency(res.data.data/100)
        this.money.type2=currency(res.data.data/100)
      })





    }



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
    }else if(from.name=='ChangeTogether'&&from.query.list==2){
      next(vm=>{
        vm.fromrouter='1';
      })
    }else if(from.name=='ChangeTogether'){
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


</style>
