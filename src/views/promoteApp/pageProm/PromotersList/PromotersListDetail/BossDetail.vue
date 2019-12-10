<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <!--合作商详情-->
    <div class="list">
      <header class="listtitle">
        <p>{{store.merManager.name}}</p>
        <!--{{item.managerCooperation.name}}-->
        <span >省区总</span>
        <span v-if="store.merManager.status==1">正常</span>
        <span v-if="store.merManager.status==2">关闭</span>
        <span v-if="store.merManager.status==3">冻结</span>
      </header>
      <ul class="listcenter">
        <li style="color: #666;">
          <span >编码：</span>
          <span  style="overflow: hidden;text-overflow: ellipsis">{{store.merManager.code}}</span>
        </li>
        <li>
          <div>
            <img src="@assets/img/detail/phone.png" />
          </div>
          <a :href="'tel:' + store.merManager.phone" style="color: #0095FD;" @click.prevent="handleRingup(store.merManager.phone)" v-if="!!store.merManager">{{store.merManager.phone}}</a>
        </li>
      </ul>
      <ul class="listcontent">
        <li @click="area.onoff=!area.onoff;topheader.name='查看辖区'">
          <div>
          <img src="@assets/img/detail/position.png" />
          </div>
          <span  style="overflow: hidden;text-overflow: ellipsis" v-if="!store.merManager.managerDutyAreaConfigs || store.merManager.managerDutyAreaConfigs.length==0">空</span>
          <span  style="overflow: hidden;text-overflow: ellipsis" v-else>{{store.merManager.managerDutyAreaConfigs[0].province}}{{store.merManager.managerDutyAreaConfigs[0].city}}等</span>
        </li>
        <li>
          <div>
          <img src="@assets/img/detail/people.png" />
          </div>
          <span>无</span>
        </li>
        <li style="color: #999;">
          <div>
          <img src="@assets/img/detail/datachoose.png" />
          </div>
          <span>{{store.merManager.approvalTime|format}}</span>
        </li>
      </ul>
    </div>
    <van-cell-group>
      <van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />
      <van-cell title="资料信息" is-link  @click="information.onoff=!information.onoff;topheader.name='资料信息'"/>
      <van-cell title="费率" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率'"/>
      <!--<van-cell title="银行账户" is-link :value="havecard" @click="tobindcard" v-if="fromrouter==='2'"/>-->
    </van-cell-group>
    <van-cell-group v-if="fromrouter==='2'">
      <van-cell title="设置" is-link  @click="toset"/>
    </van-cell-group>


    <van-popup
      v-model="area.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap" style="background-color: #fff;margin-top: 44px;">
        <choose-area :area="area" emptyText="辖区为空"></choose-area>
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
            <van-cell title="编码"  :value="store.merManager.code" value-class="colorC0C0C0" />
            <van-cell title="入驻时间"  :value="format(store.merManager.approvalTime, 'yyyy-MM-dd hh:mm:ss')" value-class="colorC0C0C0" />
            <van-cell title="角色"  value="省区总" value-class="colorC0C0C0" />
          </van-cell-group>
          <van-cell-group>
            <van-cell title="账号"  :value="store.merManager.username" value-class="colorC0C0C0" />
            <van-cell title="手机号"  :value="store.merManager.phone" value-class="colorC0C0C0" />
            <van-cell title="邮箱"  :value="store.merManager.email" value-class="colorC0C0C0" />
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

            <van-cell title="所属推广员线下收益的"  value="10%" title-class="leftcolor" value-class="rightcolor" />
            <van-cell title="推广同城企业，获得同城企业平台销售额的"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />

          </van-cell-group>
          <!--<van-cell-group>-->
            <!--<van-cell title="合同照片"  >-->
              <!--<div slot="icon" class="vant-collapse-icon"></div>-->
            <!--</van-cell>-->
            <!--<div>注：必须包含首页,费率页,合作期限页,签章页。</div>-->
          <!--</van-cell-group>-->
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="information.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        <div>
          <van-collapse v-model="activeNames">
            <van-collapse-item title="状态信息" name="0" value=" " >
              <div slot="icon" class="vant-collapse-icon"></div>

            <van-cell title="账号启用"  value-class="colorC0C0C0">
              <!--<van-radio-group :value="shop.managerCooperation.merManager.isEnable" style="display: flex;" >-->
              <!--<van-radio name='1' style="margin-right: 20px;" >启用</van-radio>-->
              <!--<van-radio name='2' >停用</van-radio>-->
              <!--</van-radio-group>-->
              启用
            </van-cell>
            <van-cell title="账号状态"  value-class="colorC0C0C0">
              <span v-if="store.merManager.status==1">正常</span>
              <span v-if="store.merManager.status==2">关闭</span>
              <span v-if="store.merManager.status==3">冻结</span>
            </van-cell>
            <van-cell
              title="管辖区域"
              placeholder="请选择管辖区域"
              value="查看管辖区域"
              is-link
              @click="area.onoff=!area.onoff;topheader.name='查看辖区'"

              disabled
            ></van-cell>

            </van-collapse-item>
            <van-collapse-item title="基本信息" name="1"  value=" " value-class="collapsewarn" >
              <div slot="icon" class="vant-collapse-icon"></div>

            <van-cell title="姓名"  :value="store.merManager.name" value-class="colorC0C0C0" />
            <van-cell title="身份证号"  :value="store.merManager.managerRegionBoss.idCard" value-class="colorC0C0C0" />

            <van-cell title="身份证照" value-class="teadd flex">

              <one-not-cut  class="idjust notclickadd"
                            :one-not-cut="store.merManager.managerRegionBoss.idCardJustUrl"></one-not-cut>
              <one-not-cut  class="idback notclickadd"
                            :one-not-cut="store.merManager.managerRegionBoss.idCardBackUrl"></one-not-cut>
            </van-cell>

            </van-collapse-item>
          </van-collapse>
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
            <van-cell title="开户银行"  :value="rank.card.bankType" value-class="colorC0C0C0"   />
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
  import oneNotCut from '@/components/addimg/oneNotCut'
  import {format,ringup} from "@utils";
  export default {
    name: 'BossDetail',
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
        activeNames:['0','1'],
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
        information:{
          onoff:false,
        },
        rank:{
          onoff:false,
          card:'',
        },
        havecard:'未绑定',
        store:{

          merManager:{
            managerDutyAreaConfigs:[
              {
                province:'',
                city:'',
              }
            ],
            name:'',
            phone:'',
            code:'',
            managerRegionBoss:{
              bcUserIdCard:'',
              idCardJustUrl:'',
              idCardBackUrl:'',
            },
            createTime:"2010-03-02",
            updateTime:'',
            id:''
          },

        }
      }
    },
    components: {
      chooseArea,oneNotCut
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
        }else if (this.information.onoff) {
          this.information.onoff = !this.information.onoff
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
        this.store.managerDutyAreaConfigs = msg
        this.area.onoff = false
        this.topheader.name = '填写资料'
      },
      toset(){
        this.$router.push('/Set')
      },


      topopularize(){  //id是进入的哪个列表
        this.$router.push({path: '/PromotersList', query: {id:3,merManager:this.store.id}})
      },
      toseed(){
        this.$router.push({path: '/PromotersList', query: {id:4,merManager:this.store.id}})
      },
      tochangetogether(){
        this.$router.push({path: '/ChangeTogether', query: {id:this.store.id,type: this.type, list: this.list}})
      },
      tobindcard(msg){
        if(this.havecard=='未绑定'||msg=='1'){
          this.$router.push({path: '/BindCard', query: {name:this.store.merManager.name,card:this.store.merManager.managerRegionBoss.idCard,havecard:this.havecard}})
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
      // let para = this.$route.query.id, // 0,挂靠合作商id
      this.name=sessionStorage.getItem('accountName')
     /* let formdata=new FormData();
      // formdata.set("id",this.$route.query.id);
      formdata.set("id",this.$route.query.id);*/
      let para={
        id:this.$route.query.id
      }
      this.Api.bossDetail(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.store=res.data.data
        // input = input.replace(/-/g,'/');
        // this.store.merManager.createTime=res.data.data.merManager.createTime.replace(/-/g,'/');
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



      /*this.Api.togetherUnder(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        // this.store=res.data.data
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })*/
    },
   /* beforeRouteEnter(to, from, next){  // 判断是从列表来还是首页来
      console.log(to,from)
      if(from.name=='prohome'){
        next(vm=>{
          vm.fromrouter='2';
        })
      }else if(from.name=='Set'){
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

  .listcontent{
    font-size: 12px;
    color: #0095FD;
    position: absolute;
    left: 6px;
    top: 74px;
    display: flex;
    line-height: 14px;
  }
  .listcontent /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
  }
  .listcontent /deep/ div{
    width: 14px;
    height: 14px;
    /*transform: translate(0,-10%);*/
    margin-right: 2px;
  }
  .listcontent /deep/ div img{
    width: 100%;
    height: 100%;
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
